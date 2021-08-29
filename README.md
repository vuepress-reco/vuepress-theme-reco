# vuepress-theme-reco-next

🔥 The 2.x of vuepress-theme-reco.

In the past, theme `reco` has been supported by many friends, I am very honored, it changed my life, and I also made a lot of friends. But I don't think it is professional and flexible, and sometimes some advanced features require certain professionalism. I know that this is not easy for some Non-FE professional friends.

I hope the theme can be more out of the box, open and flexible, and inherit "simple" concept, give back to all friends. Come and tell me what you want it to be!

## 架构

![image](https://user-images.githubusercontent.com/18067907/113588190-64fa0380-9662-11eb-8ed6-b022b5fa43ef.png)

reco 主题 2.0，将不再是一个单纯的主题，更像是一个快速搭建 vuepress 主题的解决方案，或者叫做 `容器`。

它依赖 `@vuepress-reco/vuepress-plugin-page` 为主题主题扩展的页面，同时可以为特定页面注入分类、标签和分页的相关数据，并依赖其他插件默认为主题扩展一些必要功能。

reco 主题 2.0 最核心的功能就是提供了网站风格的插槽，允许通过 `reco.config.js` 指定网站风格和主题的其他配置，reco 主题将会内置一些风格，比如 reco 主题 1.0 的两种风格，并在未来也会拓展更多的风格，同时允许开发者更加轻松地自定义属于自己的风格。
 
## 主题风格

![image](https://user-images.githubusercontent.com/18067907/113588226-70e5c580-9662-11eb-84b3-ef64770c512c.png)

开发者可以按照 `风格 package` 的规范，依赖 reco 主题强大的风格插槽，任意扩展页面路由和页面内容，虽然使用同一款主题，但是每个人都可以拥有属于自己的风格。
