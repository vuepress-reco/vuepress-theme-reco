---
title: 贡献
date: 2022-08-06 22:37:36
---

欢迎大家为 reco 主题贡献代码！

## 项目初始化

首先你需要 fork 一份 [reco 主题仓库](https://github.com/vuepress-reco/vuepress-theme-reco)，并 clone 到本地，并确保本地已经安装了 `pnpm`。

以上准备工作完成以后，进入项目文件夹，并执行以下命令：

```bash
# 安装
pnpm install

# 编译
pnpm build

# 启动
pnpm dev
```

这个时候，项目已经启动，你可以 `example` 中去测试你的功能，要确保你的代码已经经过详细测试，并通过了 `pnpm example:build` 命令，功能测试完一定要同步文档。

## 代码提交规范

提交 commit 请使用 `pnpm commit` 命令，严格按照规范去提交代码，commit 信息务必使用英文。

## PR 规范

PR 标题简单明了，PR 详情中要详细描述你所提交的内容，必要时要贴图，PR 信息务必使用英文。