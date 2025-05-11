---
home: true
modules:
  - BannerBrand
  - Blog
  - MdContent
  - Footer
bannerBrand:
  bgImage: '/bg.svg'
  title: '{{ PROJECT_NAME }}'
  description: '{{ PROJECT_DESCRIPTION }}'
  tagline: 使用 vuepress-theme-reco 搭建的博客
  buttons:
    - { text: '开始使用', link: '/docs/guide/introduce' }
    - { text: 'GitHub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco', type: 'plain' }
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco' }
blog:
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco' }
isShowTitleInHome: true
actionText: About
actionLink: /views/other/about
---

## 快速开始

**安装**

```bash
# 初始化项目
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
