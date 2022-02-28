"""
Generates feature (fea) file out of input font excluding lookup tables "ss0, tnum, pnum"
"""

import sys
import fontforge

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font-file> <output-fea-file>")
        sys.exit(1)

    font = fontforge.open(sys.argv[1])
    lookups = font.gsub_lookups
    for lookup in lookups:
        if lookup.startswith("'ss0") or lookup.startswith("'tnum") or lookup.startswith("'pnum"):
            font.removeLookup(lookup)

    font.generateFeatureFile(sys.argv[2])
