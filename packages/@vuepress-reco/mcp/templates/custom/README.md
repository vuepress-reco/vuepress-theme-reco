---
home: true
modules:
  - BannerBrand
  - MdContent
  - Footer
bannerBrand:
  bgImage: '/bg.svg'
  title: '{{ PROJECT_NAME }}'
  description: '{{ PROJECT_DESCRIPTION }}'
  tagline: 基于 vuepress-theme-reco 的自定义网站
  buttons:
    - { text: '开始使用', link: '/guide/' }
    - { text: 'GitHub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco', type: 'plain' }
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco' }
isShowTitleInHome: true
---

## 欢迎使用 {{ PROJECT_NAME }}

{{ PROJECT_DESCRIPTION }}

这是一个使用 vuepress-theme-reco 主题创建的自定义网站。你可以根据自己的需求自由定制网站的内容和样式。

## 快速开始

**安装依赖**

```bash
pnpm install
```

**启动开发服务器**

```bash
pnpm dev
```

**构建静态文件**

```bash
pnpm build
```
