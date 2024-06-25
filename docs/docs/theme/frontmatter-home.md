---
title: 首页
date: 2021-11-06 23:36:01
---

::: tip
为了满足用户更多的使用场景，主题已经将首页进行了模块化，用户可以在首页 md 文件的 `frontmatter` 中指定要展示的内容模块及其展示顺序，后期将开发更多的模块供大家使用，且支持用户按需自定义首页模块。
:::

## 配置

目前内置的首页模块有 `Banner`、`BannerBrand`、`Features`、`Blog`、`MdContent`、`Comment`, `Footer`，其配置如下：

### modules

- 描述：指定首页模块
- 默认值：`['BannerBrand', 'Blog', 'Footer']`
- 可选值：`Banner`、`BannerBrand`、`Features`、`Blog`、`MdContent`、`Comment`、`Footer`
- 配置项：
  - Banner：巨幅展示图，可以展示 logo、标题、简述、背景图，上下布局
  - BannerBrand：品牌格式的巨幅展示图，可以展示 logo、标题、简述、背景图、按钮，左右布局
  - Features: 首页特性列表
  - Blog：博客模块，两栏布局，作则展示博客列表，右侧展示用户信息及博客相关内容
  - MdContent：首页的 markdown 正文展示模块
  - Comment: 评论模块
  - Footer：首页底部模块

### banner
- 描述：用于配置 Banner 模块
- frontmatter 配置：
  - heroText：标题
  - tagline：简述
  - heroImage: 首页 logo
  - heroImageStyle: 首页 logo 样式
  - bgImage: 背景图片
  - bgImageStyle: 背景图片样式
- 案例：
  - <img width="600" alt="banner" src="https://user-images.githubusercontent.com/18067907/152644548-5606f75f-4739-47e5-8105-c11164fbae82.png">

### bannerBrand
- 描述：用于配置 BannerBrand 模块
- frontmatter 配置：
  - title：标题
  - description: 描述
  - tagline：标语
  - buttons: 按钮
    - text: 按钮文案
    - link: 按钮地址
    - type: 按钮风格，默认带背景色，如果不需要可以设置为 'plain'
  - socialLinks：社交地址
    - icon: 图标，设置方式见 [这里](/docs/guide/icon)
    - link: 按钮地址
- 案例：
  - <img width="600" alt="bannerBrand" src="https://user-images.githubusercontent.com/18067907/214793265-d316133f-12c3-47a3-8f96-a34e5cca5087.png">

### blog
- 描述：用于配置 Blog 模块
- frontmatter 配置：
  - socialLinks：社交地址
    - icon: 图标，设置方式见 [这里](/docs/guide/icon)
    - link: 按钮地址
- themeConfig 配置：
  - author：作者昵称
  - authorAvatar：作者头像
- 案例：
  - <img width="600" alt="blog" src="https://user-images.githubusercontent.com/18067907/216823247-8aee08e1-2c24-45e5-8c2e-b9a919ed1c27.png">

### features
- 描述：配置首页特性列表
- frontmatter 配置：
  - title：标题
  - details：详情
- 案例：
  - <img width="600" alt="footer" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/5b1ced88-606a-4088-b32d-4a9c6ed9cc66">

### footer
- 描述：用于配置 Footer 模块
- frontmatter 配置：
  - record: 域名备案文案
  - recordLink：域名备案地址
  - cyberSecurityRecord: 公安备案文案
  - cyberSecurityLink：公安备案地址
  - startYear：本网站开始时间
- 案例：
  - <img width="600" alt="footer" src="https://user-images.githubusercontent.com/18067907/152644689-f7fc1e34-6f43-44f5-86a0-fd26d4157bb1.png">

### MdContent
- 描述：首页的 markdown 正文展示模块
- 案例：-

###  Comment
- 描述： 评论功能，如果站点想把评论功能放在首页，可以配置这个选项
- 案例：-

## 案例

```yaml
---
home: true
modules: # 指定首页展示模块
  - BannerBrand
  - Blog
  - MdContent
  - Features
  - Footer
banner: # banner 模块的配置
  heroText: 午后南杂
  tagline: Enjoy when you can, and endure when you must.
  heroImage: /logo.png
  heroImageStyle:
    maxWidth: 200px
    margin: 0 auto 2rem
  bgImage: /banner.jpg
  bgImageStyle:
    height: 450px
bannerBrand: # bannerBrand 模块的配置
  title: vuepress-reco
  description: 一款简洁的 vuepress 博客 & 文档 主题。
  tagline: vuepress-theme-reco 2.0 继续坚持简洁的风格，所有功能开箱即用，首页模块化组装，使用 tailwindcss 书写样式，将 Vite 作为默认编译器。你只需要负责内容创作，其他请交给我。
  buttons:
    - { text: Guide, link: '/docs/guide/introduce' }
    - { text: Default Style, link: '/docs/theme/introduce', type: 'plain' }
  socialLinks: # 社交地址
    - { icon: 'LogoGithub', link: 'https://github.com/recoluan' }
blog: # blog 模块的配置
  socialLinks: # 社交地址
    - { icon: 'LogoGithub', link: 'https://github.com/recoluan' }
features:
- title: 过去
  details: 开发一款看着开心、写着顺手的 vuepress 博客主题。
- title: 当下
  details: 帮助更多的朋友节省时间去用心书写内容，而不是仅仅配置一个博客去孤芳自赏。
- title: 未来
  details: 吸引更多的朋友参与到开发中来，继续强大功能。
footer: # 底部模块的配置
  record: 域名备案文案
  recordLink: 域名备案地址
  cyberSecurityRecord: 公安备案文案
  cyberSecurityLink: 公安备案地址
  startYear: 2018
---
```

## 自定义首页模块

::: warning
reco 主题的 css 方案是 postcss + tailwindcss，支持 css 最新嵌套提案（类 scss），为组件书写样式时需注意。
:::

只要组件在全局注册，即可作为首页的模块被首页使用。

首先可以参考 [注册组件](/docs/theme/register-components.html) 将首页模块组件注册为全局组件，然后在首页的 frontmatter 中去配置（假如自定义的模块组件为 CustomModule）：

```yaml
---
home: true
modules: # 指定首页展示模块
  - CustomModule
  - Footer
customModule: # customModule 模块的配置
  key: value
footer: # 底部模块的配置
  record: 域名备案文案
  recordLink: 域名备案地址
  cyberSecurityRecord: 公安备案文案
  cyberSecurityLink: 公安备案地址
  startYear: 2018
---
```

开发首页模块时，可以通过下面方法去获得 frontmatter 配置：

```js
import { usePageFrontmatter, withBase } from 'vuepress/utils'
const frontmatter = usePageFrontmatter()
```
