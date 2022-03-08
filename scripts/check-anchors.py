"""
Checks if all anchors in two fonts are the same and returns a list of unmatched glyphs
"""

import sys
import fontforge

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <first-font-path> <second-font-path>")

        sys.exit(1)

    first_font = fontforge.open(sys.argv[1])
    second_font = fontforge.open(sys.argv[2])

    failed_glyphs = []
    for fglyph in first_font.glyphs():
        try:
            second_font.selection.select(fglyph.glyphname)
            sglyph = list(second_font.selection.byGlyphs)[0]
            fanchors = fglyph.anchorPoints
            sanchors = sglyph.anchorPoints
            for i in range(len(fanchors)):
                if len(fanchors) != len(sanchors) or fanchors[i][0] != sanchors[i][0]:
                    failed_glyphs.append((fglyph.glyphname, fanchors[i][0]))
                    break
        except Exception as err:
            raise Exception('error: \n' + err + '\n' + fglyph.glyphname)

    if failed_glyphs:
        raise Exception('anchors in following glyphs are not equel: \n' +
                         "\n".join(map(lambda x: str(x[0]) + " : " + str(x[1]), failed_glyphs)) + '\n files: ' + sys.argv[1] + ' ' + sys.argv[2])
