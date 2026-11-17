import * as THREE from "three";

const TERRAIN_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying vec3 vWorldPos;
  varying vec3 vGeomNormal;

  void main() {
    vUv = uv;
    vLocalPos = position;
    vGeomNormal = normalize(normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const TERRAIN_FRAGMENT_COMMON = /* glsl */ `
  uniform sampler2D uSeasonMap;
  uniform sampler2D uNormalMap;
  uniform vec3 uHazeColor;
  uniform float uHazeStart;
  uniform float uHazeEnd;
  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying vec3 vWorldPos;
  varying vec3 vGeomNormal;

  vec3 terrainNormal() {
    vec3 detailNormal = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
    float coreDetail = 1.0 - smoothstep(14.0, 20.0, max(abs(vLocalPos.x), abs(vLocalPos.z)));
    return normalize(mix(vGeomNormal, detailNormal, 0.30 * coreDetail));
  }

  vec3 atmosphericHaze(vec3 color) {
    float distanceToCamera = length(vWorldPos.xz - cameraPosition.xz);
    float haze = smoothstep(uHazeStart, uHazeEnd, distanceToCamera);
    return mix(color, uHazeColor, haze);
  }

  vec3 shadeTerrain(vec3 albedo, vec3 normal, vec3 sunDirection, vec3 skyColor, vec3 sunColor) {
    float sun = max(dot(normal, normalize(sunDirection)), 0.0);
    float skyVisibility = 0.65 + max(normal.y, 0.0) * 0.35;
    vec3 ambient = skyColor * skyVisibility;
    vec3 sunlight = sunColor * sun;
    return albedo * (ambient + sunlight);
  }
`;

// The opaque base retains the original satellite imagery and original lighting.
// It has no cursor, seasonal color grading or reveal uniforms.
const WINTER_FRAGMENT_SHADER = /* glsl */ `
  ${TERRAIN_FRAGMENT_COMMON}
  void main() {
    vec3 albedo = texture2D(uSeasonMap, vUv).rgb;
    vec3 normal = terrainNormal();
    vec3 lit = shadeTerrain(
      albedo,
      normal,
      vec3(0.71, 0.55, -0.44),
      vec3(0.62, 0.71, 0.83),
      vec3(0.44, 0.39, 0.31)
    );
    gl_FragColor = vec4(atmosphericHaze(lit), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const SUMMER_LIGHTING_COMMON = /* glsl */ `
  vec3 computeSummerSurfaceColor() {
    vec3 rawSummer = texture2D(uSeasonMap, vUv).rgb;
    float rawLuma = dot(rawSummer, vec3(0.2126, 0.7152, 0.0722));

    // Expand the compressed [0.12, 0.66] linear range of the Sentinel-2 summer capture
    // back to true physical rock-to-snow contrast [0.025, 0.94].
    float normalizedLuma = clamp((rawLuma - 0.115) / (0.66 - 0.115), 0.0, 1.0);
    float contrastLuma = mix(
      pow(normalizedLuma, 1.55) * 0.82,
      smoothstep(0.0, 1.0, normalizedLuma),
      0.38
    );
    float targetLuma = mix(0.024, 0.94, contrastLuma);
    vec3 chroma = rawSummer / max(rawLuma, 0.001);
    // Amplify natural mineral chroma (warm brown/ochre granite & moraine vs cool glacier ice)
    vec3 mineralChroma = mix(vec3(1.0), chroma, 1.65);
    vec3 baseAlbedo = clamp(mineralChroma * targetLuma, 0.0, 1.0);

    // Separate bare summer rock/moraine (low reflectance), exposed glacier ice (mid reflectance
    // in valleys), and high-altitude perennial snow (high reflectance).
    float rockMask = 1.0 - smoothstep(0.18, 0.52, normalizedLuma);
    float iceMask = smoothstep(0.18, 0.42, normalizedLuma) * (1.0 - smoothstep(0.48, 0.74, normalizedLuma));
    float snowMask = smoothstep(0.58, 0.84, normalizedLuma);

    // Real Karakoram summer granite & Baltoro moraine warmth on snow-free slopes:
    vec3 rockTone = baseAlbedo * vec3(1.14, 0.96, 0.78);
    // Exposed blue-grey summer glacier ice along the Baltoro & Godwin-Austen tongues:
    vec3 iceTone = baseAlbedo * vec3(0.86, 0.96, 1.08);
    // Sunlit summer snow on the upper 7,000-8,611m summits:
    vec3 snowTone = baseAlbedo * vec3(1.02, 1.00, 0.97);

    vec3 albedo = baseAlbedo;
    albedo = mix(albedo, rockTone, rockMask * 0.75);
    albedo = mix(albedo, iceTone, iceMask * 0.55);
    albedo = mix(albedo, snowTone, snowMask * 0.65);

    vec3 normal = terrainNormal();
    vec3 sunDirection = normalize(vec3(0.62, 0.76, -0.30));
    vec3 baseLit = shadeTerrain(
      albedo,
      normal,
      sunDirection,
      vec3(0.64, 0.73, 0.82),
      vec3(0.58, 0.50, 0.38)
    );

    // Subtle warm granite bounce in deep moraine valleys & glacier ice specular sheen:
    float valleyFactor = 1.0 - smoothstep(0.6, 2.6, vLocalPos.y);
    vec3 moraineBounce = albedo * vec3(0.12, 0.09, 0.06) * valleyFactor * rockMask;

    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 halfVec = normalize(sunDirection + viewDir);
    float glacierSpec = pow(max(dot(normal, halfVec), 0.0), 36.0) * (iceMask * 0.65 + snowMask * 0.25);
    vec3 glacierGlint = vec3(0.42, 0.48, 0.54) * glacierSpec;

    return atmosphericHaze(baseLit + moraineBounce + glacierGlint);
  }
`;

// Dedicated opaque terrain shader rendered inside the separate 3D summer scene.
const SUMMER_WORLD_FRAGMENT_SHADER = /* glsl */ `
  ${TERRAIN_FRAGMENT_COMMON}
  ${SUMMER_LIGHTING_COMMON}

  void main() {
    gl_FragColor = vec4(computeSummerSurfaceColor(), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const SUMMER_FRAGMENT_SHADER = /* glsl */ `
  ${TERRAIN_FRAGMENT_COMMON}
  ${SUMMER_LIGHTING_COMMON}
  uniform sampler2D uSummerSceneTexture;
  uniform vec2 uViewportSize;
  uniform float uPortalEnabled;
  uniform vec3 uRevealCenter;
  uniform float uRevealRadius;
  uniform float uRevealStrength;

  float terrainGrain(vec3 p) {
    vec3 cell = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    vec3 seed = vec3(127.1, 311.7, 74.7);
    return mix(
      mix(mix(fract(sin(dot(cell, seed)) * 43758.5453), fract(sin(dot(cell + vec3(1, 0, 0), seed)) * 43758.5453), f.x),
          mix(fract(sin(dot(cell + vec3(0, 1, 0), seed)) * 43758.5453), fract(sin(dot(cell + vec3(1, 1, 0), seed)) * 43758.5453), f.x), f.y),
      mix(mix(fract(sin(dot(cell + vec3(0, 0, 1), seed)) * 43758.5453), fract(sin(dot(cell + vec3(1, 0, 1), seed)) * 43758.5453), f.x),
          mix(fract(sin(dot(cell + vec3(0, 1, 1), seed)) * 43758.5453), fract(sin(dot(cell + vec3(1, 1, 1), seed)) * 43758.5453), f.x), f.y), f.z);
  }

  void main() {
    // A world-space volume intersects the actual mountains. Ridge height and
    // surface grain shape the feathered edge, including at grazing angles.
    float radius = max(uRevealRadius * 1.32, 0.001);
    float distanceToProbe = length(vWorldPos - uRevealCenter) / radius;
    if (distanceToProbe > 1.25) discard;
    float grain = terrainGrain(vLocalPos * 3.2) * 0.7 + terrainGrain(vLocalPos * 9.0) * 0.3;
    float edge = distanceToProbe + (grain - 0.5) * 0.24;
    float alpha = (1.0 - smoothstep(0.48, 1.08, edge)) * uRevealStrength;
    if (alpha <= 0.001) discard;

    vec3 summerColor;
    if (uPortalEnabled > 0.5) {
      vec2 screenUv = clamp(gl_FragCoord.xy / max(uViewportSize, vec2(1.0)), 0.001, 0.999);
      summerColor = texture2D(uSummerSceneTexture, screenUv).rgb;
    } else {
      summerColor = computeSummerSurfaceColor();
    }

    float rim = smoothstep(0.62, 0.88, edge) * (1.0 - smoothstep(0.88, 1.08, edge));
    summerColor += vec3(0.32, 0.25, 0.10) * rim * uRevealStrength;

    gl_FragColor = vec4(summerColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

interface TerrainSeasonLayerOptions {
  winterMap: THREE.Texture;
  summerMap: THREE.Texture;
  normalMap: THREE.Texture;
  hazeStart: number;
  hazeEnd: number;
}

export function createTerrainSeasonLayers({
  winterMap, summerMap, normalMap, hazeStart, hazeEnd,
}: TerrainSeasonLayerOptions) {
  const baseUniforms = (map: THREE.Texture, hazeColor: string) => ({
    uSeasonMap: { value: map },
    uNormalMap: { value: normalMap },
    uHazeColor: { value: new THREE.Color(hazeColor) },
    uHazeStart: { value: hazeStart },
    uHazeEnd: { value: hazeEnd },
  });
  const winter = new THREE.ShaderMaterial({
    name: "Original winter terrain",
    vertexShader: TERRAIN_VERTEX_SHADER,
    fragmentShader: WINTER_FRAGMENT_SHADER,
    uniforms: baseUniforms(winterMap, "#d8e8f2"),
  });
  const summerWorld = new THREE.ShaderMaterial({
    name: "Summer 3D world terrain",
    vertexShader: TERRAIN_VERTEX_SHADER,
    fragmentShader: SUMMER_WORLD_FRAGMENT_SHADER,
    uniforms: baseUniforms(summerMap, "#d8e4ee"),
    transparent: false,
    depthTest: true,
    depthWrite: true,
  });
  const summer = new THREE.ShaderMaterial({
    name: "Summer terrain reveal overlay",
    vertexShader: TERRAIN_VERTEX_SHADER,
    fragmentShader: SUMMER_FRAGMENT_SHADER,
    uniforms: {
      ...baseUniforms(summerMap, "#d8e4ee"),
      uSummerSceneTexture: { value: null as THREE.Texture | null },
      uViewportSize: { value: new THREE.Vector2(1, 1) },
      uPortalEnabled: { value: 0 },
      uRevealCenter: { value: new THREE.Vector3() },
      uRevealRadius: { value: 1 },
      uRevealStrength: { value: 0 },
    },
    transparent: true,
    visible: false,
    depthTest: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    // Both layers use the exact same geometry and transform. A depth bias avoids
    // z-fighting without lifting or displacing the summer mountains.
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  return { winter, summer, summerWorld };
}
