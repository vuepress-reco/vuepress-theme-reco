---
title: 图标
date: 2023-01-23
---

## 介绍

`vuepress-theme-reco@2.x` 是通过 [Xicons](https://www.xicons.org/#/zh-CN) 来配置图标的，`Xicons` 只集成了 [carbon](https://carbondesignsystem.com/guidelines/icons/library) 1 种图标，几乎可以满足绝大部分场景。

## 使用

主题将其封装封装成了 `Xicons` 全局组件，允许在用户 markdown 文件中直接使用，主题中的一些允许配置图标的地方也是使用了 `Xicons` 组件，保证一样的使用体验。

### 在 markdown 中使用

如果想要在 markdown 中输出一个星星图标 <xicons icon="Star" />，你就可以在 markdown 中这样比编辑代码：

```vue
<xicons icon="Star" />
```

#### Props

|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|icon|图标|string|比如 Star，为 [Xicons](https://www.xicons.org/#/zh-CN) 的 [carbon](https://carbondesignsystem.com/guidelines/icons/library) 下具体某个图标的的名字|-|
|color|图标和文本的颜色|string|-|inherit|
|iconPosition|图标的位置，同时设置了 icon 和 text 时才有意义|string|top/bottom/left/right|left|
|iconSize|图标的大小|string|-|18|
|text|文本的内容|string|-|-|
|textSize|文本的大小|string|-|14|
|link|跳转链接|string|-|javascript:void(0)|
|target|跳转方式|string|`_self`,`_blank`,`_parent`,`_top`|_self|

#### Slots

|name|说明|
|-|-|
|default|指定 props.text 位置的内容，用于表达更加复杂的内容|
|icon|通过外部图标来替换|

### 在配置中使用

主题中的一些允许配置图标的地方，比如 [首页](/docs/theme/home)，与上面 `Props.icon` 保持一致。
