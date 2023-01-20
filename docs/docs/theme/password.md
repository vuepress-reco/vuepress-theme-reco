---
title: 整站加密
date: 2022-07-01 00:35:26
---

## 加密介绍

如果项目具有私密性，不希望被公开，只有填入密钥登录后（关闭浏览器标签后登录失效），才能进入内容页面。以数组的格式设置 `password`，可以设置多个密码，数组的值必须是字符串，**密码位数只能是 6 位**。

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    password: 'e10adc3949ba59abbe56e057f20f883e'
  })
})
```

## 设置密文

如果你的密码是 `123456`，需要将密码字符串设置为32位的 md5 加密密文，也就是 `e10adc3949ba59abbe56e057f20f883e`。网站发布后，在密码输入框输入 `123456` 即可进入网站，同时他人也无法通过代码中的密文知道你的密码，但是你一定要记住自己的密码。

请在下面的输入框输入密码，获取相应的md5加密的32位密文：
<md5 placeholder="请输入密码"></md5>
