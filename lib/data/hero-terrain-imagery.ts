import provenance from "../../public/imgs/terrain/k2-summer-provenance.json";

export const heroSummerImagery = {
  src: "/imgs/terrain/" + provenance.webp_file,
  captureDate: provenance.capture_time.split("T")[0],
  captureTime: provenance.capture_time,
  credit: provenance.credit,
  sourceUrl: provenance.item_url,
  licenseUrl: "https://sentinels.copernicus.eu/documents/247904/690755/Sentinel_Data_Legal_Notice",
  width: provenance.width,
  height: provenance.height,
};
