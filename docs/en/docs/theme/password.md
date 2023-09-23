---
title: Encryption
date: 2022-07-01 00:35:26
---

::: tip
If the website as a whole or a document is private and does not want to be made public, you can only enter the content page after filling in the key login (login is invalid after closing the browser tab).

- the number of passwords can only be 6 characters.
- multiple passwords can be set through an array.
:::

::: warning
1. The security of encryption is low, please use it as appropriate.
2. If encryption is set, the anchor function will fail.
:::

## Obtaining Ciphertext

If your password is `123456`, you need to convert it into ciphertext, that is, `e10adc3949ba59abbe56e057f20f883e`, use ciphertext to set the password.

After the website is released, enter `123456` in the password input box to enter the website, and others cannot know your password through the ciphertext in the code, but you must remember your password in plaintext.

Please enter the password plaintext in the input box below to get the corresponding ciphertext:

<md5 />

## Set Encryption

### Encrypt The e=Entire Website

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // set a single password
    password: '14e1b600b1fd579f47433b88e8d85291',
    // set multiple passwords
    password: [
      '14e1b600b1fd579f47433b88e8d85291',
      'f8de1968939dd4ac5992ce962993ac2b'
    ]
  })
})
```

### Encrypting A Single Page

```md
---
title: xxx
# set a single password
password: 14e1b600b1fd579f47433b88e8d85291
# set multiple passwords
password: 
 - 14e1b600b1fd579f47433b88e8d85291
 - f8de1968939dd4ac5992ce962993ac2b
---
```
