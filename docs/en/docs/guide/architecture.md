---
title: Architecture
date: 2021-11-05 00:28:46
---

## Architecture

![image](https://user-images.githubusercontent.com/18067907/113588190-64fa0380-9662-11eb-8ed6-b022b5fa43ef.png)

reco theme 2.0, It will no longer be a simple theme, but more like a solution to quickly build a vuepress theme, or `container`。

It relies on `@vuepress-reco/vuepress-plugin-page` to extend the page for the theme, and can inject relevant data of categories, tags and paging for specific pages, and depends on other plugins to extend some necessary functions for the theme by default.

The core function of reco theme 2.0 is to provide a website style slot, allowing the website style and other configuration of the theme to be specified through `reco.config.js`. The reco theme will have some built-in styles, such as the two styles of reco theme 1.0, and will expand more styles in the future, while allowing developers to customize their own styles more easily.
 
## Theme Style

![image](https://user-images.githubusercontent.com/18067907/113588226-70e5c580-9662-11eb-84b3-ef64770c512c.png)

Developers can follow the `style package` specification and rely on the powerful style slots of the reco theme to arbitrarily expand page routing and page content. Although they use the same theme, everyone can have their own style.