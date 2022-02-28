#!/bin/bashSCRIPTS_DIR=$(dirname "$0")/../scripts
set -euo pipefail

REPO_DIR=$(dirname "$0")/..
OUTPUT_DIR="${REPO_DIR}"
bash "${SCRIPTS_DIR}"/make-fonts.sh --no-misc --no-css --repo-dir="${REPO_DIR}" --output-dir="${OUTPUT_DIR}"
