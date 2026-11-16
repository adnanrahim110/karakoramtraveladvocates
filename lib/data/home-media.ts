/**
 * Real photography from Gilgit-Baltistan. Source images have been resized and
 * encoded as WebP; responsive display crops may apply. CC image derivatives
 * retain their respective licenses. No photographer endorses this operator.
 */
export interface HomeMediaAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly credit: string;
  readonly sourceUrl: string;
  readonly license: string;
  readonly licenseUrl: string;
}

const ccBySa4 = {
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
};

const attabad: HomeMediaAsset = {
  src: "/imgs/home-premium/attabad.webp",
  alt: "A traveler overlooking turquoise Attabad Lake between the rocky mountains of Hunza, Pakistan",
  width: 2560,
  height: 1440,
  credit: "Arif Esapzai / Pexels",
  sourceUrl:
    "https://www.pexels.com/photo/man-admiring-attabad-lake-in-hunza-pakistan-35302565/",
  license: "Pexels License",
  licenseUrl: "https://www.pexels.com/license/",
};

export const HOME_MEDIA = {
  intro: {
    src: "/imgs/home-premium/passu-clouds.webp",
    alt: "A monochrome photograph of the jagged Passu Cones emerging through low clouds in Upper Hunza, Pakistan",
    width: 3200,
    height: 2069,
    credit: "Shahbazaslam1 / Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Passu_Cones_-_Hunza_Valley_Pakistan.jpg",
    ...ccBySa4,
  },
  tour: attabad,
  trek: {
    src: "/imgs/home-premium/trango-towers.webp",
    alt: "The granite Trango Towers and Cathedral peaks rising above the rocky Baltoro Glacier in the Karakoram",
    width: 2880,
    height: 1920,
    credit: "Black Zero / Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Trango_Towers_and_Cathedrals.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  expedition: {
    src: "/imgs/home-premium/k2-chogori.webp",
    alt: "The immense snow-covered face of K2 above colorful expedition tents, seen from Broad Peak Base Camp, Pakistan",
    width: 2880,
    height: 2160,
    credit: "Zacharie Grossen / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chogori.jpg",
    ...ccBySa4,
  },
  spantik: {
    src: "/imgs/home-premium/spantik.webp",
    alt: "The snow-covered face and ridges of Spantik, also known as Golden Peak, in Gilgit-Baltistan, Pakistan",
    width: 2560,
    height: 1707,
    credit: "Akbar Khan Niazi / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Spantik.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  snowLake: {
    src: "/imgs/home-premium/snow-lake.webp",
    alt: "The vast snow basin of Lukpe Lawo, or Snow Lake, at the head of the Biafo and Hispar glaciers in the Karakoram",
    width: 2560,
    height: 1614,
    credit: "Vasiq Eqbal / Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lukpe_Lao_or_popularly_known_as_Snow_Lake_,_is_a_glacial_basin_which_located_at_the_confluence_of_Biafo_and_Hispar_glacier_in_Central_Karakoram_National_Park.jpg",
    ...ccBySa4,
  },
  hunza: {
    src: "/imgs/home-premium/hunza-autumn.webp",
    alt: "Golden poplars, orchards, and village terraces in Hunza's Altit Valley during autumn",
    width: 2500,
    height: 1707,
    credit: "Nasr Rahman / Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hunza_-_Altit_Valley_-_Nasr_Rahman.jpg",
    ...ccBySa4,
  },
  skardu: {
    src: "/imgs/home-premium/skardu-reflection.webp",
    alt: "A crisp reflection of the mountains, autumn trees and Shangrila Resort in Lower Kachura Lake, Skardu, Pakistan",
    width: 2880,
    height: 1922,
    credit: "Wasif Mehmood / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/resort-on-the-shore-of-lower-kachura-lake-at-the-foot-of-the-himalayas-19442078/",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
  },
  fairyMeadows: {
    src: "/imgs/home-premium/fairy-meadows.webp",
    alt: "Nanga Parbat and the pine forests of Fairy Meadows reflected in still water, Gilgit-Baltistan, Pakistan",
    width: 2880,
    height: 1733,
    credit: "Usmanbukhari3362 / Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fairy_Meadows_GB_Pakistan.jpg",
    ...ccBySa4,
  },
  journal: {
    src: "/imgs/home-premium/shigar-interior.webp",
    alt: "Intricately carved wooden beams and traditional stone walls inside historic Shigar Fort, Baltistan, Pakistan",
    width: 2560,
    height: 1709,
    credit: "Sanaullah Khan / Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Shigar_Fort_LHR_1040.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  tailor: {
    src: "/imgs/home-premium/passu-road.webp",
    alt: "The Karakoram Highway leading toward the serrated Passu Cones in Upper Hunza, Pakistan",
    width: 3200,
    height: 2133,
    credit: "Marvelousuj / Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Passu_Cones_and_The_Mighty_KKH_Gojal_Hunza_Gilgit-Baltistan.jpg",
    ...ccBySa4,
  },
} satisfies Record<string, HomeMediaAsset>;

export type HomeMediaKey = keyof typeof HOME_MEDIA;

export const HOME_FILM = {
  src: "/imgs/home/hunza-film.mp4",
  poster: "/imgs/home/film-poster.webp",
  description:
    "Clouds moving over the high mountains of Hunza and Nagar, Pakistan. A short landscape timelapse.",
  credit: "Mujeeb Ullah Khan / Pexels",
  sourceUrl:
    "https://www.pexels.com/video/timelapse-mountains-hunza-nagar-pakistan-17473249/",
  license: "Pexels License",
  licenseUrl: "https://www.pexels.com/license/",
  width: 1600,
  height: 900,
  durationSeconds: 8.67,
};
