export type GlyphCollection = {
  letters: Array<string>;
  numbers: Array<string>;
  signs: Array<string>;
};

export type GlyphCollections = {
  [key: string]: GlyphCollection;
};

export const glyphCollections: GlyphCollections = {
  persian: {
    letters:
      "آ ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی ء لا ڪ".split(
        " ",
      ),
    numbers: "۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹".split(" "),
    signs: "ا ! ؟ ) ( / [ ] - + ÷ × « » . ٬ = : ؛ ٪ ٫ ٬ ∎".split(" "),
  },
  arabic: {
    letters:
      "ا أ إ ٱ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ة و ي لا".split(
        " ",
      ),
    numbers: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩".split(" "),
    signs: "ا ! ؟ ) ( / [ ] - + ÷ × « » . ٬ = : ؛ ٪ ٫ ٬".split(" "),
  },
  urdu: {
    letters:
      "ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ء ی ے لا".split(
        " ",
      ),
    numbers: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩".split(" "),
    signs: "ا ! ؟ ) ( / [ ] - + ÷ × « » . ٬ = : ؛ ٪ ٫ ٬".split(" "),
  },
  kurdish: {
    letters:
      "ئ ا ب پ ت ج چ ح خ د ر ڕ ز ژ س ش ع غ ف ڤ ق ک گ ل ڵ م ن هـ ه و ۆ وو ی ێ لا ڵا".split(
        " ",
      ),
    numbers: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩".split(" "),
    signs: "ا ! ؟ ) ( / [ ] - + ÷ × « » . ٬ = : ؛ ٪ ٫ ٬".split(" "),
  },
  gilak: {
    letters:
      "آ أ ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ۊ ؤ ی ی ئ ه لا".split(
        " ",
      ),
    numbers: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩".split(" "),
    signs: "ا ! ؟ ) ( / [ ] - + ÷ × « » . ٬ = : ؛ ٪ ٫ ٬".split(" "),
  },
  pashtu: {
    letters:
      "آ ا ب پ ت ټ ث ج چ ح خ څ ځ د ډ ذ ر ړ ز ژ ږ س ش ښ ص ض ط ظ ع غ ف ق ک ګ ل م ن ڼ و ه ی ی ی ی ئ لا".split(
        " ",
      ),
    numbers: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩".split(" "),
    signs: "ا ! ؟ ) ( / [ ] - + ÷ × « » . ٬ = : ؛ ٪ ٫ ٬".split(" "),
  },
  jawi: {
    letters:
      "ا ب‎ ت‎ ة‎ ث‎ ج‎ ح‎ چ‎ خ‎ د‎ ذ‎ ر‎ ز‎ س‎ ش‎ ص‎ ض‎ ط‎ ظ‎ ع‎ غ‎ ڠ‎ ف‎ ڤ‎ ق‎ ک‎ ڬ ݢ‎ ل‎ م‎ ن‎ و‎ ۏ‎ ه‎ ی‎ ڽ‎ ء‎ أ‎ إ‎ ئ‎ لا".split(
        " ",
      ),
    numbers: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩".split(" "),
    signs: "ا ! ؟ ) ( / [ ] - + ÷ × « » . ٬ = : ؛ ٪ ٫ ٬".split(" "),
  },
} as const;

export const marks = "ّ َ ِ ُ ً ٍ ٌ ْ ٓ ٰ ‌ ٔ".split(" ");
