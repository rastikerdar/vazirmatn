"""
credit: https://gist.github.com/m4rc1e/6bce4997bf160938adf67486f46fcebe

Add an avar table to a VF font. This is often needed for VF fonts generated with glyphsapp

Please note: this script requires the same dependencies as fontmake, https://github.com/googlei18n/fontmake

For testing avar table see script, https://github.com/googlefonts/gftools/blob/master/bin/gftools-check-vf-avar.py

TODO (GF team) File issue on Glyphsapp if glyphsapp does not generate avar table by default.


How to use:

python3 add_avar.py family.designspace family-VF.ttf family-avar-VF.ttf


"""
from collections import OrderedDict
from fontTools.varLib import _add_avar, load_designspace
from fontTools.ttLib import TTFont
import sys

if __name__ == "__main__":
    if len(sys.argv) != 4:
        raise Exception(
            'Include path to .designspace and VF tff e.g.\n\n python add_avar.py family.designspace family-VF.ttf family-avar-VF.ttf')

    designspace_filename = sys.argv[1]
    font_path = sys.argv[2]
    out_path = sys.argv[3]
    ttfont = TTFont(font_path)

    # axes, internal_axis_supports, base_idx, normalized_master_locs, masters, instances = load_designspace(
    ds = load_designspace(
        designspace_filename)

    _add_avar(ttfont, ds.axes)

    ttfont.save(out_path)
