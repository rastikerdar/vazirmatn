"""
Replaces Latin and Arabic numbers with Farsi ones. 
Several Persian users needs this feature because of 
using legacy or unchangable environments.
"""

import sys
import fontforge


def setFarsiDigits(infile, outfile):
    font = fontforge.open(infile)
    font.encoding = "Unicode"

    # copy Farsi digits (0 1 2 3 4 5 6 7 8 9) to Latin digits
    mapDigits = {
        "uni06F0": "zero",
        "uni0661": "one",
        "uni0662": "two",
        "uni0663": "three",
        "uni06F4": "four",
        "uni06F5": "five",
        "uni06F6": "six",
        "uni0667": "seven",
        "uni0668": "eight",
        "uni0669": "nine",
    }

    for index in mapDigits:
        font.selection.select(index)
        font.copyReference()
        font.selection.select(mapDigits[index])
        font.paste()

    # copy Farsi digits (0 4 5 6) to Arabic digits
    mapDigits = {
        "uni06F0": "uni0660",
        "uni06F4": "uni0664",
        "uni06F5": "uni0665",
        "uni06F6": "uni0666",
    }

    for index in mapDigits:
        font.selection.select(index)
        font.copyReference()
        font.selection.select(mapDigits[index])
        font.paste()

    font.selection.none()
    font.generate(outfile, flags=("opentype"))


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font>")
        sys.exit(1)

    setFarsiDigits(sys.argv[1], sys.argv[2])
