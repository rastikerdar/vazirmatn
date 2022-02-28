import sys
from fontTools.ttLib import TTFont
from fontTools.misc.textTools import binary2num, num2binary

# https://github.com/Typefounding/setUseTypoMetricsFalse
def setUseTypoMetricsTrue(fontPath, outPath):
    # Get Font object from path
    font = TTFont(fontPath)

    # Get the OS/2 Table
    os2 = font["OS/2"]

    # Make sure that we only fix fonts with an OS/2 table version
    # that is 4 or greater
    if os2.version >= 4:

        # Get the binary representation of fsSelection
        b = num2binary(os2.fsSelection, 16)

        # Make a new binary representation of fsSelection that sets
        # the Use Typo Metrics bit to false (0)
        nb = b[:9] + '1' + b[10:]

        # Give the font the new fsSelection
        os2.fsSelection = binary2num(nb)

        # Save font to new path
        font.save(outPath)
    else:
        print(fontPath + " OS/2 table version is less than 4, nothing to fix.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font>")
        sys.exit(1)

    setUseTypoMetricsTrue(sys.argv[1], sys.argv[2])
