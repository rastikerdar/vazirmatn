import { GlyphCollection, GlyphCollections, glyphCollections } from "./glyphs";

export type { GlyphCollection, GlyphCollections } from "./glyphs";

export function createCombinationsText(
  glyphCollection: GlyphCollection,
  g: string,
  oneway = false,
): string {
  let text = g + " ";
  const space = "\xa0\xa0 ";
  const zwnj = "‌";
  const gc = glyphCollection;
  const type = gc.numbers.includes(g)
    ? "number"
    : gc.signs.includes(g)
    ? "sign"
    : "letter";
  if (type === "number" || type === "sign") {
    gc.letters.map((x) => {
      text += g + x + space;
      text += g + x + "ـ" + space;
      if (!oneway) {
        text += x + g + space;
        text += "ـ" + x + g + space;
      }
    });
    gc.numbers.map((x) => {
      text += g + x + space;
      if (!oneway) {
        text += x + g + space;
      }
    });
    gc.signs.map((x) => {
      text += g + x + space;
      if (!oneway) {
        text += x + g + space;
      }
    });
  } else {
    gc.letters.map((x) => {
      text += g + zwnj + x + space;
      text += g + x + space;
      text += g + x + "ـ" + space;
      text += "ـ" + g + x + "ـ" + space;
      text += "ـ" + g + x + space;
      text += "ـ" + g + space;
      if (!oneway) {
        text += x + zwnj + g + space;
        text += x + g + space;
        text += x + g + "ـ" + space;
        text += "ـ" + x + g + "ـ" + space;
        text += "ـ" + x + g + space;
      }
    });
    gc.numbers.map((x) => {
      text += g + x + space;
      text += "ـ" + g + x + space;
      if (!oneway) {
        text += x + g + space;
        text += x + g + "ـ" + space;
      }
    });
    gc.signs.map((x) => {
      text += g + x + space;
      if (!oneway) {
        text += "ـ" + g + x + space;
        text += x + g + space;
        text += x + g + "ـ" + space;
      }
    });
  }
  return text;
}

export function createGlyphsText(glyphCollection: GlyphCollection): string {
  let text = "";
  const space = "\xa0\xa0 ";
  const gc = glyphCollection;
  gc.letters.map((x) => {
    text += x + space;
    text += x + "ـ" + space;
    text += "ـ" + x + "ـ" + space;
    text += "ـ" + x + space;
  });
  gc.numbers.map((x) => {
    text += x + space;
  });
  gc.signs.map((x) => {
    text += x + space;
  });
  return text;
}

export function getGlyphCollection(collenctionName: string): GlyphCollection {
  return glyphCollections[collenctionName];
}

export function getGlyphCollections(): GlyphCollections {
  return glyphCollections;
}
