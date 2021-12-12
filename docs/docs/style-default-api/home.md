---
title: 首页
date: 2021-11-06 23:36:01
---

::: tip
为了满足用户更多的使用场景，首页将进行模块化，用户可以在首页 md 文件的 frontmatter 中指定要展示的内容模块及其展示顺序，官方后期将开发更多的模块供大家使用，且支持用户自主开发首页模块。
:::

## 配置

目前内置的首页模块有 `Banner`、`Blog`、`MdContent`、`Footer`，其配置如下：

**modules**

- 描述：指定首页模块
- 默认值：`['Banner', 'Blog', 'Footer']`
- 可选值：`Banner`、`Blog`、`MdContent`、`Footer`
- 配置项：
  - Banner：巨幅展示图，可以展示 logo、标题、简述、背景图
  - Blog：博客模块，两栏布局，作则展示博客列表，右侧展示用户信息及博客相关内容
  - MdContent：首页的 markdown 正文展示模块
  - Footer：首页底部模块

**banner**
- 描述：用于配置 Banner 模块
- frontmatter 配置：
  - heroText：标题
  - tagline：简述
  - heroImage: 首页 logo
  - heroImageStyle: 首页 logo 样式
  - bgImage: 背景图片
  - bgImageStyle: 北京图片样式

**blog**
- 描述：用于配置 Blog 模块
- frontmatter 配置：
  - socialLinks：社交地址，社交 icon 请到 [Xions](https://www.xicons.org/#/zh-CN) 页面的 tabler 下获取，复制名称即可
- themeConfig 配置：
  - author：作者昵称
  - authorAvatar：作者头像

**footer**
- 描述：用于配置 Footer 模块
- frontmatter 配置：
  - record: 域名备案文案
  - recordLink：域名备案地址
  - cyberSecurityRecord: 公安备案文案
  - cyberSecurityLink：公安备案地址
  - startYear：本网站开始时间

## 案例

```yaml
---
home: true
modules: # 指定首页展示模块
  - Banner
  - Blog
  - MdContent
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
blog: # blog 模块的配置
  socialLinks: # 社交 icon 请到 [Xions](https://www.xicons.org/#/zh-CN) 页面的 tabler 下获取，复制名称即可
    - { icon: 'BrandGithub', link: 'https://github.com/recoluan' }
    - { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' }
footer: # 底部模块的配置
  - record: 域名备案文案
  - recordLink: 域名备案地址
  - cyberSecurityRecord: 公安备案文案
  - cyberSecurityLink: 公安备案地址
  startYear: 2018
---
```