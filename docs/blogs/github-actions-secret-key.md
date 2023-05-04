---
title: 如何在 GitHub Actions 时使用 secretKey
date: 2020-03-20
author: xyh 🐸
tags:
 - Github Actions
 - Secret Key
categories:
 - blog
---

## 如何在 GitHub Actions 时使用 secretKey

### 问题

当我参考[这篇](https://www.lasy.site/views/%E5%89%8D%E7%AB%AF/%E4%BD%BF%E7%94%A8%20GitHub%20Actions%20%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2%E5%8D%9A%E5%AE%A2.html)，使用 `Github Action` 自动部署的时候发现要使用 Secret Key 去使用 `VSSUE` 评论功能，我就犯愁了。

直接写在 `config` 里虽说并没有谁会盗用（吧 😃），但显然不太安全。这是原 workflow 文件中下面这段启发了我。其他的变量难道也可以这样传到服务器上？

```yaml
with:
  ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```

### 解决方法

果然 `Github` 早就帮我们想好了解决办法。

- [Creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)

简单说就是在对应 repo 的 `Secrets` 区域里输入。

![Screenshot 2020-03-23 13.08.05.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/470919/6d81c510-7f25-a039-5087-f07854d6d75e.png)

**注意⚠️**：上图中画圈的位置的 `A`, 正确的英语语法是 `AN`, 不过这篇教程统一用 `A`, 和下面的

```
${{ secrets.THIS_IS_A_EXAMPLE }}
```

也得一致!

~~英语好的朋友别嘲讽在下 😵~~

再在 `actions` 里用

```
${{ secrets.YOURKEY }}
```

去取，通过 `env` 存入服务器的环境变量。就可以用啦 👻。

做个实验。`main.yaml` 里加上这样一段。

```yaml{2,3,4}
- name: Pass Variables
  env:
    EXAMPLE: ${{ secrets.THIS_IS_A_EXAMPLE }}
    NOTEXIST: ${{ secrets.NOT_EXIST }}
  run: echo 'try to show secret 😉' && echo $EXAMPLE && echo $NOT_EXIST
```

输出下图这样的结果。github 把结果加密了，不过可以发现，有设置的 `THIS_IS_A_EXAMPLE` 和没有设置的 `NOT_EXIST`，`echo` 出来是不一样的。由此可见，已经设置成功了。

![Screenshot 2020-03-23 13.11.39.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/470919/e72b8478-89cb-6f45-f406-e6938f81e1c7.png)

### 实施

直接试试吧。

```yaml
- name: Build
  env:
    VSSUEID: ${{ secrets.VSSUEID }}
    VSSUESECRET: ${{ secrets.VSSUESECRET }}
  run: npm install && npm run build
```

在 `npm run build` 之前加上环境参数那一段。

```js
  vssueConfig: {
    platform: 'github',
    owner: 'xyyolab',
    repo: 'blog',
    clientId: process.env.VSSUEID,
    clientSecret: process.env.VSSUESECRET
  }
```

再在 `config` 内用 node 的语法去环境参数取就 OK 啦！

结果是评论功能可以使用了呀 😍。

![Screenshot 2020-03-23 13.36.35.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/470919/0a508150-59e8-948c-4601-b57012db2ed6.png)

- 完整的 `main.yaml` 请参考我的 [Github](https://github.com/xyyolab/blog/blob/master/.github/workflows/main.yml)

看起来一个小步骤但解决了大问题呢 💃。

---

:::tip
本文作者 [xyh 🐸](https://github.com/xyyolab)，博客 [xyh 🐸](https://blog.xyyolab.com)。
:::
