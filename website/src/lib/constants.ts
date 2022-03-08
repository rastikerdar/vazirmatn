export const SITE_NAME = "فونت وزیرمتن Vazirmatn";
export const SITE_BASE_PATH = "https://rastikerdar.github.io/vazirmatn";
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : "/vazirmatn";
export const DOWNLOAD_BASE_URL =
  "https://github.com/rastikerdar/vazirmatn/releases/download";

export const TAG_NAME = process.env.NEXT_PUBLIC_TAG_NAME
  ? process.env.NEXT_PUBLIC_TAG_NAME
  : process.env.NEXT_PUBLIC_LAST_TAG_NAME
  ? process.env.NEXT_PUBLIC_LAST_TAG_NAME
  : "v0.0.0";

export const DOWNLOAD_URL = `${DOWNLOAD_BASE_URL}/${TAG_NAME}/vazirmatn-${TAG_NAME}.zip`;

export const VAZIRMATN_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL
  ? process.env.NEXT_PUBLIC_CDN_URL
  : `https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@${TAG_NAME}`;

export const VAZIRMATN_CSS_URL = `${VAZIRMATN_CDN_URL}/Vazirmatn-font-face.css`;
