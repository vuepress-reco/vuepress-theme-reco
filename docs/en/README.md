---
home: true
modules:
  - CustomBanner
  - MdContent
  - Footer
customBanner:
  bgImage: '/bg.svg'
  title: vuepress-reco
  description: 'A simple vuepress Blog & Doc theme.'
  tagline: vuepress-theme-reco 2.0 continues to adhere to the concise style, all functions are out of the box, the home page is assembled modularly, the style is written with tailwindcss, and Vite is used as the default compiler. You only need to be responsible for content creation, please leave the rest to me.
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco' }
  buttons:
    - { text: Guide, link: '/en/docs/guide/introduce' }
    - { text: Theme config, link: '/en/docs/theme/series', type: 'plain' }
footer:
  startYear: 2018
isShowTitleInHome: true
actionText: About
actionLink: /views/other/about
features:
- title: Past
  details: Develop a vuepress blog theme that looks happy and writes smoothly.
- title: Present
  details: Help more friends save time to write content with heart, instead of just configuring a blog to enjoy yourself.
- title: Future
  details: Attract more friends to participate in the development and continue to have powerful functions.
---

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
