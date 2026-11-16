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
`;

// The opaque base retains the original satellite imagery and original lighting.
// It has no cursor, seasonal color grading or reveal uniforms.
const WINTER_FRAGMENT_SHADER = /* glsl */ `
  ${TERRAIN_FRAGMENT_COMMON}
  void main() {
    vec3 albedo = texture2D(uSeasonMap, vUv).rgb;
    vec3 normal = terrainNormal();
    vec3 sunDirection = normalize(vec3(0.71, 0.55, -0.44));
    float sun = max(dot(normal, sunDirection), 0.0);
    float skyVisibility = 0.65 + max(normal.y, 0.0) * 0.35;
    vec3 ambient = vec3(0.62, 0.71, 0.83) * skyVisibility;
    vec3 sunlight = vec3(0.44, 0.39, 0.31) * sun;
    gl_FragColor = vec4(atmosphericHaze(albedo * (ambient + sunlight)), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const SUMMER_FRAGMENT_SHADER = /* glsl */ `
  ${TERRAIN_FRAGMENT_COMMON}
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
    float distanceToProbe = length(vWorldPos - uRevealCenter) / uRevealRadius;
    if (distanceToProbe > 1.25) discard;
    float grain = terrainGrain(vLocalPos * 3.2) * 0.7 + terrainGrain(vLocalPos * 9.0) * 0.3;
    float edge = distanceToProbe + (grain - 0.5) * 0.24;
    float alpha = (1.0 - smoothstep(0.48, 1.08, edge)) * uRevealStrength;
    if (alpha <= 0.001) discard;

    vec3 albedo = texture2D(uSeasonMap, vUv).rgb;
    vec3 normal = terrainNormal();
    vec3 sunDirection = normalize(vec3(0.71, 0.55, -0.44));
    float sun = max(dot(normal, sunDirection), 0.0);
    float skyVisibility = 0.65 + max(normal.y, 0.0) * 0.35;
    vec3 ambient = vec3(0.62, 0.71, 0.83) * skyVisibility;
    vec3 sunlight = vec3(0.44, 0.39, 0.31) * sun;
    gl_FragColor = vec4(atmosphericHaze(albedo * (ambient + sunlight)), alpha);
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
  const uniforms = (map: THREE.Texture) => ({
    uSeasonMap: { value: map },
    uNormalMap: { value: normalMap },
    uHazeColor: { value: new THREE.Color("#d8e8f2") },
    uHazeStart: { value: hazeStart },
    uHazeEnd: { value: hazeEnd },
  });
  const winter = new THREE.ShaderMaterial({
    name: "Original winter terrain",
    vertexShader: TERRAIN_VERTEX_SHADER,
    fragmentShader: WINTER_FRAGMENT_SHADER,
    uniforms: uniforms(winterMap),
  });
  const summer = new THREE.ShaderMaterial({
    name: "Summer terrain reveal overlay",
    vertexShader: TERRAIN_VERTEX_SHADER,
    fragmentShader: SUMMER_FRAGMENT_SHADER,
    uniforms: {
      ...uniforms(summerMap),
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
  return { winter, summer };
}
