import type { HomeMediaAsset } from "@/lib/data/home-media";

const shareAlike = {
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
};

/** Wikimedia photographs; 1600px WebP derivatives retrieved from the licensed reference site. */
export const TRAVEL_MEDIA = {
  rakaposhi: {
    src: "/imgs/travel/rakaposhi.webp", width: 1600, height: 1068,
    alt: "Rakaposhi's snow and glacier-covered face seen above the Hunza valley",
    credit: "Wasif Mehmood Arain / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:View_of_Rakaposhi_from_Hunza_valley.jpg",
    ...shareAlike,
  },
  rupal: {
    src: "/imgs/travel/rupal-face.webp", width: 1600, height: 897,
    alt: "The Rupal face of Nanga Parbat rising above a mountain camp",
    credit: "Maariz / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nanga_Parbat_Rupal_face_base_camp.jpg",
    ...shareAlike,
  },
  deosai: {
    src: "/imgs/travel/deosai.webp", width: 1600, height: 1047,
    alt: "The open grassland and rolling hills of the Deosai plateau under clouds",
    credit: "Qammer Wazir / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Land_of_Giants,_Deosai.jpg",
    ...shareAlike,
  },
  kalash: {
    src: "/imgs/travel/kalash-valley.webp", width: 1600, height: 1067,
    alt: "Wooded slopes and village buildings in Bumburet valley near Chitral",
    credit: "Zeeshan-ul-hassan Usmani / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bumburet_Valley_in_Chitral_District,_Pakistan_2.jpg",
    ...shareAlike,
  },
} satisfies Record<string, HomeMediaAsset>;

export const travelMediaAssets: HomeMediaAsset[] = Object.values(TRAVEL_MEDIA);
