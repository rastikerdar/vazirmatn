#!/usr/bin/env bash
# ./make-instances source-dir output-dir

# Requirements:
#     fontforge
#     fontmake
#     ./generate.pe
#     ./Vazir.designspace
#     ./fix-features-fea-anchors.py
#     ./fixweights.pe

SCRIPTDIR=`dirname "$0"`
fontforge -lang=ff -script "${SCRIPTDIR}/generate.pe" "$1/Vazir-Regular.sfd" "$2/Vazir-Regular.ufo"
fontforge -lang=ff -script "${SCRIPTDIR}/generate.pe" "$1/Vazir-Thin.sfd" "$2/Vazir-Thin.ufo"
fontforge -lang=ff -script "${SCRIPTDIR}/generate.pe" "$1/Vazir-Black.sfd" "$2/Vazir-Black.ufo"
cp "${SCRIPTDIR}/Vazir.designspace" "$2/"

fontmake -o ufo -m "$2/Vazir.designspace" -i --output-dir="$2/instances"
python3 "${SCRIPTDIR}/fix-features-fea-anchors.py" Anchor10 -30 "$2/instances/Vazir-Thin.ufo/features.fea" "$2/instances/Vazir-Thin.ufo/features.fea"
python3 "${SCRIPTDIR}/fix-features-fea-anchors.py" Anchor10 -15 "$2/instances/Vazir-Light.ufo/features.fea" "$2/instances/Vazir-Light.ufo/features.fea"
python3 "${SCRIPTDIR}/fix-features-fea-anchors.py" Anchor10 20 "$2/instances/Vazir-Medium.ufo/features.fea" "$2/instances/Vazir-Medium.ufo/features.fea"
python3 "${SCRIPTDIR}/fix-features-fea-anchors.py" Anchor10 40 "$2/instances/Vazir-Bold.ufo/features.fea" "$2/instances/Vazir-Bold.ufo/features.fea"
python3 "${SCRIPTDIR}/fix-features-fea-anchors.py" Anchor10 60 "$2/instances/Vazir-Black.ufo/features.fea" "$2/instances/Vazir-Black.ufo/features.fea"
fontmake -u "$2/instances/"*.ufo -o ttf --output-dir="$2/instance_ttf"

fontforge -lang=ff -script "${SCRIPTDIR}/fixweights.pe" "$2/instance_ttf"
mv "$2/instance_ttf/"*.ttf "$2"
rm -rf "$2/Vazir-Regular.ufo" "$2/Vazir-Thin.ufo" "$2/Vazir-Black.ufo" "$2/instances" "$2/instance_ttf" "$2/Vazir.designspace"
