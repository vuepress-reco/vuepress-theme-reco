pnpm docs:build

cd docs/.vuepress/dist

ls

git init
git add -A
git commit -m 'docs: update docs'

# git push -f git@github.com:recoluan/vuepress-reco-doc.git master

# git push -f git@git.coding.net:recoluan/vuepress-theme-reco-doc.git master

git remote remove origin

git remote add origin git@github.com:vuepress-reco/docs-v2.git

git remote -v

git push origin master -f

cd ../
rm -rf dist
