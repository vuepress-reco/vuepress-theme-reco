#!/usr/bin/env bash

set -euo pipefail

pnpm docs:build

cd docs/.vuepress/dist

ls

git init -b master
git add -A
git commit -m 'docs: update docs'

# git push -f git@github.com:recoluan/vuepress-reco-doc.git master

# git push -f git@git.coding.net:recoluan/vuepress-theme-reco-doc.git master

git remote remove origin 2>/dev/null || true

git remote add origin git@github.com:vuepress-reco/vuepress-reco.github.io.git

git remote -v

git push --force origin master

cd ../
rm -rf dist
