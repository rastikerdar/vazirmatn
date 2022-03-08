# set records in "name table" 
# see https://github.com/googlefonts/Roboto-Classic/blob/master/scripts/__init__.py

import sys
from fontTools.ttLib import TTFont


def update_names(font, **kwargs):
    nametable = font["name"]
    for k in kwargs:
        # print(f"Setting {k} to {kwargs[k]}")
        nametable.setName(kwargs[k], *tuple(map(int, k.split(","))))

    for name_id in range(256, 400):
        font['name'].removeNames(name_id)


def setNames(infile, outfile, name, weight):
    font = TTFont(infile)

    fontname = "-".join(name.split(" ")) + "-" + weight
    familyname = name + \
        ((" " + weight) if weight not in ('Regular', 'Bold') else '')
    fullname = name + " " + weight

    instance = {
        "names": {
            "1,3,1,1033": familyname,
            "16,3,1,1033": name,
            "17,3,1,1033": weight,
            # "2,3,1,1033": "Regular",
            "3,3,1,1033": name + "-" + weight,
            "4,3,1,1033": fullname,
            "6,3,1,1033": fontname
        }
    }

    update_names(font, **instance["names"])
    font.save(outfile)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <input-font> <output-font> <family-name> <weight>")
        sys.exit(1)

    setNames(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
