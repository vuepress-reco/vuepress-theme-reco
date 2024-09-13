---
title: Locale Config
date: 2022-06-07 22:30:37
---

These options configure locale-related texts.

If your site is served in a different language besides English, you should set these options per locale to provide translations.

## Options

|Options|Type|Default|Description|
|-|-|-|-|
|categories|`string`|Categories|categories|
|tags|`string`|Tags|tags|
|catalogTitle|`string`|ON THIS PAGE|The title of the table of contents on the right of the article|
|selectLanguageText|`string`|Languages|Select text from the language menu|
|selectLanguageName|`string`|${lang}|Language name of Locale|
|editLinkText|`string`|Edit this page|Edit the text of the link on this pag|
|lastUpdatedText|`string`|Last Updated|The text of the recently updated timestamp label|
|tip|`string`|TIP|Customize the title of the tip container|
|info|`string`|INFO|Customize the title of the info container|
|warning|`string`|WARNING|Customize the title of the warning container|
|danger|`string`|DANGER|Customize the title of the danger container|
|details|`string`|DETAILS|Customize the title of the details container|
|notFound|`string`|Oops! Page does not exist.|404 page text|
|backToHome|`string`|Back To Home|404 page returns to the home page|

## Example

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
      tip: 'Tip',
      info: 'Info',
      danger: 'Danger',
      warning: 'Warning',
      details: 'Details',
      backToHome: 'Back To Home',
      catalogTitle: 'On This Page',
      editLinkText: 'Edit this page',
      notFound: 'Oops! Page does not exist.',
      selectLanguageText: 'Languages',
      lastUpdatedText: 'Last Updated',
      selectLanguageName: 'English',
  })
})
```