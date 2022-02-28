"""
Gets a font file and replace current dot glyphs with rounded dots
"""

import sys
import fontforge


def convertToRD(infile, outfile):
    font = fontforge.open(infile)
    font.encoding = "Unicode"

    mapDots = {
        "arabic_dot_r": "arabic_dot",
        "arabic_2dots_r": "arabic_2dots",
        "arabic_3dots_r": "arabic_3dots",
        "arabic_3dots_a_r": "arabic_3dots_a",
        "uni06D0.dots_r": "uni06D0.dots",
    }

    for index in mapDots:
        font.selection.select(index)
        font.copy()
        font.selection.select(mapDots[index])
        font.paste()

    font.selection.none()
    font.save(outfile)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font>")
        sys.exit(1)

    convertToRD(sys.argv[1], sys.argv[2])
