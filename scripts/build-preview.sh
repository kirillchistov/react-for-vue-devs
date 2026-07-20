#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_DIR="$ROOT_DIR/deploy"

rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

MODULES=()

for dir in "$ROOT_DIR"/[0-9][0-9]-*/solution; do
  [ -d "$dir" ] || continue
  slug="$(basename "$(dirname "$dir")")"
  pkg_name="$(node -p "require('$dir/package.json').name")"
  echo "Building $pkg_name -> deploy/$slug"
  npm run build -w "$pkg_name" -- --outDir="$DEPLOY_DIR/$slug" --base="/$slug/"
  MODULES+=("$slug")
done

node "$ROOT_DIR/scripts/build-preview-index.mjs" "$DEPLOY_DIR" "${MODULES[@]}"

echo "Deploy hub built at $DEPLOY_DIR"
