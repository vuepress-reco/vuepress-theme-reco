> reco 主题 1.0 的代码仓库已经迁移至 [vuepress-theme-reco-1.x](https://github.com/vuepress-reco/vuepress-theme-reco-1.x)

🔥 The 2.x of vuepress-theme-reco.

In the past, theme `reco` has been supported by many friends, I am very honored, it changed my life, and I also made a lot of friends. But I don't think it is professional and flexible, and sometimes some advanced features require certain professionalism. I know that this is not easy for some Non-FE professional friends.

I hope the theme can be more out of the box, open and flexible, and inherit "simple" concept, give back to all friends. Come and tell me what you want it to be!

## 简介

reco 主题 2.0，依赖 `@vuepress-reco/vuepress-plugin-page` 为主题主题扩展的页面，同时可以为特定页面注入分类、标签和分页的相关数据，并依赖其他插件默认为主题扩展一些必要功能。


## 快速开始

**npx**

```bash
# 初始化，并选择 2.x
npx @vuepress-reco/theme-cli init
```

**npm**

```bash
# 初始化，并选择 2.x
npm install @vuepress-reco/theme-cli@1.0.7 -g
theme-cli init
```

**yarn**

```bash
# 初始化，并选择 2.x
yarn global add @vuepress-reco/theme-cli@1.0.7
theme-cli init
```

## 预览

<img width="800" alt="light_home" src="https://user-images.githubusercontent.com/18067907/134000239-dd38dde8-5e5b-48e8-93e8-1d44ddfa66ec.png">

<img width="800" alt="dark_home" src="https://user-images.githubusercontent.com/18067907/134000265-bf21536a-11f8-466b-8dd6-e3841a6d3b17.png">

<img width="800" alt="light_category" src="https://user-images.githubusercontent.com/18067907/134000281-723f3a16-ec8b-4051-aff0-cc0f74843ec3.png">

<img width="800" alt="dark_page" src="https://user-images.githubusercontent.com/18067907/134000306-253052af-a986-4af6-88a6-0259369d9dd3.png">

<img width="800" alt="light_page" src="https://user-images.githubusercontent.com/18067907/134000356-031678db-5449-4656-8b1f-cb2de72135f7.png">

<img width="800" alt="dark_category" src="https://user-images.githubusercontent.com/18067907/134000365-a24344c3-05ed-4bbb-abae-41653be9c4c0.png">

## alpha 版本待办事项

### 功能

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

### 优化

- [x] 完善文档
- [x] 侧边栏样式优化
- [x] 去除 scss，采用 css + postcss 方案
- [ ] ~~PWA 样式优化~~

## beta 版本待办事项

- [x] 增加 icon 功能
- [x] 整站加密
- [ ] 提供 tailwind 自定义 config 入口（后续官方所有风格和插件均采用 css + taiwindcss 方案）
- [ ] PWA 样式优化
- [ ] algolia 搜索样式优化
- [ ] comment 插件增强
- [ ] 增加图片适配暗色模式的配置
- [ ] 对指定文件夹进行功能支持，比如 series、docs、blogs
