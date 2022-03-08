import { VAZIRMATN_CDN_URL } from "../../lib/constants";

export type Font = {
  cssURL: string;
  family: string;
  cssFamily: string;
  isVariable: boolean;
};

export const fonts: Array<Font> = [
  {
    cssURL: `${VAZIRMATN_CDN_URL}/Vazirmatn-font-face.css`,
    family: "vazirmatn",
    cssFamily: "vazirmatn, roboto, sans-serif",
    isVariable: false,
  },
  {
    cssURL: `${VAZIRMATN_CDN_URL}/Round-Dots/Vazirmatn-RD-font-face.css`,
    family: "vazirmatn rd",
    cssFamily: "vazirmatn rd, roboto, sans-serif",
    isVariable: false,
  },
  {
    cssURL: `https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css`,
    family: "old vazir",
    cssFamily: "vazir, roboto, sans-serif",
    isVariable: false,
  },
];
