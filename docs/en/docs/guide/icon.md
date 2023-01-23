---
title: Icon
date: 2023-01-23
---

## Introduction

`vuepress-theme-reco@2.x` is used to configure icons through [Xicons](https://www.xicons.org/#/zh-CN). `Xicons` integrates eight kinds of icons, `fluent`, `ionicons4`, `ionicons5`, `antd`, `fa`, `material`, `tabler` and `carbon`, which can almost meet most scenes.

## Usage

`vuepress-theme-reco@2.x` encapsulate it into global component of 'Xicons', which allows users to use them directly in markdown files. Some of the places in themes that allow users to configure icons also use `Xicons` component, ensuring the same experience.

### Used in markdown

If you want to export an alien icon in markdown <xicons icon="tabler.Alien" />, you can do something like this in markdown:

```vue
<xicons icon="tabler.Alien" />
```

#### Props

|Params|Description|Type|Optional|Default|
|-|-|-|-|-|
|icon|Icon|string|Such as `tabler.Alien`, [Classification.Name], `Classification` is the TAB name of [Xicons] (https://www.xicons.org/#/zh-CN), Name is a specific icon name|tabler.Alien|
|color|Color of icon and text|string|-|inherit|
|iconPosition|The position of icon, this makes sense when both icon and text are set|string|top/bottom/left/right|left|
|iconSize|The size of icon|string|-|18|
|text|The content of text|string|-|-|
|textSize|The size of text|string|-|14|
|link|Jump link|string|-|javascript:void(0)|
|target|Jump method|string|_self/_blank/_parent/_top|_self|

#### Slots

|name|说明|
|-|-|
|default|Specify the contents of the props.text position to express more complex content|

### Used in configuration

Some of the places in the theme where icons are allowed to be configured, such as [home page](/docs/theme/home), are the same as the Props.icon above.

