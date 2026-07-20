#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_DIR="$ROOT_DIR/deploy"

rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

for dir in "$ROOT_DIR"/[0-9][0-9]-*/solution; do
  [ -d "$dir" ] || continue
  slug="$(basename "$(dirname "$dir")")"
  pkg_name="$(node -p "require('$dir/package.json').name")"
  echo "Building $pkg_name -> deploy/$slug/app"
  npm run build -w "$pkg_name" -- --outDir="$DEPLOY_DIR/$slug/app" --base="/$slug/app/"
  node "$ROOT_DIR/scripts/inject-app-banner.mjs" "$DEPLOY_DIR/$slug/app/index.html" "$slug"
done

node "$ROOT_DIR/scripts/render-theory-pages.mjs"

echo "Deploy hub built at $DEPLOY_DIR"
