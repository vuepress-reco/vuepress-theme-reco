---
title: 内置页面
date: 2023-06-29
---

:::tip
主题内置了一些页面，这些页面是承载了特定功能的独立页面，可以用于丰富站点的功能，比如可以将页面入口放在 `navabr` 上。

如果想要注册页面，请参考 [这里](/docs/theme/pages.html)。
:::

**博客列表页面**

- 路由：`/posts.html`
- 描述：独立的博客列表页，给文档站提供一个通过博客跟用户互动的能力
- 案例：
  ![image](https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/49feecbd-e41d-4991-a381-9cb05d611515)

**时间轴页面**

- 路由：`/timeline.html`
- 描述：博客的时间轴，可以作为归档页面
- 案例：
  ![image](https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/95bcdd13-445b-4fae-aa3d-6d39d8d0ece7)

**友情链接**

- 路由：`/friendship-link.html`
- 描述：友情链接
- 案例：
  ![image](https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/4a939b03-0f5e-4bb5-980c-8a2e6120a654)
- 配置：
  ```ts
  import { defineUserConfig } from 'vuepress'
  import { recoTheme } from 'vuepress-theme-reco'

  export default defineUserConfig({
    theme: recoTheme({
      friendshipLinks: [
        {
          title: 'vuepress-recovuepress-recovuepress-recovuepress-reco',
          logo: 'https://avatars.githubusercontent.com/u/54167020?s=200&v=4',
          link: 'https://github.com/vuepress-reco'
        }
      ]
    })
  })
  ```
