#!/usr/bin/python3
# coding=utf-8
#
# build.py - Font Builder
#
# This is a short and cripple edition of Amiri font build utility (tools/build.py).
# To see the whole and compelete version, please refer https://github.com/alif-type/amiri
#

import os
import sys
import fontforge


def validateGlyphs(font):
    """Fixes some common FontForge validation warnings, currently handles:
        * wrong direction
        * flipped references"""

    wrong_dir = 0x8
    flipped_ref = 0x10
    for glyph in font.glyphs():
        state = glyph.validate(True)
        if state & flipped_ref:
            glyph.unlinkRef()
            glyph.correctDirection()
        if state & wrong_dir:
            glyph.correctDirection()


def generateFont(font, outfile):
    flags = ("opentype")
    font.selection.all()
    font.correctReferences()
    font.selection.none()

    # fix some common font issues
    validateGlyphs(font)

    font.generate(outfile, flags=flags)


def make(infile, outfile, latinfile, latincopyright, farsidigits, uiargs):
    font = fontforge.open(infile)
    font.encoding = "Unicode"  # avoid a crash if compact was set

    if latinfile:
        font.mergeFonts(latinfile)
        font.mergeFeature(os.path.join(os.path.dirname(__file__), 'farsi-digits.fea'))

    if latincopyright:
        for row in font.sfnt_names:
            if row[1] == "Descriptor":
                font.appendSFNTName(
                    row[0], row[1], row[2] + "\n" + latincopyright)

    if uiargs:
        ascent, descent = uiargs.split(',')
        font.os2_winascent = int(ascent)
        font.os2_windescent = int(descent)
        font.os2_typoascent = int(ascent)
        font.os2_typodescent = -int(descent)
        font.hhea_ascent = int(ascent)
        font.hhea_descent = -int(descent)

    if farsidigits:
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

    # Changing font name to make all versions installable
    # together not overwriting each other
    if farsidigits or not latinfile or uiargs:
        tale = ""
        if farsidigits:
            tale += "FD"
        if not latinfile:
            if tale:
                tale += "-"
            tale += "WOL"
        if uiargs:
            if tale:
                tale += "-"
            tale += "UI"
        font.fontname = font.fontname + "-" + tale
        font.familyname = font.familyname + " " + tale
        font.fullname = font.fullname + " " + tale
        for row in font.sfnt_names:
            if row[1] == "UniqueID":
                font.appendSFNTName(row[0], row[1], row[2] + " " + tale)
            if row[1] == "Preferred Family":
                font.appendSFNTName(row[0], row[1], row[2] + " " + tale)

    font.mergeFeature(os.path.join(os.path.dirname(__file__), 'tnum.fea'))
    generateFont(font, outfile)


def usage(extramessage, code):
    if extramessage:
        print(extramessage)

    message = """Usage: %s OPTIONS...

Options:
  --input=FILE          file name of input font
  --output=FILE         file name of output font
  --latin=FILE          file name of latin font
  --farsi-digits        rewrite latin and arabic digits with persian digits
  --ui-args                  decrease font height for user interface

  -h, --help            print this message and exit
""" % os.path.basename(sys.argv[0])

    print(message)
    sys.exit(code)


if __name__ == "__main__":
    import getopt
    try:
        opts, args = getopt.gnu_getopt(sys.argv[1:],
                                       "h",
                                       ["help", "input=", "output=", "latin=", "latin-copyright=", "farsi-digits", "ui-args="])
    except (getopt.GetoptError, err):
        usage(str(err), -1)

    infile = None
    outfile = None
    latinfile = None
    latincopyright = None
    farsidigits = False
    uiargs = None

    for opt, arg in opts:
        if opt in ("-h", "--help"):
            usage("", 0)
        elif opt == "--input":
            infile = arg
        elif opt == "--output":
            outfile = arg
        elif opt == "--latin":
            latinfile = arg
        elif opt == "--latin-copyright":
            latincopyright = arg
        elif opt == "--farsi-digits":
            farsidigits = True
        elif opt == "--ui-args":
            uiargs = arg

    if not infile:
        usage("No input file specified", -1)
    if not outfile:
        usage("No output file specified", -1)

    make(infile, outfile, latinfile, latincopyright, farsidigits, uiargs)
