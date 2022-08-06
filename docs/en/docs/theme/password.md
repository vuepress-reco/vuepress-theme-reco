---
title: Site-wide encryption
date: 2022-07-01 00:35:26
---

## 加密介绍

If the project is private and does not want to be disclosed, you can enter the content page only after filling in the key to log in (the login will be invalid after closing the browser tab). Set `password` in the format of an array, you can set multiple passwords, the value of the array must be a string, **the number of digits of the password can only be 6**.

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

## set ciphertext

If your password is `123456`, you need to set the password string to 32-bit md5 encrypted ciphertext, which is `e10adc3949ba59abbe56e057f20f883e`. After the website is published, enter `123456` in the password input box to enter the website. At the same time, others cannot know your password through the ciphertext in the code, but you must remember your own password.

Please enter the password in the input box below to obtain the corresponding md5 encrypted 32-bit ciphertext:
<md5></md5>
