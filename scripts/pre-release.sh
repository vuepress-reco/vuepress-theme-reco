#!/bin/bash

# 开启 Prereleases 模式
pnpm changeset pre enter beta

# 提交变更集
pnpm changeset

# 提升版本
pnpm changeset version

# 关闭 Prereleases 模式
pnpm changeset pre exit

# 新增版本 commit# get new version
VERSION=`node -p "require('./packages/vuepress-theme-reco/package.json').version"`
git add .
git commit -m "v${VERSION}"
git push

# 打 tag
git tag -a "v${VERSION}"
git push origin "v${VERSION}"

# 发布到 dist-tag next 下
pnpm changeset publish --tag next
