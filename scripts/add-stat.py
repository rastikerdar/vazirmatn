import sys
from fontTools.ttLib import TTFont
from fontTools.otlLib.builder import buildStatTable


def addStat(fontPath, outPath):
    font = TTFont(fontPath)

    axes = [
        dict(
            tag="wght",
            name="Weight",
            ordering=0,  # optional
            values=[
                dict(value=100, name='Thin'),
                dict(value=200, name='ExtraLight'),
                dict(value=300, name='Light'),
                dict(value=400, name='Regular', flags=0x2),
                dict(value=500, name='Medium'),
                dict(value=600, name='SemiBold'),
                dict(value=700, name='Bold'),
                dict(value=800, name='ExtraBold'),
                dict(value=900, name='Black'),
            ],
        )
    ]

    buildStatTable(font, axes, locations=None, elidedFallbackName=2)
    font.save(outPath)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font>")
        sys.exit(1)

    addStat(sys.argv[1], sys.argv[2])
