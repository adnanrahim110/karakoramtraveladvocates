"""Bake lightweight hero assets from the original terrain imagery.

Run with Python, Pillow and NumPy. The height grid retains the original packed
16-bit DEM; no canvas decoding or image resampling is needed in the browser.
The sky is a static atmospheric illustration, not a photographic sky capture.
"""

import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
TERRAIN = ROOT / "public" / "imgs" / "terrain"
GRID_SEGMENTS = 320


def bake_height_grid():
    pixels = np.asarray(Image.open(TERRAIN / "k2-dem-height.png").convert("RGB"))
    source = (pixels[:, :, 0].astype(np.float32) * 256 + pixels[:, :, 1]) / 65535
    height, width = source.shape
    xs = np.linspace(0, width - 1, GRID_SEGMENTS + 1)
    ys = np.linspace(0, height - 1, GRID_SEGMENTS + 1)
    x0, y0 = np.floor(xs).astype(int), np.floor(ys).astype(int)
    x1, y1 = np.minimum(x0 + 1, width - 1), np.minimum(y0 + 1, height - 1)
    tx, ty = xs - x0, (ys - y0)[:, None]
    top = source[y0[:, None], x0] * (1 - tx) + source[y0[:, None], x1] * tx
    bottom = source[y1[:, None], x0] * (1 - tx) + source[y1[:, None], x1] * tx
    grid = top * (1 - ty) + bottom * ty
    grid.astype("<f4").tofile(TERRAIN / "k2-height-grid.bin")
    print(f"Height grid: {grid.shape}, {grid.nbytes // 2:,} bytes")


def bake_textures():
    Image.open(TERRAIN / "k2-satellite-albedo.jpg").save(
        TERRAIN / "k2-satellite-detail.webp", quality=90, method=6
    )
    Image.open(TERRAIN / "k2-normal.png").resize(
        (1024, 1024), Image.Resampling.LANCZOS
    ).save(TERRAIN / "k2-normal-detail.webp", quality=95, method=6)
    bake_summer_texture()


def bake_summer_texture():
    """Compress the verified summer satellite crop without recoloring it."""
    provenance_path = TERRAIN / "k2-summer-provenance.json"
    provenance = json.loads(provenance_path.read_text(encoding="utf-8"))
    source = ROOT / provenance["source_file"]
    if hashlib.sha256(source.read_bytes()).hexdigest() != provenance["source_sha256"]:
        raise ValueError("The verified summer satellite source has changed")
    output = TERRAIN / provenance["webp_file"]
    Image.open(source).convert("RGB").save(output, quality=90, method=6)
    provenance["webp_sha256"] = hashlib.sha256(output.read_bytes()).hexdigest()
    provenance_path.write_text(json.dumps(provenance, indent=2) + "\n", encoding="utf-8")


def smoothstep(low, high, value):
    t = np.clip((value - low) / (high - low), 0, 1)
    return t * t * (3 - 2 * t)


def bake_sky():
    width, height = 1536, 768
    azimuth = np.linspace(-np.pi, np.pi, width)[None, :]
    elevation = np.sin(np.linspace(np.pi / 2, -np.pi / 2, height))[:, None]
    horizon = np.array([0.85, 0.91, 0.95])
    alpine = np.array([0.53, 0.73, 0.87])
    zenith = np.array([0.29, 0.52, 0.73])
    base = horizon + (alpine - horizon) * smoothstep(-0.02, 0.20, elevation)[..., None]
    base += (zenith - alpine) * smoothstep(0.20, 0.95, elevation)[..., None]
    sky = np.broadcast_to(base, (height, width, 3)).copy()

    # Soft sunlight from the same direction as the terrain key light.
    direction = np.array([0.71, 0.30, -0.64])
    direction /= np.linalg.norm(direction)
    horizontal = np.sqrt(np.maximum(0, 1 - elevation * elevation))
    cosine = np.maximum(
        0, np.cos(azimuth) * horizontal * direction[0]
        + elevation * direction[1]
        + np.sin(azimuth) * horizontal * direction[2]
    )
    sky += np.power(cosine, 8)[..., None] * np.array([0.12, 0.08, 0.035])

    # Thin, static cirrus. Baking removes every noise octave from the GPU loop.
    rng = np.random.default_rng(20261116)
    noise = np.zeros((height, width), dtype=np.float32)
    for octave, weight in enumerate([0.56, 0.26, 0.12, 0.06]):
        tiny = Image.fromarray((rng.random((14 * 2**octave, 48 * 2**octave)) * 255).astype("uint8"))
        field = np.asarray(tiny.resize((width, height), Image.Resampling.BICUBIC)) / 255
        noise += field * weight
    cloud = smoothstep(0.57, 0.80, noise)
    cloud *= smoothstep(0.025, 0.12, elevation) * (1 - smoothstep(0.45, 0.85, elevation)) * 0.55
    sky = sky * (1 - cloud[..., None]) + np.array([0.94, 0.95, 0.96]) * cloud[..., None]

    # Quiet layers at the horizon maintain depth without animated faux peaks.
    for phase, base_elevation, amplitude, color in [
        (0.8, -0.009, 0.040, [0.76, 0.83, 0.88]),
        (2.4, -0.035, 0.035, [0.70, 0.79, 0.86]),
        (4.9, -0.060, 0.035, [0.65, 0.75, 0.84]),
    ]:
        ridge = (np.abs(np.sin(azimuth * 11 + phase)) * 0.55
                 + np.abs(np.sin(azimuth * 23 + phase)) * 0.27
                 + np.abs(np.sin(azimuth * 41 + phase)) * 0.18)
        silhouette = 1 - smoothstep(base_elevation + ridge * amplitude - 0.002,
                                    base_elevation + ridge * amplitude + 0.002, elevation)
        depth = smoothstep(-0.17, -0.045, elevation)[..., None]
        layer = horizon * (1 - depth) + np.array(color) * depth
        opacity = silhouette[..., None] * 0.65
        sky = sky * (1 - opacity) + layer * opacity

    Image.fromarray((np.clip(sky, 0, 1) * 255).astype("uint8")).save(
        TERRAIN / "karakoram-atmosphere.webp", quality=92, method=6
    )


if __name__ == "__main__":
    bake_height_grid()
    bake_textures()
    bake_sky()
    summer_file = json.loads((TERRAIN / "k2-summer-provenance.json").read_text(encoding="utf-8"))["webp_file"]
    for name in ["k2-height-grid.bin", "k2-satellite-detail.webp", summer_file, "k2-normal-detail.webp", "karakoram-atmosphere.webp"]:
        path = TERRAIN / name
        print(f"{name}: {path.stat().st_size:,} bytes")
