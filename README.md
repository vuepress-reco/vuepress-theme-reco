> 🔥 This is reco theme 2.0, and the 1.0 repository has been migrated to [vuepress-theme-reco-1.x](https://github.com/vuepress-reco/vuepress-theme-reco-1.x)

## Introduce

In the past, theme `reco` has been supported by many friends, I am very honored, it changed my life, and I also made a lot of friends. But I don't think it is professional and flexible, and sometimes some advanced features require certain professionalism. I know that this is not easy for some Non-FE professional friends.

Some functions of `reco@2.x` refer to the default theme of `vuepress@2.x`, but it is no longer magically changed on the default theme like `0.x` and `1.x`. This is a new set of solutions, such as The style adopts the `tailwindCSS` scheme, and the page extension capability is realized through the plugin `@vuepress-reco/vuepress-plugin-page`.

At the same time, you must rely on this document to configure your project. You cannot compare it with the official default theme document, because only a small amount of configuration overlaps with the official default theme document.

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

## Preview

<img width="800" alt="home_dark" src="https://user-images.githubusercontent.com/18067907/211355760-6919c0d3-bddb-45a2-99b9-77c6f9380cf3.png">

<img width="800" alt="doc_dark" src="https://user-images.githubusercontent.com/18067907/211355788-7f6790d1-f183-4b2c-976f-b77c837736f2.png">

<img width="800" alt="home_light" src="https://user-images.githubusercontent.com/18067907/211355806-4f1e325d-637d-4a33-8c32-1f6f4f00df29.png">

<img width="800" alt="doc_light" src="https://user-images.githubusercontent.com/18067907/211355824-c0dc3611-b0f0-47c8-9c06-58167fc8cbd6.png">

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

## Beta Todo List

- [x] 增加 icon 功能
- [x] 整站加密
- [ ] 提供 tailwind 自定义 config 入口（后续官方所有风格和插件均采用 css + taiwindcss 方案）
- [ ] PWA 样式优化
- [ ] algolia 搜索样式优化
- [ ] comment 插件增强
- [ ] 增加图片适配暗色模式的配置
- [ ] 对指定文件夹进行功能支持，比如 series、docs、blogs

## Contributors

<a style="display: block;margin-top: 10px" href="https://github.com/vuepress-reco/vuepress-theme-reco/graphs/contributors" target="_black">
  <img 
    alt="vuepress-theme-reco" 
    src="https://img.shields.io/github/contributors/vuepress-reco/vuepress-theme-reco?style=for-the-badge&logo=github&label=vuepress-theme-reco&color=616ae5" />
</a>

<br />

**P.S. Thanks to the two beauties for their contributions to the theme logo: Zoey and 冰冰.**
