"""
Unlink transformed references in some glyphs.
"""

import sys
import fontforge


def unlinkCheh(infile, outfile):
    font = fontforge.open(infile)
    font.encoding = "Unicode"

    # Chech glyphs
    font["uni0686"].unlinkRef()
    font["uniFB7B"].unlinkRef()

    for glyph in font:
        try:
            font[glyph].unlinkRef("extender")
        except:
            pass

    font.save(outfile)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font>")
        sys.exit(1)

    unlinkCheh(sys.argv[1], sys.argv[2])
