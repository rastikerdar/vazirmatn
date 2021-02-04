#!/usr/bin/env bash
# ./make-variable source-dir output-dir

SCRIPTDIR=`dirname "$0"`
fontforge -lang=ff -script "${SCRIPTDIR}/variable.pe" "$1/Vazir-Regular.sfd" "$2/Vazir-Regular.ufo"
fontforge -lang=ff -script "${SCRIPTDIR}/variable.pe" "$1/Vazir-Thin.sfd" "$2/Vazir-Thin.ufo"
fontforge -lang=ff -script "${SCRIPTDIR}/variable.pe" "$1/Vazir-Black.sfd" "$2/Vazir-Black.ufo"
cp "${SCRIPTDIR}/Vazir.designspace" "$2/"
if ! fontmake -o variable -m "$2/Vazir.designspace" --output-path="$2/Vazir-Variable.ttf" ; then
    exit 1
fi
woff2_compress "$2/Vazir-Variable.ttf"
rm -rf "$2/Vazir-Regular.ufo" "$2/Vazir-Thin.ufo" "$2/Vazir-Black.ufo" "$2/instances" "$2/instance_ttf" "$2/Vazir.designspace"
