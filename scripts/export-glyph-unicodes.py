"""
Exports a list of all unicodes in the input font-file and writes them in the output text file
"""

import sys
import fontforge

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <font-file> <output-file>")
        sys.exit(1)

    f = fontforge.open(sys.argv[1])
    with open(sys.argv[2], 'w') as o:
        for i in f.selection.all():
            if i in f and f[i].unicode != -1:
                line = "U+{:04x}".format(f[i].unicode)
                o.write(line + '\n')
