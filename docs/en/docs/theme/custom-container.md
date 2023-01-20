---
title: Custom Container
date: 2022-01-29 16:19:01
---

## Tips related

``` md
::: <type> [title]
[content]
:::
```

`type` is required, `title` and `content` are optional.

The supported `type` are:

- `tip`
- `warning`
- `danger`
- `details`

**input**

``` md
::: tip
this is a tip
:::

::: info
this is a info
:::

::: warning
this is a warning
:::

::: danger
This is a danger warning
:::

::: details
this is a details tag
:::
```

**output**

::: tip
this is a tip
:::

::: info
this is a info
:::

::: warning
this is a warning
:::

::: danger
this is a danger warning
:::

::: details
this is a details tag
:::

## Code related

**input**

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

**output**

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
