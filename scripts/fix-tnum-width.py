import sys
import fontforge


def make(infile, outfile):
    nglist = ["zero.tnum", "one.tnum", "two.tnum", "three.tnum",  "four.tnum",
              "five.tnum", "six.tnum", "seven.tnum", "eight.tnum", "nine.tnum"]

    font = fontforge.open(infile)
    font.encoding = "Unicode"  # avoid a crash if compact was set
    font.os2_use_typo_metrics = 1
    most_width = font["uni06F3"].width
    for glyph in nglist:
        if glyph in font:
            font[glyph].unlinkRef()
            font[glyph].width = most_width
            bearing = (font[glyph].left_side_bearing +
                       font[glyph].right_side_bearing) / 2
            font[glyph].left_side_bearing = bearing
            font[glyph].right_side_bearing = bearing
            font[glyph].width = most_width

    flags = ("opentype")
    font.generate(outfile, flags=flags)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font>")
        sys.exit(1)

    make(sys.argv[1], sys.argv[2])
