---
title: 介绍
date: 2023/01/01
---

# 介绍

欢迎使用 {{ PROJECT_NAME }}！

{{ PROJECT_DESCRIPTION }}

## 什么是 vuepress-theme-reco?

vuepress-theme-reco 是一款基于 VuePress 的博客主题，它可以帮助你快速搭建一个美观、功能丰富的静态博客或文档站点。

## 特性

- **简洁美观**：提供了一套简洁美观的主题设计
- **响应式设计**：适配各种屏幕尺寸，提供良好的移动端体验
- **博客功能**：支持分类、标签、时间轴等博客功能
- **插件生态**：提供丰富的插件生态，如评论系统、代码复制、AI聊天等
- **Markdown 增强**：支持更多的 Markdown 语法和功能
- **自定义主题**：支持自定义主题样式和布局

## 快速上手

### 安装

```bash
# 初始化项目
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建静态文件

```bash
pnpm build
```

## 配置

vuepress-theme-reco 提供了丰富的配置选项，你可以通过 `.vuepress/config.ts` 文件进行配置。

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  title: '项目名称',
  description: '项目描述',
  theme: recoTheme({
    // 主题配置
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: '作者名',
    // 更多配置...
  }),
})
```

## 插件

vuepress-theme-reco 提供了多种插件，可以根据需要进行配置：

- **@vuepress-reco/plugin-comments**：评论系统
- **@vuepress-reco/plugin-bulletin-popover**：公告弹窗
- **@vuepress-reco/plugin-code-copy**：代码复制
- **@vuepress-reco/plugin-ai-chat**：AI聊天功能
- **@vuepress-reco/plugin-vue-preview**：Vue组件预览
- **@vuepress-reco/plugin-markdown-task**：Markdown任务列表

## 贡献

如果你发现了问题或有新的想法，欢迎提交 [Issue](https://github.com/vuepress-reco/vuepress-theme-reco/issues) 或 [Pull Request](https://github.com/vuepress-reco/vuepress-theme-reco/pulls)。
