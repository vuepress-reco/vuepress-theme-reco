---
title: 自定义容器
date: 2022-01-29 16:19:01
---

## 提示相关

``` md
::: <type> [title]
[content]
:::
```

`type` 是必需的， `title` 和 `content` 是可选的。

支持的 `type` 有：

- `tip`
- `warning`
- `danger`
- `details`

**输入**

``` md
::: tip
这是一个提示
:::

::: info
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::
```

**输出**

::: tip
这是一个提示
:::

::: info
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::

## 代码相关

**输入**

````md
:::: code-group
::: code-group-item FOO
```js
const foo = 'foo'
```
:::
::: code-group-item BAR
```js
const bar = 'bar'
```
:::
::::
````

**输出**

:::: code-group
::: code-group-item FOO
```js
const foo = 'foo'
```
:::
::: code-group-item BAR
```js
const bar = 'bar'
```
:::
::::
