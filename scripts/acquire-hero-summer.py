"""Acquire real Sentinel-2 summer RGB imagery for the existing K2 terrain.

Requires Pillow, NumPy, requests and rasterio==1.4.3. Optional isolated rasterio
installation: python -m pip install --target .cache/hero-geospatial rasterio==1.4.3
RGB reflectance is projected, cropped and given one uniform display exposure.
There is no vegetation painting, snow removal or selective color replacement.
"""

import hashlib
import json
import math
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ISOLATED_PACKAGES = ROOT / ".cache" / "hero-geospatial"
if ISOLATED_PACKAGES.exists():
    sys.path.insert(0, str(ISOLATED_PACKAGES))

import numpy as np
from PIL import Image
import requests
import rasterio
from rasterio.enums import Resampling
from rasterio.transform import from_bounds
from rasterio.warp import reproject, transform_bounds
from rasterio.windows import Window, from_bounds as window_from_bounds


ITEM_ID = "S2B_43SFV_20250913_0_L2A"
CAPTURE_DATE = "2025-09-13"
ITEM_URL = f"https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/{ITEM_ID}"
BBOX = (76.38, 35.7, 76.7, 35.96)  # west, south, east, north — original DEM extent
SIZE = 2048
SOURCE = ROOT / "scripts" / "assets" / "hero" / f"k2-summer-{CAPTURE_DATE}.png"
TERRAIN = ROOT / "public" / "imgs" / "terrain"
WEBP = TERRAIN / f"k2-summer-{CAPTURE_DATE}.webp"


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    print(f"Reading verified Sentinel-2 item {ITEM_ID}", flush=True)
    response = requests.get(ITEM_URL, timeout=30)
    response.raise_for_status()
    item = response.json()
    if item["id"] != ITEM_ID or not item["properties"]["datetime"].startswith(CAPTURE_DATE):
        raise ValueError("Satellite item or capture date changed")
    assets = [item["assets"][name] for name in ["red", "green", "blue"]]
    if [asset["eo:bands"][0]["name"] for asset in assets] != ["B04", "B03", "B02"]:
        raise ValueError("The selected assets are not true-color RGB")
    if not all(asset["href"].startswith("https://sentinel-cogs.s3.us-west-2.amazonaws.com/") for asset in assets):
        raise ValueError("Unexpected satellite data source")

    source_bands = []
    effective_offsets = []
    with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN="EMPTY_DIR",
                      CPL_VSIL_CURL_ALLOWED_EXTENSIONS=".tif",
                      GDAL_HTTP_TIMEOUT=35, GDAL_HTTP_CONNECTTIMEOUT=15):
        for asset in assets:
            print(f"Reading original 10m {asset['eo:bands'][0]['name']} reflectance", flush=True)
            with rasterio.open(asset["href"]) as raster:
                projected_bounds = transform_bounds("EPSG:4326", raster.crs, *BBOX, densify_pts=41)
                window = window_from_bounds(*projected_bounds, transform=raster.transform)
                window = Window(math.floor(window.col_off) - 2, math.floor(window.row_off) - 2,
                                math.ceil(window.width) + 4, math.ceil(window.height) + 4)
                if (window.col_off < 0 or window.row_off < 0
                        or window.col_off + window.width > raster.width
                        or window.row_off + window.height > raster.height):
                    raise ValueError("The imagery does not cover the complete terrain")
                pixels = raster.read(1, window=window).astype("float32")
                band_metadata = asset["raster:bands"][0]
                # Element 84's harmonized COG pixels already remove BOA offsets.
                offset = 0 if item["properties"].get("earthsearch:boa_offset_applied") else band_metadata.get("offset", 0)
                effective_offsets.append(offset)
                source_bands.append(pixels * band_metadata.get("scale", 1) + offset)
                source_mask = raster.dataset_mask(window=window)
                source_transform = raster.window_transform(window)
                source_crs = raster.crs

    target_transform = from_bounds(*BBOX, SIZE, SIZE)
    target = np.zeros((3, SIZE, SIZE), dtype="float32")
    for band in range(3):
        reproject(source=source_bands[band], destination=target[band],
                  src_transform=source_transform, src_crs=source_crs,
                  dst_transform=target_transform, dst_crs="EPSG:4326",
                  resampling=Resampling.bilinear)
    coverage = np.zeros((SIZE, SIZE), dtype="uint8")
    reproject(source=source_mask, destination=coverage,
              src_transform=source_transform, src_crs=source_crs,
              dst_transform=target_transform, dst_crs="EPSG:4326",
              resampling=Resampling.nearest)
    valid_coverage = float(np.mean(coverage > 0) * 100)
    print(f"RGB coverage: {valid_coverage:.6f}%; reflectance range {target.min():.4f}–{target.max():.4f}", flush=True)
    if valid_coverage < 99.99:
        raise ValueError("The summer crop contains missing imagery")

    SOURCE.parent.mkdir(parents=True, exist_ok=True)
    debug = ROOT / ".cache" / "hero-imagery"
    debug.mkdir(parents=True, exist_ok=True)
    np.savez_compressed(debug / "summer-reflectance.npz", rgb=target)
    # A single exposure curve on all three measured channels retains snow detail
    # that the provider's pre-rendered 8-bit TCI clips to flat white.
    exposed = np.maximum(target, 0) * 1.8
    mapped = exposed / (1 + exposed)
    srgb = np.where(mapped <= 0.0031308, mapped * 12.92, 1.055 * mapped ** (1 / 2.4) - 0.055)
    rgb = Image.fromarray(np.moveaxis((np.clip(srgb, 0, 1) * 255).astype("uint8"), 0, -1))
    rgb.save(SOURCE)
    rgb.save(WEBP, quality=90, method=6)
    provenance = {
        "item_id": ITEM_ID,
        "collection": "sentinel-2-l2a",
        "capture_time": item["properties"]["datetime"],
        "capture_date": CAPTURE_DATE,
        "platform": item["properties"]["platform"],
        "tile_cloud_cover_percent": item["properties"]["eo:cloud_cover"],
        "source_urls": [asset["href"] for asset in assets],
        "item_url": ITEM_URL,
        "license_url": next(link["href"] for link in item["links"] if link["rel"] == "license"),
        "credit": "Contains modified Copernicus Sentinel data (2025), processed by ESA; COG distribution by Element 84 / AWS.",
        "source_resolution_meters": 10,
        "rgb_bands": ["B04", "B03", "B02"],
        "reflectance_scales": [asset["raster:bands"][0]["scale"] for asset in assets],
        "effective_offsets": effective_offsets,
        "boa_offset_already_applied": item["properties"].get("earthsearch:boa_offset_applied"),
        "display_exposure": 1.8,
        "display_curve": "Uniform RGB Reinhard tone mapping and sRGB encoding",
        "source_crs": str(source_crs),
        "target_crs": "EPSG:4326",
        "bbox": list(BBOX),
        "width": SIZE,
        "height": SIZE,
        "processing": ["RGB reflectance scaling", "geographic reprojection", "crop to original DEM bounds", "bilinear resampling", "uniform display exposure", "WebP compression"],
        "source_file": str(SOURCE.relative_to(ROOT)).replace("\\", "/"),
        "source_sha256": sha256(SOURCE),
        "webp_file": WEBP.name,
        "webp_sha256": sha256(WEBP),
        "valid_coverage_percent": valid_coverage,
    }
    (TERRAIN / "k2-summer-provenance.json").write_text(json.dumps(provenance, indent=2) + "\n", encoding="utf-8")
    print(f"Saved genuine summer image: {WEBP.name} ({WEBP.stat().st_size:,} bytes), {valid_coverage:.6f}% coverage", flush=True)


if __name__ == "__main__":
    main()
