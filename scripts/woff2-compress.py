"""
Produces woff2 file
"""

import sys
from fontTools.ttLib.woff2 import compress

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-woff2-font>")
        sys.exit(1)

    compress(sys.argv[1], sys.argv[2])
