"""
Exports a list of all glyph names from the input font and writes them in the output file
"""

import sys
import fontforge

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <font-file> <output-text-file>")
        sys.exit(1)

    f = fontforge.open(sys.argv[1])
    with open(sys.argv[2], 'w') as o:
        for i in f.selection.all():
            if i in f and (f[i].unicode != -1 or f[i].glyphname == ".notdef"):
                line = f[i].glyphname + '\n'
                o.write(line)
