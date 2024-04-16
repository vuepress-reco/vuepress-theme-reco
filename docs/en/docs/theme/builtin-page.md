---
title: Build-in Page
date: 2023-06-29
---

:::tip
The theme has built-in pages that are independent pages with specific functions, that can be used to enrich the functionality of the site, such as placing the page entry on `navabr`.
:::

**Blog List Page**

- route: `/posts.html`
- description: A separate blog list page, that provides documentation stations with the ability to interact with users through blogs.
- example:
  ![image](https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/49feecbd-e41d-4991-a381-9cb05d611515)

**Timeline Page**

- route: `/timeline.html`
- description: The timeline of the blog, which can be used as an archive page.
- example:
  ![image](https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/95bcdd13-445b-4fae-aa3d-6d39d8d0ece7)

**Friendship Link**

- route: `/friendship-link.html`
- description: friendship link
- example:
  ![image](https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/4a939b03-0f5e-4bb5-980c-8a2e6120a654)
- config:
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
