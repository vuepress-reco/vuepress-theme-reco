---
title: Pages 部署
date: 2019-05-14
categories:
 - blog
---

> 这里我们只介绍 GitLab 和 GitHub 的 pages 功能的部署。

## GitHub

打开项目设置的 `GitHub Pages` 模块，将 `Source` 设置为 `gh-pages`，这样我们就可以将博客项目放在 `master` 分支，而部署到 `gh-pages` 分支。

### 手动部署

在根目录建一个 `deploy.sh` 文件：

```bash
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: warning
如果你用的 MAC，在项目根目录借助 `终端` 执行 `bash deploy.sh` 即可；如果你使用的是 WINDOWS，在项目根目录借助 `Git Bash` 执行 `bash deploy.sh` 即可。
:::

### 自动部署

`GitHub` 的自动部署需要借助 `travis-ci` 。

1. 打开 [travis-ci](https://travis-ci.com/)，使用 `GitHub` 登录；
2. 进入设置页面，点击 `Manage repositories on GitHub` 按钮，将需要自动部署的项目导入进来；
3. 项目列表中，项目后面有一个 `settings` 按钮，点击进去将进行配置：
   1. 获取 `token`：进入github的设置页面，点击 `Developer settings` 按钮，点击 `Personal access tokens` 按钮，在当前页面生成 `token`，名字随便写，只是起到区分作用；
   2. 配置 `token`：将上面生成的 `token` 添加在项目的设置页面的 `Environment Variables`，切记，名字不可随便写，在这里你写成 `GITHUB_TOKEN`；
   3. 配置 `Cron Jobs`：（如果你的项目就在 `master` 分支，可以不用配置这里）`Branch` 选择 你存放项目源码的分支，`Interval` 选择 `monthly`，`Options` 选择 `Always run`，添加成功后便会生效。
4. 在根目录下创建 `.travis.yml`（[配置规范](https://docs.travis-ci.com/user/deployment/pages/)）：
    ```yml
    language: node_js
    node_js:
      - lts/*
    script:
      - npm run build
    deploy:
      provider: pages
      skip-cleanup: true
      local_dir: docs/.vuepress/dist # 项目打包后生成的文件的目录
      github-token: $GITHUB_TOKEN # 这里这个变量就是刚才配置 token 时填写的那个变量
      keep-history: true
      on:
        branch: master # 项目源码所在的分支
    ```
5. 现在去提交一下代码试试吧，在你提交成功后 `travis-ci` 的控制台就能看到你的项目在部署了。

## GitLab

### 手动部署

1. 设置输出目录为 `public`：

   由于 `GitLab` 的 `pages` 功能的指定文件夹是 `public`，所以我们要将项目的输出目录改为 `public`，也就是将 `config.js` 的 `dest` 设置为 `public`；

2. 本地编译，然后将项目提交到 `GitLab` 即可。

### 自动部署

1. 设置输出目录为 `public`；
2. 由于 `GitLab` 自带 CI，所以就省去了很多的配置步骤，只需要在项目根目录创建 `.gitlab-ci.yml`（[配置规范](https://docs.gitlab.com/ee/ci/yaml/README.html)）：
    ```yml
    image: node:9.11.1

    pages:
      cache:
        paths:
        - node_modules/ # 缓存 node_modules，加速编译

      script:
      - npm install
      - npm run docs:build
      artifacts:
        paths:
        - public
      only:
      - master
    ``` 
3. 将项目提交到 `GitLab` 即可。