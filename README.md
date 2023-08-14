<p align="center">
  <a href="https://vuepress-theme-reco.recoluan.com/en/" target="_blank" rel="noopener noreferrer">
    <img width="200" src="https://user-images.githubusercontent.com/18067907/211360896-daee923a-8b60-4025-9858-172c186d2549.png" alt="logo" />
  </a>
</p>
<br/>
<p align="center">
  <img alt="GitHub license" src="https://img.shields.io/github/license/vuepress-reco/vuepress-theme-reco?style=flat-square&logo=github&color=616ae5">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/vuepress-reco/vuepress-theme-reco?style=flat-square&logo=github&color=616ae5">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/vuepress-reco/vuepress-theme-reco?style=flat-square&logo=github&color=616ae5">
  <img alt="Npm downloads" src="https://img.shields.io/npm/dt/vuepress-theme-reco?style=flat-square&logo=npm&color=616ae5">
  <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/vuepress-reco/vuepress-theme-reco?filename=packages%2Fvuepress-theme-reco%2Fpackage.json&style=flat-square&color=616ae5&logo=npm">
  <img alt="Npm version" src="https://img.shields.io/badge/tailwindcss-3.1.6-616ae5?style=flat-square&logo=tailwindcss"/>
</p>

<br/>

## 🔥 vuepress-theme-reco

> This is reco theme 2.0, and the 1.0 repository has been migrated to [vuepress-theme-reco-1.x](https://github.com/vuepress-reco/vuepress-theme-reco-1.x)

<br/>

In the past, theme `reco` has been supported by many friends, I am very honored, it changed my life, and I also made a lot of friends. But I don't think it is professional and flexible, and sometimes some advanced features require certain professionalism. I know that this is not easy for some Non-FE professional friends.

Some functions of `reco@2.x` refer to the default theme of `vuepress@2.x`, but it is no longer magically changed on the default theme like `0.x` and `1.x`. This is a new set of solutions, such as The style adopts the `tailwindCSS` scheme, and the page extension capability is realized through the plugin `@vuepress-reco/vuepress-plugin-page`.

At the same time, you must rely on this document to configure your project. You cannot compare it with the official default theme document, because only a small amount of configuration overlaps with the official default theme document.

**Please move [Demo](https://www.recoluan.com/) and [Docs](https://vuepress-theme-reco.recoluan.com/) to play!**

<br/>

## Quick Start

**npx**

```bash
# Init，and choose 2.x
npx @vuepress-reco/theme-cli init
```

**npm**

```bash
# Init，and choose 2.x
npm install @vuepress-reco/theme-cli@1.0.7 -g
theme-cli init
```

**yarn**

```bash
# Init，and choose 2.x
yarn global add @vuepress-reco/theme-cli@1.0.7
theme-cli init
```

<br/>

## Preview

<img width="800" alt="home_dark" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/5a20e487-e7ff-4820-b9b1-65068da8d8fc">

<br/>

<img width="800" alt="doc_dark" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/909ba49d-72b1-4f90-8950-dadec99741a1">

<br/>

<img width="800" alt="blog_dark" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/f68466fe-ba76-4792-a1cf-9adc5dcbf420">

<br/>

<img width="800" alt="home_light" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/90c09696-f196-481b-b058-1332ce432136">

<br/>

<img width="800" alt="doc_light" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/6c942c42-a2d7-4945-ae07-eb4fdcaedff2">

<br/>

<img width="800" alt="blog_light" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/d3b7c656-b942-4d7e-a2f9-6089de325429">

<br/>

## Alpha Todo List

### Functions

- [x] 自定义首页功能
- [x] nprogress 插件
- [x] back-to-top 插件
- [x] comment 插件（目前仅支持 valine，vssue 还没有支持 Vue3）
- [x] container 插件
- [x] 公告 插件
- [x] 代码预览 插件
- [x] 按照文件夹自动进设置 categories
- [ ] ~~提供 tailwind 自定义 config 入口（后续官方所有风格和插件均采用 css + taiwindcss 方案）~~
- [ ] ~~根据 tag 生成神经网络图（参考 obsidian）~~
- [ ] ~~加密功能~~
- [ ] ~~loading 功能~~
- [ ] ~~增加 icon 功能~~
- [ ] ~~提供自定义任意页面的 API~~

### Optimizations

- [x] 完善文档
- [x] 侧边栏样式优化
- [x] 去除 scss，采用 css + postcss 方案
- [ ] ~~PWA 样式优化~~

<br/>

## Beta Todo List

- [x] 增加 icon 功能
- [x] 整站加密
- [ ] 提供 tailwind 自定义 config 入口（后续官方所有风格和插件均采用 css + taiwindcss 方案）
- [ ] PWA 样式优化
- [x] algolia 搜索样式优化
- [x] comment 插件增强
- [ ] 增加图片适配暗色模式的配置
- [x] 对指定文件夹进行功能支持，比如 series、docs、blogs

<br/>

## Contributors

<a style="display: block;margin-top: 10px" href="https://github.com/vuepress-reco/vuepress-theme-reco/graphs/contributors" target="_black">
  <img 
    alt="vuepress-theme-reco" 
    src="https://img.shields.io/github/contributors/vuepress-reco/vuepress-theme-reco?style=for-the-badge&logo=github&label=vuepress-theme-reco&color=616ae5" />
</a>

<br />

**P.S. Thanks to the two beauties for their contributions to the theme logo: Zoey and 冰冰.**
