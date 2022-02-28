"""
set ascender and descender of the font
"""

import sys
from fontTools.ttLib import TTFont


def update_attribs(font, **kwargs):
    for table in font.keys():
        for k in kwargs:
            if hasattr(font[table], k):
                # print(f"Setting {k} to {kwargs[k]}")
                setattr(font[table], k, kwargs[k])


def setUIArgs(infile, outfile, uiargs):
    font = TTFont(infile)
    ascent, descent = uiargs.split(',')
    update_attribs(
        font,
        **{
            "sTypoAscender": int(ascent),
            "sTypoDescender": -int(descent),
            "sTypoLineGap": 0,
            "usWinAscent": int(ascent),
            "usWinDescent": int(descent),
        }
    )
    font.save(outfile)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font> <uiargs>")
        sys.exit(1)

    setUIArgs(sys.argv[1], sys.argv[2], sys.argv[3])
