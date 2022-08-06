---
title: Contribute
date: 2022-08-06 22:37:36
---

Welcome to contribute code to the reco theme!

## Initialization

First, you need to fork a [reco theme repository](https://github.com/vuepress-reco/vuepress-theme-reco), clone it locally, and make sure that `pnpm` is installed locally.

After the above preparations are completed, go to the project folder and execute the following commands:

```bash
# Install
pnpm install

# Compile
pnpm build

# Start
pnpm dev
````

At this time, the project has been started, and you can test your function in `example`. Make sure that your code has been tested in detail and passed the `pnpm example:build` command. After the function test, you must synchronize the documentation.

## Git commit specification

To submit a commit, please use the `pnpm commit` command to submit code in strict accordance with the specifications, and the commit information must be in English.

## Git PR specification

The PR title is simple and clear, the PR details should describe the content you submitted in detail, and stickers if necessary, and the PR information must be in English.