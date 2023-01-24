---
title: Home Page
date: 2021-11-06 23:36:01
---

::: tip
In order to meet more usage scenarios of users, the theme has modularized the home page. Users can specify the content modules to be displayed and their display order in the `frontmatter` of the md file of the home page. More modules will be developed later for everyone to use , and supports users to customize the home page module as needed.
:::

## Configure

Currently, the built-in homepage modules include `Banner`, `BannerBrand`, `Blog`, `MdContent`, `Footer`, and their configurations are as follows:

### modules
 
- description: Specify the home page module
- default: `['Banner', 'Blog', 'Footer']`
- optional：`Banner`、`BannerBrand`、`Blog`、`MdContent`、`Footer`
- configuration item: 
  - Banner: Huge display map, can display logo, title, brief description, background image, top and bottom layout
  - BannerBrand: Huge display map in brand format, which can display logo, title, brief description, background image, button, left and right layout
  - Blog: Blog module, two-column layout, showing the list of blogs as a rule, and displaying user information and blog-related content on the right
  - MdContent: The markdown text display module of the home page
  - Footer: Home Bottom Module

**banner**
- description: Used to configure the `Banner` module
- frontmatter options: 
  - heroText: title
  - tagline: Briefly
  - heroImage: index logo
  - heroImageStyle: index logo style
  - bgImage: Background image
  - bgImageStyle: Background image style
- case: 
  - <img width="600" alt="banner" src="https://user-images.githubusercontent.com/18067907/152644548-5606f75f-4739-47e5-8105-c11164fbae82.png">

### bannerBrand
- description: Used to configure the `BannerBrand` module
- frontmatter options:
  - heroText: title
  - tagline: Briefly
  - heroImage: index logo
  - heroImageStyle: index logo style
  - bgImage: Background image
  - bgImageStyle: Background image style
  - buttons: button
    - text: button text
    - link: content link
    - type: content style, the default background color, if not needed, can be set to 'plain'
  - socialLinks: For social address, See [here](/en/docs/guide/icon) for settings
    - icon: icon
    - link: button link
- case: 
  - <img width="600" alt="bannerBrand" src="https://user-images.githubusercontent.com/18067907/152644602-3e84c4cb-a989-4674-8b2e-ed7c0eeb8cad.png">

### blog
- description: Used to configure the `Blog` module
- frontmatter options:
  - socialLinks: For social address, See [here](/en/docs/guide/icon) for settings
    - icon: icon
    - link: button link
- themeConfig options: 
  - author: author name
  - authorAvatar: author avatar
- case: 
  - <img width="600" alt="blog" src="https://user-images.githubusercontent.com/18067907/152644663-dd7ae13f-b508-48c3-bf1a-dab5dc0c89ab.png">

### footer
- description: Used to configure the `Footer` module
- frontmatter options: 
  - record: Domain name filing copy
  - recordLink: Domain name registration address
  - cyberSecurityRecord: Police record copy
  - cyberSecurityLink: Public security record address
  - startYear: Start time of this site
- case: 
  - <img width="600" alt="footer" src="https://user-images.githubusercontent.com/18067907/152644689-f7fc1e34-6f43-44f5-86a0-fd26d4157bb1.png">

### MdContent
- description: The markdown text display module of the home page
- case

## Case

```yaml
---
home: true
modules: # Designated homepage display module
  - Banner
  - Blog
  - MdContent
  - Footer
banner: # banner module configuration
  heroText: 午后南杂
  tagline: Enjoy when you can, and endure when you must.
  heroImage: /logo.png
  heroImageStyle:
    maxWidth: 200px
    margin: 0 auto 2rem
  bgImage: /banner.jpg
  bgImageStyle:
    height: 450px
bannerBrand: # bannerBrand module configuration
  heroText: 午后南杂
  tagline: Enjoy when you can, and endure when you must.
  heroImage: /logo.png
  heroImageStyle:
    maxWidth: 200px
    margin: 0 auto 2rem
  bgImage: /banner.jpg
  bgImageStyle:
    height: 450px
  buttons:
    - { text: Guide, link: '/docs/guide/introduce' }
    - { text: Default Style, link: '/docs/theme/introduce', type: 'plain' }
blog: # blog module configuration
  socialLinks: # For social address
    - { icon: 'BrandGithub', link: 'https://github.com/recoluan' }
    - { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' }
footer: # footer module configuration
  record: Domain name filing copy
  recordLink: Domain name registration address
  cyberSecurityRecord: Police record copy
  cyberSecurityLink: Public security record address
  startYear: 2018
---
```

## Custom Home Module

::: warning
The css scheme of the reco theme is postcss + tailwindcss, which supports the latest CSS nesting proposal (class scss), you need to pay attention when writing styles for components.
:::

As long as the component is registered globally, it can be used by the home page as a module of the home page.

First, you can refer to [Register Components](/docs/theme/register-components.html) to register the homepage module component as a global component, and then configure it in the frontmatter of the homepage (if the custom module component is CustomModule):

```yaml
---
home: true
modules: # Designated homepage display module
  - CustomModule
  - Footer
customModule: # customModule module configuration
  key: value
footer: # footer module configuration
  record: Domain name filing copy
  recordLink: Domain name registration address
  cyberSecurityRecord: Police record copy
  cyberSecurityLink: Public security record address
  startYear: 2018
---
```

When developing the front page module, you can get the `frontmatter` configuration by the following methods:

```js
import { usePageFrontmatter, withBase } from '@vuepress/client'
const frontmatter = usePageFrontmatter()
```
