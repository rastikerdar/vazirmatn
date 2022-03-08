import sys
from fontTools.ttLib import TTFont


def getVersion(infile):
    font = TTFont(infile)

    # getName(nameID, platformID, platEncID, langID=None)
    return str(font["name"].getName(5, 3, 1, 1033)).removeprefix("Version ")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(
            "Args must be: <input-font>")
        sys.exit(1)

    print(getVersion(sys.argv[1]))
