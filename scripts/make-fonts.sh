#!/bin/bash
#
# makefont - Font Builder for vazirmatn-font (github)
# Written in 2015-2022 by Saber Rasetikerdar <saber.rastikerdar@gmail.com>
# Works only on Linux.
#
# Requirements:
#     fontforge ~ v20201107
#     fontmake  https://github.com/googlefonts/fontmake ~ v2.4.1
#     python3
#     python3-fontforge ~ v20201107
#     fonttools https://github.com/fonttools/fonttools ~ v4.29.1
#     git (Access to fetch Roboto Variable repo https://github.com/googlefonts/Roboto-Classic) ~ v3.004
#     gftools
#     ttfautohint  https://www.freetype.org/ttfautohint/ ~ v1.8.3
#     ./build.py
#
# Run:
#     ./makefont.sh [options]
#         options:
#         --repo-dir=.
#         --temp-dir="/tmp/vazirmatn-font-output-temp"
#         --output-dir=.
#         --rd-font
#         --only-ttf
#         --no-misc
#         --no-latin
#         --no-hinting
#         --no-temp-clean
#         --no-variable
#         --no-css
#
# ## The Build Process
#
# These steps are printed out when using `make-fonts.sh` or the `make fonts` command:
# - Clone the classic Roboto Variable font repository into the "latin" folder (could be skipped by --no-latin command option)
# - Preparing sfd files 
#    - Replace current dot glyphs with round dot glyphs if current build is in round-dots mode --rd-font else copy untouched sfds
#    - Unlink transformed references
# - Check if all anchors in 3 main source files (sources/*.sfd) are the same
# - Make all ttf instances (9 weights) from 3 masters (Thin, Regular, Black):
#     - Prepare every single Vazirmatn weight (UFO):
#         - Generate ttf from Roboto-$weight UFO (all the latin related jobs could be skipped entirely by --no-latin command option)
#         - Generate feature.fea file from the ttf (removing ss01, tnum, pnum)
#         - Generate UFO for Vazirmatn-$weight
#         - Generate a subset lib.plist for Vazirmatn UFO file by merging Roboto subset and Vazir subset
#         - Merge Roboto's feature.fea into Vazirmatn's feature.fea
#         - Merge all glyph files (*.glif) from Roboto UFO into Vazirmatn UFO
#         - Merge "ss01" (farsi-digits) and "tnum" (tabular numbers) into the final feature.fea
#     - Export subset_unicodes.txt by merging subsets of Roboto and Vazirmatn (regular version but will be used for all weights)
#     - Generate ufo instances/*.ufo from Vazirmatn.designspace
#     - Fix anchors positions by correcting feature.fea file for each weight (ufo)
#     - Generate all ttfs from all instances/*.ufo into instance_ttf/*.ttf
#     - Fixing OS/2.fsSelection bit 7 (USE_TYPO_METRICS) for all ttfs in instance_ttf/*
#     - Fixing latin *.tnum glyph widths for all ttfs instance_ttf/* for making arabic and latin numbers have the same width (not variable yet)
#     - Subset all instance_ttf/* by "pyftsubset" using subset_unicodes.txt
# - Make the variable version (could be skipped by --no-variable command option)
#     - Fixing OS/2.fsSelection bit 7 (USE_TYPO_METRICS) for variable ttf
#     - Adding STAT table to the variable ttf
#     - Subsetting variable with the list provided in subset_unicodes.txt that was generated before
# - Generate all other variations (Non-latin, UI, ...) (could be skipped by --no-misc command option)
# - Create Hinted ttfs (could be skipped by --no-hinting command option)
# - Create web fonts (woff, woff2) (could be skipped by --only-ttf command option)
# - Categorize all fonts into folders (package/*) and putting CSS files into them (before this step we had a flat list of all generated files)
# - Repeat all the steps for Round-Dots version by using --rd-font and --output-dir=./Round-Dots command options
# - Create the release file (.zip)

set -euo pipefail

function log() {
    local msg=$1
    echo "█ $msg"
}

function error() {
    local msg="${1:-}"
    log "error: ${msg}"
    exit 1
}

# ========================================
# Setting constants
# ========================================

STARTTIME=$SECONDS
SCRIPT_DIR=$(dirname "$0")

REPO_DIR="."
TEMP_DIR="/tmp/vazirmatn-font-output-temp"
OUTPUT_DIR="."
RD_FONT=
ONLY_TTF=
NO_MISC=
NO_LATIN=
NO_HINTING=1
NO_TEMP_CLEAN=
NO_VARIABLE=
NO_CSS=

for i in "$@"; do
    case $i in
    --repo-dir=*)
        REPO_DIR="${i#*=}"
        ;;
    --temp-dir=*)
        TEMP_DIR="${i#*=}/vazirmatn-font-output-temp"
        ;;
    --output-dir=*)
        OUTPUT_DIR="${i#*=}"
        ;;
    --rd-font)
        RD_FONT=1
        ;;
    --no-latin)
        NO_LATIN=1
        ;;
    --only-ttf)
        ONLY_TTF=1
        ;;
    --no-misc)
        NO_MISC=1
        ;;
    --no-hinting)
        NO_HINTING=1
        ;;
    --no-temp-clean)
        NO_TEMP_CLEAN=1
        ;;
    --no-variable)
        NO_VARIABLE=1
        ;;
    --no-css)
        NO_CSS=1
        ;;
    *)
        error "Unknown option"
        ;;
    esac
done

FONT_FAMILY_NAME="Vazirmatn"
FONT_FILE_NAME="Vazirmatn"
if [ -n "$RD_FONT" ]; then
    FONT_FAMILY_NAME="Vazirmatn RD"
    FONT_FILE_NAME="Vazirmatn-RD"
fi

LATIN_DIR="${REPO_DIR}/latin"
if [ -n "$NO_LATIN" ]; then
    LATIN_DIR=""
else
    mkdir -p "${LATIN_DIR}"
fi

if [ -n "$RD_FONT" ]; then
    mkdir -p "${OUTPUT_DIR}/Round-Dots" || error 
    OUTPUT_DIR="${OUTPUT_DIR}/Round-Dots"
fi

SOURCES_DIR="${REPO_DIR}/sources"
BUILD_DIR="${TEMP_DIR}/build"
PACKAGE_DIR="${TEMP_DIR}/package"
UIARGS="1950,970"

# ========================================
# Check or create folders
# ========================================

[ ! -d "${REPO_DIR}" ] && error "--repo-dir ${REPO_DIR} not found"
[ ! -d "${OUTPUT_DIR}" ] && error "--output-dir ${OUTPUT_DIR} not found"
[ ! -d "${SOURCES_DIR}" ] && error "${SOURCES_DIR} not found. Try to use --repo-dir="

if [ -d "${TEMP_DIR}" ]; then
    rm -rf "${TEMP_DIR}"/* || error
else
    mkdir -p "${TEMP_DIR}" || error
fi

mkdir "${BUILD_DIR}" || error
mkdir "${PACKAGE_DIR}" || error

# ========================================
# Clone the Roboto Variable Font repo
# ========================================

if [[ -n "${LATIN_DIR}" && ! -d "${LATIN_DIR}/Roboto" ]]; then
    log "Cloning https://github.com/sannorozco/Roboto.git v3.004 into ${LATIN_DIR}/Roboto"
    git clone --depth 1 --branch v3.004 https://github.com/googlefonts/Roboto-Classic.git "${LATIN_DIR}/Roboto" || error
    rm -rf "${LATIN_DIR}/Roboto/.git" || error
fi

# ========================================
# Preparing sfds
# ========================================

log "Preparing sfd files"
if [ -n "$RD_FONT" ]; then
    python3 "${SCRIPT_DIR}/convert-to-rd-font.py" "${SOURCES_DIR}/Vazirmatn-Thin.sfd" "${BUILD_DIR}/Vazirmatn-RD-Thin.sfd" || error
    python3 "${SCRIPT_DIR}/convert-to-rd-font.py" "${SOURCES_DIR}/Vazirmatn-Regular.sfd" "${BUILD_DIR}/Vazirmatn-RD-Regular.sfd" || error
    python3 "${SCRIPT_DIR}/convert-to-rd-font.py" "${SOURCES_DIR}/Vazirmatn-Black.sfd" "${BUILD_DIR}/Vazirmatn-RD-Black.sfd" || error
else
    cp "${SOURCES_DIR}/Vazirmatn-Thin.sfd" "${BUILD_DIR}/" || error
    cp "${SOURCES_DIR}/Vazirmatn-Regular.sfd" "${BUILD_DIR}/" || error
    cp "${SOURCES_DIR}/Vazirmatn-Black.sfd" "${BUILD_DIR}/" || error
fi

log "Unlinking transformed references"
python3 "${SCRIPT_DIR}/unlink-references.py" "${BUILD_DIR}/$FONT_FILE_NAME-Thin.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-Thin.sfd" || error
python3 "${SCRIPT_DIR}/unlink-references.py" "${BUILD_DIR}/$FONT_FILE_NAME-Regular.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-Regular.sfd" || error
python3 "${SCRIPT_DIR}/unlink-references.py" "${BUILD_DIR}/$FONT_FILE_NAME-Black.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-Black.sfd" || error

# ========================================
# Check anchors
# ========================================

log "Checking anchors"
python3 "${SCRIPT_DIR}/check-anchors.py" "${BUILD_DIR}/$FONT_FILE_NAME-Regular.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-Thin.sfd" || error
python3 "${SCRIPT_DIR}/check-anchors.py" "${BUILD_DIR}/$FONT_FILE_NAME-Regular.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-Black.sfd" || error

# ========================================
# Make instances
# ========================================

log "Making instances"
function create_instance() {
    local weight=$1
    log "Creating $weight instance"

    [ -n "${LATIN_DIR}" ] && log "Generating ${BUILD_DIR}/Roboto-$weight.ttf for extracting features.fea"
    [ -n "${LATIN_DIR}" ] && { fontmake -u "${LATIN_DIR}/Roboto/sources/Roboto-$weight.ufo" -o ttf --output-path "${BUILD_DIR}/Roboto-$weight.ttf" || error; }

    [ -n "${LATIN_DIR}" ] && log "Generating ${BUILD_DIR}/Roboto-$weight-Feature.fea"
    [ -n "${LATIN_DIR}" ] && { python3 "${SCRIPT_DIR}/generate-feature-file.py" "${BUILD_DIR}/Roboto-$weight.ttf" "${BUILD_DIR}/Roboto-$weight-Feature.fea" || error; }
    [ -n "${LATIN_DIR}" ] && { rm "${BUILD_DIR}/Roboto-$weight.ttf" || error; }

    log "Generating ${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo"
    fontforge -lang=ff -script "${SCRIPT_DIR}/generate.pe" "${BUILD_DIR}/$FONT_FILE_NAME-$weight.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo" || error

    log "Generating subset plist ${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/lib.plist"
    python3 "${SCRIPT_DIR}/export-glyph-names.py" "${BUILD_DIR}/$FONT_FILE_NAME-$weight.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-$weight-_subset_names.txt" || error
    [ -n "${LATIN_DIR}" ] && { cat "${SCRIPT_DIR}/roboto_subset_names.txt" >>"${BUILD_DIR}/$weight-subset_names.txt" || error; }
    cat "${BUILD_DIR}/$FONT_FILE_NAME-$weight-_subset_names.txt" >>"${BUILD_DIR}/$weight-subset_names.txt" || error
    echo "afii61664" >>"${BUILD_DIR}/$weight-subset_names.txt" || error
    echo "afii57598" >>"${BUILD_DIR}/$weight-subset_names.txt" || error
    echo "afii57596" >>"${BUILD_DIR}/$weight-subset_names.txt" || error
    echo "afii300" >>"${BUILD_DIR}/$weight-subset_names.txt" || error
    python3 "${SCRIPT_DIR}/generate-subset-plist.py" "${BUILD_DIR}/$weight-subset_names.txt" "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/lib.plist" || error

    [ -n "${LATIN_DIR}" ] && log "Merging ${BUILD_DIR}/Roboto-$weight-Feature.fea with ${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea"
    [ -n "${LATIN_DIR}" ] && { sed -i '1d' "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea" || error; }
    [ -n "${LATIN_DIR}" ] && { cat "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea" >>"${BUILD_DIR}/Roboto-$weight-Feature.fea" || error; }
    [ -n "${LATIN_DIR}" ] && { mv "${BUILD_DIR}/Roboto-$weight-Feature.fea" "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea" || error; }

    # merging Roboto glyphs into Vazirmatn
    [ -n "${LATIN_DIR}" ] && log "Merging ${LATIN_DIR}/Roboto/sources/Roboto-$weight.ufo/glyphs/ into ${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/glyphs/"
    [ -n "${LATIN_DIR}" ] && { cp -n "${LATIN_DIR}/Roboto/sources/Roboto-$weight.ufo/glyphs/"*.glif "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/glyphs/" || error; }
    [ -n "${LATIN_DIR}" ] && { python3 "${SCRIPT_DIR}/merge-glyphs-plist.py" "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/glyphs/contents.plist" "${LATIN_DIR}/Roboto/sources/Roboto-$weight.ufo/glyphs/contents.plist" "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/glyphs/contents.plist" || error; }

    [ -n "${LATIN_DIR}" ] && log "Merging ${SCRIPT_DIR}/farsi-digits.fea with ${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea"
    [ -n "${LATIN_DIR}" ] && { cat "${SCRIPT_DIR}/farsi-digits.fea" >>"${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea" || error; }

    log "Merging ${SCRIPT_DIR}/tnum.fea with ${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea"
    if [ -n "${LATIN_DIR}" ]; then
        cat "${SCRIPT_DIR}/tnum.fea" >>"${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea" || error
    else
        cat "${SCRIPT_DIR}/tnum-non-latin.fea" >>"${BUILD_DIR}/$FONT_FILE_NAME-$weight.ufo/features.fea" || error
    fi

}
create_instance 'Thin'
create_instance 'Regular'
create_instance 'Black'

log "Generating ${BUILD_DIR}/subset_unicodes.txt"
python3 "${SCRIPT_DIR}/export-glyph-unicodes.py" "${BUILD_DIR}/$FONT_FILE_NAME-Regular.sfd" "${BUILD_DIR}/vazirmatn_subset_unicodes.txt" || error
[ -n "${LATIN_DIR}" ] && { cat "${SCRIPT_DIR}/roboto_subset_unicodes.txt" >>"${BUILD_DIR}/subset_unicodes.txt" || error; }
cat "${BUILD_DIR}/vazirmatn_subset_unicodes.txt" >>"${BUILD_DIR}/subset_unicodes.txt" || error

cp "${SCRIPT_DIR}/$FONT_FILE_NAME.designspace" "${BUILD_DIR}/" || error

log "Generating ufo instances from ${BUILD_DIR}/$FONT_FILE_NAME.designspace"
fontmake --round-instances -f --subset -o ufo -m "${BUILD_DIR}/$FONT_FILE_NAME.designspace" -i --output-dir="${BUILD_DIR}/instances" || error

log "Fixing Anchors because fontmake doesn't interpolate anchors in Vazirmatn properly!"
function fixAnchors() {
    local anchors="Anchor110,Anchor107,Anchor109,Anchor106"
    local main_weight=$1
    local ratio=$2
    local second_weight=$3
    python3 "${SCRIPT_DIR}/fix-features-fea-anchors.py" "$anchors" "${BUILD_DIR}/$FONT_FILE_NAME-Regular.sfd" "${BUILD_DIR}/$FONT_FILE_NAME-$main_weight.sfd" "$ratio" "${BUILD_DIR}/instances/$FONT_FILE_NAME-$second_weight.ufo/features.fea" "${BUILD_DIR}/instances/$FONT_FILE_NAME-$second_weight.ufo/features.fea" || error
}
fixAnchors 'Thin' 1 'Thin'
fixAnchors 'Thin' 0.550000 'ExtraLight'
fixAnchors 'Thin' 0.325000 'Light'
fixAnchors 'Black' 0.350000 'Medium'
fixAnchors 'Black' 0.540000 'SemiBold'
fixAnchors 'Black' 0.730000 'Bold'
fixAnchors 'Black' 0.9275 'ExtraBold'
fixAnchors 'Black' 1 'Black'

log "Generating ttf files from ${BUILD_DIR}/instances/*.ufo"
fontmake --subset -f -u "${BUILD_DIR}/instances/"*.ufo -o ttf --output-dir="${BUILD_DIR}/instance_ttf" || error

# log "Fixing weights"
# fontforge -lang=ff -script "${SCRIPT_DIR}/fixweights-$FONT_FILE_NAME.pe" "${BUILD_DIR}/instance_ttf" || error

log "Fixing OS/2.fsSelection bit 7 (USE_TYPO_METRICS) in ${BUILD_DIR}/instance_ttf/*"
function fixTypeMetricsSelectionBit() {
    local weight=$1
    python3 "${SCRIPT_DIR}/set_useTypoMetrics_true.py" "${BUILD_DIR}/instance_ttf/$FONT_FILE_NAME-$weight.ttf" "${BUILD_DIR}/instance_ttf/$FONT_FILE_NAME-$weight.ttf" || error
}
fixTypeMetricsSelectionBit 'Thin'
fixTypeMetricsSelectionBit 'ExtraLight'
fixTypeMetricsSelectionBit 'Light'
fixTypeMetricsSelectionBit 'Regular'
fixTypeMetricsSelectionBit 'Medium'
fixTypeMetricsSelectionBit 'SemiBold'
fixTypeMetricsSelectionBit 'Bold'
fixTypeMetricsSelectionBit 'ExtraBold'
fixTypeMetricsSelectionBit 'Black'

# log "Fixing latin tnum widths in ${BUILD_DIR}/instance_ttf/*"
# function fixTnumWidth() {
#     local weight=$1
#     python3 "${SCRIPT_DIR}/fix-tnum-width.py" "${BUILD_DIR}/instance_ttf/$FONT_FILE_NAME-$weight.ttf" "${BUILD_DIR}/instance_ttf/$FONT_FILE_NAME-$weight.ttf" || error
# }
# fixTnumWidth 'Thin'
# fixTnumWidth 'ExtraLight'
# fixTnumWidth 'Light'
# fixTnumWidth 'Regular'
# fixTnumWidth 'Medium'
# fixTnumWidth 'SemiBold'
# fixTnumWidth 'Bold'
# fixTnumWidth 'ExtraBold'
# fixTnumWidth 'Black'

log "Subsetting ttfs into ${BUILD_DIR}"
function subset() {
    local weight=$1
    pyftsubset "${BUILD_DIR}/instance_ttf/$FONT_FILE_NAME-$weight.ttf" --unicodes-file="${BUILD_DIR}/subset_unicodes.txt" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-$weight.ttf" --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error
}
subset 'Thin'
subset 'ExtraLight'
subset 'Light'
subset 'Regular'
subset 'Medium'
subset 'SemiBold'
subset 'Bold'
subset 'ExtraBold'
subset 'Black'

# ========================================
# Make variable
# ========================================

if [ -z "$NO_VARIABLE" ]; then
    log "Making variable"
    cp "${BUILD_DIR}/$FONT_FILE_NAME.designspace" "${BUILD_DIR}/instances/$FONT_FILE_NAME.designspace" || error
    fontmake --subset -f --expand-features-to-instances -o variable -m "${BUILD_DIR}/instances/$FONT_FILE_NAME.designspace" --output-path="${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" || error
    
    log "Fixing OS/2.fsSelection bit 7 (USE_TYPO_METRICS) for variable"
    python3 "${SCRIPT_DIR}/set_useTypoMetrics_true.py" "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" || error
    
    log "Adding STAT table to the variable ttf"
    python3 "${SCRIPT_DIR}/add-stat.py" "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" || error
    
    # log "Adding avar table to the variable ttf"
    # python3 "${SCRIPT_DIR}/add-avar.py" "${BUILD_DIR}/Vazirmatn.designspace" "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" || error
    
    log "Subsetting ${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf into ${BUILD_DIR}/$FONT_FILE_NAME[wght].ttf"
    pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" --unicodes-file="${BUILD_DIR}/subset_unicodes.txt" --output-file="${BUILD_DIR}/$FONT_FILE_NAME[wght].ttf" --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error
    rm "${BUILD_DIR}/$FONT_FILE_NAME-Variable.ttf" || error
fi

# ========================================
# Generate all variations
# ========================================

if [ -z "$NO_MISC" ]; then
    function generateMiscTTFs() {
        local weight=$1
        log "Generating all variations ttf (FD, NL, UI) for $weight"

        # Non-Latin subset
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-$weight.ttf" --unicodes-file="${BUILD_DIR}/vazirmatn_subset_unicodes.txt" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight-subset.ttf" --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error

        # Non-Latin NL
        python3 "${SCRIPT_DIR}/set-names.py" "${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight-subset.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight-temp.ttf" "$FONT_FAMILY_NAME NL" "$weight" || error
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight-temp.ttf" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight.ttf" --glyphs='*' --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error

        # UI-Non-Latin UI-NL
        source_file="${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight.ttf"
        python3 "${SCRIPT_DIR}/set-names.py" "${source_file}" "${BUILD_DIR}/$FONT_FILE_NAME-UI-NL-$weight-temp.ttf" "$FONT_FAMILY_NAME UI NL" "$weight" || error
        python3 "${SCRIPT_DIR}/set-uiargs.py" "${BUILD_DIR}/$FONT_FILE_NAME-UI-NL-$weight-temp.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-UI-NL-$weight-temp.ttf" $UIARGS || error
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-UI-NL-$weight-temp.ttf" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-UI-NL-$weight.ttf" --glyphs='*' --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error

        # Farsi-Digits-Non-Latin FD-NL
        source_file="${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight.ttf"
        python3 "${SCRIPT_DIR}/set-names.py" "${source_file}" "${BUILD_DIR}/$FONT_FILE_NAME-FD-NL-$weight-temp.ttf" "$FONT_FAMILY_NAME FD NL" "$weight" || error
        python3 "${SCRIPT_DIR}/set-farsi-digits.py" "${BUILD_DIR}/$FONT_FILE_NAME-FD-NL-$weight-temp.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-FD-NL-$weight-temp.ttf" || error
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-FD-NL-$weight-temp.ttf" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-FD-NL-$weight.ttf" --glyphs='*' --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error

        # UI-Farsi-Digits-Non-Latin UI-FD-NL
        source_file="${BUILD_DIR}/$FONT_FILE_NAME-NL-$weight.ttf"
        python3 "${SCRIPT_DIR}/set-names.py" "${source_file}" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-NL-$weight-temp.ttf" "$FONT_FAMILY_NAME UI FD NL" "$weight" || error
        python3 "${SCRIPT_DIR}/set-farsi-digits.py" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-NL-$weight-temp.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-NL-$weight-temp.ttf"  || error
        python3 "${SCRIPT_DIR}/set-uiargs.py" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-NL-$weight-temp.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-NL-$weight-temp.ttf" $UIARGS || error
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-NL-$weight-temp.ttf" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-NL-$weight.ttf" --glyphs='*' --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error

        # UI
        source_file="${BUILD_DIR}/$FONT_FILE_NAME-$weight.ttf"
        python3 "${SCRIPT_DIR}/set-names.py" "${source_file}" "${BUILD_DIR}/$FONT_FILE_NAME-UI-$weight-temp.ttf" "$FONT_FAMILY_NAME UI" "$weight" || error
        python3 "${SCRIPT_DIR}/set-uiargs.py" "${BUILD_DIR}/$FONT_FILE_NAME-UI-$weight-temp.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-UI-$weight-temp.ttf" $UIARGS || error
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-UI-$weight-temp.ttf" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-UI-$weight.ttf" --glyphs='*' --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error

        # Farsi-Digits
        source_file="${BUILD_DIR}/$FONT_FILE_NAME-$weight.ttf"
        python3 "${SCRIPT_DIR}/set-names.py" "${source_file}" "${BUILD_DIR}/$FONT_FILE_NAME-FD-$weight-temp.ttf" "$FONT_FAMILY_NAME FD" "$weight" || error
        python3 "${SCRIPT_DIR}/set-farsi-digits.py" "${BUILD_DIR}/$FONT_FILE_NAME-FD-$weight-temp.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-FD-$weight-temp.ttf" || error
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-FD-$weight-temp.ttf" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-FD-$weight.ttf" --glyphs='*' --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error

        # UI-Farsi-Digits UI-FD
        source_file="${BUILD_DIR}/$FONT_FILE_NAME-$weight.ttf"
        python3 "${SCRIPT_DIR}/set-names.py" "${source_file}" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-$weight-temp.ttf" "$FONT_FAMILY_NAME UI FD" "$weight" || error
        python3 "${SCRIPT_DIR}/set-farsi-digits.py" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-$weight-temp.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-$weight-temp.ttf" || error
        pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-$weight-temp.ttf" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-UI-FD-$weight.ttf" --glyphs='*' --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error
    }

    generateMiscTTFs 'Thin'
    generateMiscTTFs 'ExtraLight'
    generateMiscTTFs 'Light'
    generateMiscTTFs 'Regular'
    generateMiscTTFs 'Medium'
    generateMiscTTFs 'SemiBold'
    generateMiscTTFs 'Bold'
    generateMiscTTFs 'ExtraBold'
    generateMiscTTFs 'Black'

    log "Generating Non-Latin variable"
    # Non-Latin variable subset
    pyftsubset "${BUILD_DIR}/$FONT_FILE_NAME[wght].ttf" --unicodes-file="${BUILD_DIR}/vazirmatn_subset_unicodes.txt" --output-file="${BUILD_DIR}/$FONT_FILE_NAME-Variable-NL-subset.ttf" --layout-features='*' --name-IDs='*' --notdef-glyph --glyph-names || error
    # Non-Latin NL variable
    python3 "${SCRIPT_DIR}/set-names.py" "${BUILD_DIR}/$FONT_FILE_NAME-Variable-NL-subset.ttf" "${BUILD_DIR}/$FONT_FILE_NAME-NL[wght].ttf" "$FONT_FAMILY_NAME NL" Regular || error

    rm "${BUILD_DIR}"/*-temp.ttf || error
    rm "${BUILD_DIR}"/*-subset.ttf || error
fi

# ========================================
# Move hinted or not hinted files to final_ttfs/
# ========================================

mkdir -p "${BUILD_DIR}/final_ttfs" || error

if [ -z "$NO_HINTING" ]; then
    log "Generating hinted ttfs"
    for f in "${BUILD_DIR}"/*.ttf; do
        filename=$(basename "${f}")
        ttfautohint -n -W -D arab -f latn --hinting-limit=200 --hinting-range-min=8 --hinting-range-max=50 --increase-x-height=14 "${f}" "${f}.hinted" || error
        mv "${f}.hinted" "${f}"
        gftools fix-hinting "${f}" || error
        mv "${f}.fix" "${f}"
        rm -f "${BUILD_DIR}"/*backup*.ttf
    done
else
    for f in "${BUILD_DIR}"/*.ttf; do
        gftools fix-nonhinting "${f}" "${f}" || error
        rm -f "${BUILD_DIR}"/*backup*.ttf
    done
fi

mv "${BUILD_DIR}"/*.ttf "${BUILD_DIR}/final_ttfs/" || error

# ========================================
# Create web fonts (woff2)
# ========================================

log "Generating webfonts"
for f in "${BUILD_DIR}/final_ttfs"/*.ttf; do
    filename=$(basename "${f}")
    name="${filename%.*}"
    [ -z "$ONLY_TTF" ] && { python3 "${SCRIPT_DIR}/woff2-compress.py" "${f}" "${BUILD_DIR}/final_ttfs/${name}.woff2" || error; }
done

# ========================================
# Categorize all files
# ========================================

log "Moving generated files to package folder and categorizing them: ${PACKAGE_DIR}/fonts"
mkdir -p "${PACKAGE_DIR}/fonts" || error

# misc files
if [ -z "$NO_MISC" ]; then
    mkdir -p "${PACKAGE_DIR}/misc"

    mkdir -p "${PACKAGE_DIR}/misc/UI-Farsi-Digits-Non-Latin/fonts/ttf" || error
    mv "${BUILD_DIR}/final_ttfs"/*-UI-FD-NL-*.ttf "${PACKAGE_DIR}/misc/UI-Farsi-Digits-Non-Latin/fonts/ttf" || error
    mkdir -p "${PACKAGE_DIR}/misc/UI-Farsi-Digits-Non-Latin/fonts/webfonts" || error
    [ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*-UI-FD-NL-*.woff* "${PACKAGE_DIR}/misc/UI-Farsi-Digits-Non-Latin/fonts/webfonts" || error; }
    [ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME UI FD NL" "${PACKAGE_DIR}/misc/UI-Farsi-Digits-Non-Latin" || error; }

    mkdir -p "${PACKAGE_DIR}/misc/UI-Farsi-Digits/fonts/ttf" || error
    mv "${BUILD_DIR}/final_ttfs"/*-UI-FD-*.ttf "${PACKAGE_DIR}/misc/UI-Farsi-Digits/fonts/ttf" || error
    mkdir -p "${PACKAGE_DIR}/misc/UI-Farsi-Digits/fonts/webfonts" || error
    [ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*-UI-FD-*.woff* "${PACKAGE_DIR}/misc/UI-Farsi-Digits/fonts/webfonts" || error; }
    [ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME UI FD" "${PACKAGE_DIR}/misc/UI-Farsi-Digits" || error; }

    mkdir -p "${PACKAGE_DIR}/misc/UI-Non-Latin/fonts/ttf" || error
    mv "${BUILD_DIR}/final_ttfs"/*-UI-NL-*.ttf "${PACKAGE_DIR}/misc/UI-Non-Latin/fonts/ttf" || error
    mkdir -p "${PACKAGE_DIR}/misc/UI-Non-Latin/fonts/webfonts" || error
    [ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*-UI-NL-*.woff* "${PACKAGE_DIR}/misc/UI-Non-Latin/fonts/webfonts" || error; }
    [ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME UI NL" "${PACKAGE_DIR}/misc/UI-Non-Latin" || error; }

    mkdir -p "${PACKAGE_DIR}/misc/Farsi-Digits-Non-Latin/fonts/ttf" || error
    mv "${BUILD_DIR}/final_ttfs"/*-FD-NL-*.ttf "${PACKAGE_DIR}/misc/Farsi-Digits-Non-Latin/fonts/ttf" || error
    mkdir -p "${PACKAGE_DIR}/misc/Farsi-Digits-Non-Latin/fonts/webfonts" || error
    [ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*-FD-NL-*.woff* "${PACKAGE_DIR}/misc/Farsi-Digits-Non-Latin/fonts/webfonts" || error; }
    [ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME FD NL" "${PACKAGE_DIR}/misc/Farsi-Digits-Non-Latin" || error; }

    mkdir -p "${PACKAGE_DIR}/misc/Farsi-Digits/fonts/ttf" || error
    mv "${BUILD_DIR}/final_ttfs"/*-FD-*.ttf "${PACKAGE_DIR}/misc/Farsi-Digits/fonts/ttf" || error
    mkdir -p "${PACKAGE_DIR}/misc/Farsi-Digits/fonts/webfonts" || error
    [ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*-FD-*.woff* "${PACKAGE_DIR}/misc/Farsi-Digits/fonts/webfonts" || error; }
    [ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME FD" "${PACKAGE_DIR}/misc/Farsi-Digits" || error; }

    mkdir -p "${PACKAGE_DIR}/misc/UI/fonts/ttf" || error
    mv "${BUILD_DIR}/final_ttfs"/*-UI-*.ttf "${PACKAGE_DIR}/misc/UI/fonts/ttf" || error
    mkdir -p "${PACKAGE_DIR}/misc/UI/fonts/webfonts" || error
    [ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*-UI-*.woff* "${PACKAGE_DIR}/misc/UI/fonts/webfonts" || error; }
    [ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME UI" "${PACKAGE_DIR}/misc/UI" || error; }

    mkdir -p "${PACKAGE_DIR}/misc/Non-Latin/fonts/variable" || error
    [ -z "$NO_CSS" ] && { mv "${BUILD_DIR}/final_ttfs/$FONT_FILE_NAME-NL[wght].ttf" "${PACKAGE_DIR}/misc/Non-Latin/fonts/variable" || error; }

    mkdir -p "${PACKAGE_DIR}/misc/Non-Latin/fonts/ttf" || error
    mv "${BUILD_DIR}/final_ttfs"/*-NL-*.ttf "${PACKAGE_DIR}/misc/Non-Latin/fonts/ttf" || error
    mkdir -p "${PACKAGE_DIR}/misc/Non-Latin/fonts/webfonts" || error
    [ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*-NL*.woff* "${PACKAGE_DIR}/misc/Non-Latin/fonts/webfonts" || error; }
    [ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME NL" "${PACKAGE_DIR}/misc/Non-Latin" || error; }
fi

# main files (all the remain files)
[ -z "$NO_VARIABLE" ] && { mkdir -p "${PACKAGE_DIR}/fonts/variable" || error; }
[ -z "$NO_VARIABLE" ] && { mv "${BUILD_DIR}/final_ttfs"/$FONT_FILE_NAME[wght].ttf "${PACKAGE_DIR}/fonts/variable/" || error; }
mkdir -p "${PACKAGE_DIR}/fonts/ttf/" || error
mv "${BUILD_DIR}/final_ttfs"/*.ttf "${PACKAGE_DIR}/fonts/ttf/" || error
[ -z "$ONLY_TTF" ] && { mkdir -p "${PACKAGE_DIR}/fonts/webfonts" || error; }
[ -z "$ONLY_TTF" ] && { mv "${BUILD_DIR}/final_ttfs"/*.woff* "${PACKAGE_DIR}/fonts/webfonts" || error; }
[ -z "$NO_CSS" ] && { python3 "${SCRIPT_DIR}/webcss.py" "$FONT_FAMILY_NAME" "${PACKAGE_DIR}/" || error; }

# ========================================
# Copy files to --output-dir (fonts, misc, css)
# ========================================

log "Copying everything from ${PACKAGE_DIR} to --output-dir folder: ${OUTPUT_DIR}"
mkdir -p "${OUTPUT_DIR}" || error
cp -af "${PACKAGE_DIR}"/. "${OUTPUT_DIR}" || error

# ========================================
# Clean up
# ========================================

[ -z "$NO_TEMP_CLEAN" ] && log "Cleaning up"
[ -z "$NO_TEMP_CLEAN" ] && { rm -rf "${TEMP_DIR}" || error; }

elapsed=$((SECONDS - STARTTIME))
log "Build process finished in $elapsed seconds"
