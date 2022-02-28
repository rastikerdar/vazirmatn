#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(dirname "$0")
REPO_DIR="${SCRIPT_DIR}"/..
VERSION="$(python3 ${SCRIPT_DIR}/get-version.py ${REPO_DIR}/fonts/ttf/Vazirmatn-Regular.ttf)"

# Make the release package file (zip)
RELEASEFILEPATH="vazirmatn-v$VERSION.zip"
rm -f "$RELEASEFILEPATH"
zip -r "$RELEASEFILEPATH" fonts misc Round-Dots Vazirmatn-font-face.css CHANGELOG.md README.md OFL.txt AUTHORS.txt

echo "Created $RELEASEFILEPATH"