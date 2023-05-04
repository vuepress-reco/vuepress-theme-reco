---
title: 使用 GitHub Actions 自动部署博客
date: 2020-02-10
author: Lasy
tags:
 - Github Actions
 - VuePress
 - 博客
categories:
 - blog
---

# 使用 GitHub Actions 自动部署博客

本篇以  Github Pages 为例，并且假设你已经掌握了 GitHub Pages 的使用。

假设你的文章和静态文件在同一个仓库，使用 `master` 分支管理文章和代码，使用 `gh-pages` 分支存放生成的静态文件

一般部署博客的流程是：

1. 写一篇文章
2. 生成静态文件：`npm run build`
3. 切换 `gh-pages` 分支
4. 复制静态文件到 `gh-pages` 分支
5. 访问网址验证是否成功

博客就是用来写文章的，每次写篇文章还要搞那么多操作。

当你使用了 GitHub Actions 之后，流程可以简化为：

1. 写一篇文章
2. 提交到 GitHub

结束了，是不是很方便？

从机械的流程中解脱，专注于写作。

那么开始打造我们的 GitHub Actions 吧。

我创建了一个[示例项目](https://github.com/LasyIsLazy/gh-pages-Actions-demo)在我的 GitHub 仓库，用的是 VuePress（一个 Vue 官方的静态站点生成器）。

## 设置 Secrets

后面部署的 Action 需要有操作你的仓库的权限，因此提前设置好 GitHub personal access（个人访问令牌）。

生成教程可以看 GitHub 官方的帮助文档：[创建用于命令行的个人访问令牌](https://help.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)。

授予权限的时候只给 `repo` 权限即可。

![1W3GRA.png](https://s2.ax1x.com/2020/02/08/1W3GRA.png)

令牌名字一定要叫：`ACCESS_TOKEN`，这是后面的 Action 需要用的。

![1W35i4.png](https://s2.ax1x.com/2020/02/08/1W35i4.png)

## 编写 workflow 文件

> 持续集成一次运行的过程，就是一个 workflow（工作流程）。

项目结构如图：

![123CDO.png](https://s2.ax1x.com/2020/02/07/123CDO.png)

创建`.github/workflows/main.yml`文件（可以到我的[示例仓库](https://github.com/LasyIsLazy/gh-pages-action-demo/blob/master/.github/workflows/main.yml)中查看），内容如下：

```yml
name: Deploy GitHub Pages

# 触发条件：在 push 到 master 分支后
on:
  push:
    branches:
      - master

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 Ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 生成静态文件
      - name: Build
        run: npm install && npm run docs:build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist

```

这里我就不对语法作讲解了，需要了解 workflow 的基本语法可以查看[官方帮助](https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions)，也可以参考[阮一峰老师的 GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)。

这里我写了三步：

1. 拉取代码。用到了一个 GitHub 官方 action：`actions/checkout` 。
2. 生成静态文件。直接运行脚本，如果你不是用的 VuePress 或者脚本不一样，要修改成你自己的。
3. 部署到 GitHub Pages。使用了第三方作者的 action：`JamesIves/github-pages-deploy-action@releases/v3`。我详细介绍下这个 action：

使用 `with` 参数向环境中传入了三个环境变量：

1. `ACCESS_TOKEN`：读取 GitHub 仓库 secrets 的 `ACCESS_TOKEN` 变量，也就是我们前面设置的
2. `BRANCH`：部署分支 `gh-pages`（GitHub Pages 读取的分支）
3. `FOLDER`：需要部署的文件在 `docs/.vuepress/dist` 路径，也就是我们使用 `npm run docs:build` 生成的静态文件的位置

> 这里有一点需要注意：我使用的是 `v3` 版本，需要使用 `with` 参数传入环境变量，且需要自行构建；网上常见的教程使用的是 `v2` 版本，使用 `env` 参数传入环境变量，不需要自行构建，可使用 `BUILD_SCRIPT` 环境变量传入构建脚本

至此，配置工作均已完成。提交你的代码，就会开启自动构建。

以后，你每次有代码 push 到 `master` 分支时，GitHub 都会开始自动构建。

## 验证

### 部署失败

按照教程是不会失败的，但是建议你了解下失败的情况。

如果部署失败你会收到一封部署失败的邮件

![1WR8YQ.png](https://s2.ax1x.com/2020/02/08/1WR8YQ.png)

点击可以跳转到仓库的 Action 页面查看日志

![1WRclR.png](https://s2.ax1x.com/2020/02/08/1WRclR.png)

展开错误的部署 job 查看日志

![1WRX0f.png](https://s2.ax1x.com/2020/02/08/1WRX0f.png)

可以看到有这么一个错误日志：`No such file or directory`，经排查，是没有生成静态文件，因此导致路径不存在。

> 我这个错误是由于参考了网上常见的教程导致的。网上大部分教程（包括前面提到的阮一峰老师的教程）使用的是：`JamesIves/github-pages-deploy-action` 的 `v2` 版本，然而引用的时候写的都是：`JamesIves/github-pages-deploy-action@master`，引用的 `master` 分支。在作者写的时候可能当时这个 action 最新的就是 `v2` 版本，所以没有什么问题。然而现在 `master` 分支已经是 `v3` 版本了，语法有变化，完全按照教程就会出错。如果继续使用他的教程可以改成`JamesIves/github-pages-deploy-action@releases/v2`。

修复后重新提交，GitHub 会再次部署。

### 部署成功

点击仓库的 Actions，查看部署情况。

如果正在部署中，应该是图中标出的这个样子。

![1WWL8J.png](https://s2.ax1x.com/2020/02/08/1WWL8J.png)

这里显示所有的部署（应该叫做 *Workflow*，便于理解，就叫 *部署* 了）记录。图中有三种状态，分别是：部署中（黄色动态图标）、部署完成（绿色对号图标）、部署失败（红色错号图标）。

点击进入查看部署情况。

![147bLD.png](https://s2.ax1x.com/2020/02/10/147bLD.png)

部署成功，全是绿色~

接下来访问网站验证一下：[https://lasyislazy.github.io/gh-pages-action-demo/](https://lasyislazy.github.io/gh-pages-action-demo/)

![1W4BuR.png](https://s2.ax1x.com/2020/02/08/1W4BuR.png)

完美结束，享受 GitHub Actions 带来的愉快体验吧~

## 其他

鉴于还是有很多人不是用的 GitHub Pages，我这里再提供一下其他方式的思路，其实都是一样的，大概分成三步：

1. 拉取代码
2. 生成静态文件
3. 部署到服务器

前两步都是一样的，不同的方式区别也就在于第三步。

使用 GitHub Pages 的话可以使用 `JamesIves/github-pages-deploy-action` 这个 action，使用其他的方式其实也可以找到对应的 action。

例如，我的网站是部署在虚拟主机空间上的，平时部署是用 FTP 的方式替换主机空间上的静态文件，因此找到了一个可以部署到 FTP 上的 acton `SamKirkland/FTP-Deploy-Action`，然后第三步就变为了：

```yaml
      - name: FTP Deploy
        uses: SamKirkland/FTP-Deploy-Action@2.0.0
        env:
          FTP_SERVER: xxx.xxx.com
          FTP_USERNAME: xxxx
          FTP_PASSWORD: ${{ secrets.BLOG_FTP_PASSWORD }}
          LOCAL_DIR: docs/.vuepress/dist
          REMOTE_DIR: /htdocs
          ARGS: --delete --transfer-all --exclude=logreport --verbose
```

一般都是传一些环境变量进去就可以了，需要哪些环境变量去这个 action 的 GitHub 上看下介绍就好了。

最后再说一下怎么找 action，以下是几个常用的网址：

- [https://github.com/actions](https://github.com/actions)：GitHub 官方的 action
- [https://github.com/marketplace?type=actions](https://github.com/marketplace?type=actions)：GitHub 官方市场中的 action
- [https://github.com/sdras/awesome-actions](https://github.com/sdras/awesome-actions)：第三方收集的有用的 action

然后就是要利用好搜索引擎了。

实在找不到就得自己写 action 了，本篇就不讨论了。



以上便是本篇教程全部内容，本篇首发于我的个人博客：[https://www.lasy.site/](https://www.lasy.site/)


:::tip
本文作者 [Lasy](https://github.com/LasyIsLazy)，博客 [Lasy](https://www.lasy.site)。
:::

参考链接：

- [https://help.github.com/en/github/working-with-github-pages/about-github-pages](https://help.github.com/en/github/working-with-github-pages/about-github-pages)
- [https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions](https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions)
- [http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
