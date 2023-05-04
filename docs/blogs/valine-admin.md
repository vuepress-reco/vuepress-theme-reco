---
title: Valine Admin 后台搭建(修订)
date: 2020-07-06
author: Caleb
categories:
 - blog
---

::: tip
Valine Admin 是 Valine 评论系统的扩展和增强，主要实现评论邮件通知、评论管理、垃圾评论过滤等功能。支持完全自定义的邮件通知模板，基于Akismet API实现准确的垃圾评论过滤。

开发者  [@Deserts](https://deserts.io/)
:::


## 云引擎"一键"部署
### 1. 填写代码库
在[Leancloud](https://leancloud.cn/dashboard/#/apps)云引擎-->部署界面，填写代码库并保存：[https://github.com/DesertsP/Valine-Admin.git](https://github.com/DesertsP/Valine-Admin.git)


> 也可以使用我根据[@Deserts](https://deserts.io/)的项目改写的地址： [https://github.com/ComicAuthor/Valine-Admin](https://github.com/ComicAuthor/Valine-Admin)，改编版本内容介绍请[点击](#改编版本内容介绍)。

<br />
<img src="https://i.loli.net/2020/07/19/BCxjLA68ZOEtID7.png" alt="填写代码库" width="600" style="display: block;margin: auto" />
<br />
<img src="https://i.loli.net/2020/07/19/53bpWmS2MAJIXf9.png" alt="填写代码库" width="600" style="display: block;margin: auto" />

### 2.在设置页面，设置环境变量以及 Web 二级域名。
<img src="https://i.loli.net/2020/07/19/qZBdJPEmLzx5Oo6.png" alt="设置环境变量" width="600" style="display: block;margin: auto" />

具体格式如下：
|       变量       |        示例          |               说明|
|:----------------:|:------------------:|:---------------------:|
|    SITE_NAME     |                  平凡的你我                  |                                                         [必填]博客名称                                                         |
|     SITE_URL     | [https://reinness.com](https://reinness.com) |                                                         [必填]首页地址                                                         |
| **SMTP_SERVICE** |                    "163"                     | [新版支持]邮件服务提供商，支持 QQ、163、126、Gmail 以及 [**更多**](https://nodemailer.com/smtp/well-known/#supported-services) |
|    SMTP_USER     |                xxxxx@163.com                 |                                                       [必填]SMTP登录用户                                                       |
|    SMTP_PASS     |                   XXXXXXXX                   |                                          [必填]SMTP登录密码（QQ邮箱需要获取独立密码）                                          |
|   SENDER_NAME    |                    caleb                     |                                                          [必填]发件人                                                          |
|   SENDER_EMAIL   |                xxxxx@163.com                 |                                                         [必填]发件邮箱                                                         |
|  BLOGGER_EMAIL   |                xxxxx@163.com                 |               [可选]如果自己在回复，设置这个可以不向自己的邮箱发送邮件 && 博主通知收件地址，默认使用SENDER_EMAIL               |
|    ADMIN_URL     |           https://xxx.leanapp.cn/            |                                              [建议]Web主机二级域名，用于自动唤醒                                               |
|   AKISMET_KEY    |                 xxxxxxxxxxxx                 |                      [可选]Akismet Key 用于垃圾评论检测，设为MANUAL_REVIEW开启人工审核，留空不使用反垃圾                       |

**以上必填参数请务必正确设置。**

### 3.切换到部署标签页，分支使用master，点击部署即可
<img src="https://i.loli.net/2020/07/19/Gl28hq1UsHZ6F9L.png" alt="部署" width="600" style="display: block;margin: auto" />

第一次部署可能会需要些时间。

<img src="https://i.loli.net/2020/07/19/icCQWGbaAlNdjPB.png" alt="部署日志" width="600" style="display: block;margin: auto" />

### 4.评论管理
#### ~~访问设置的二级域名`https://二级域名.leanapp.cn/sign-up` ，注册管理员登录信息，如：[https://nk6vtvs0tdwc.leanapp.cn/sign-up](https://nk6vtvs0tdwc.leanapp.cn/sign-up)~~


:::tip
按照LeanCould下发的通知，华北和华东地区不再提供共享的域名。所以华北、华东的用户需要自行绑定域名(需要已经备案过的域名)。如果没有自己的域名呢，也可以直接使用国际版，但是只会提供三个月的有效时间。过后还是得自行绑定域名。

详情参考 [LeanCloud Blog | 域名绑定 Q&A](https://leancloudblog.com/domain-question-answers/)
:::


国际版域名配置,输入你想自定义的名称即可。

<img src="https://i.loli.net/2020/07/19/whs3c5oJ6qpEdxb.png" alt="域名配置" width="600" style="display: block;margin: auto" />


::: warning
注：使用原版Valine如果遇到注册页面不显示直接跳转至登录页的情况，请手动删除_User表中的全部数据。

如果发现页面并没有跳转，请在域名后加上 `/sign-up`
:::

<img src="https://i.loli.net/2020/07/19/Cn1hvLGEcQmgsXl.png" alt="注册页" width="600" style="display: block;margin: auto" />

### 5.定时任务设置

**目前实现了两种云函数定时任务:**
::: tip
(1)自动唤醒，定时访问Web APP二级域名防止云引擎休眠；

(2)每天定时检查24小时内漏发的邮件通知。
:::


**进入云引擎-定时任务中，创建定时器，创建两个定时任务。**

(1)选择self-wake云函数，Cron表达式为`0 0/30 7-23 * * ?`，表示每天早6点到晚23点每隔30分钟访问云引擎，ADMIN_URL环境变量务必设置正确：

<img src="https://i.loli.net/2020/07/19/jXduZSOi3QnRMo6.png" alt="self-wake云函数" width="600" style="display: block;margin: auto" />

(2)选择resend-mails云函数，Cron表达式为`0 0 8 * * ?`，表示每天早8点检查过去24小时内漏发的通知邮件并补发：

<img src="https://i.loli.net/2020/07/19/oIrpXniWRy9T5Zc.png" alt="resend-mails云函数" width="600" style="display: block;margin: auto" />

**添加定时器后记得点击启动方可生效。**

**至此，Valine Admin 已经可以正常工作。**

## 邮件通知模板
### 1.环境变量设定
邮件通知模板在云引擎环境变量中设定，可自定义通知邮件标题及内容模板。

| 环境变量            |                        示例                        |                            说明 |
|---------------------|:--------------------------------------------------:|--------------------------------:|
| MAIL_SUBJECT        | ${PARENT_NICK}，您在${SITE_NAME}上的评论收到了回复 | [可选]@通知邮件主题（标题）模板 |
| MAIL_TEMPLATE       |                       见下文                       |         [可选]@通知邮件内容模板 |
| MAIL_SUBJECT_ADMIN  |              ${SITE_NAME}上有新评论了              |      [可选]博主邮件通知主题模板 |
| MAIL_TEMPLATE_ADMIN |                       见下文                       |      [可选]博主邮件通知内容模板 |


### 2.自定义模板
邮件通知包含两种，分别是 **被@通知** 和 **博主通知**，这两种模板都可以完全自定义。默认使用经典的蓝色风格模板。


@通知模板中的可用变量如下（注，这是邮件模板变量，是指嵌入到HTML邮件模板中的变量，请勿与云引擎环境变量混淆）

| 模板变量       |              说明               |
|----------------|:-------------------------------:|
| SITE_NAME      |            博客名称             |
| SITE_URL       |          博客首页地址           |
| POST_URL       |      文章地址（完整路径）       |
| PARENT_NICK    | 收件人昵称（被@者，父级评论人） |
| PARENT_COMMENT |          父级评论内容           |
| NICK           |          新评论者昵称           |
| COMMENT        |           新评论内容            |

**（1）默认被@通知邮件内容模板如下：**


``` html
<div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"><h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">您在<a style="text-decoration:none;color: #12ADDB;" href="${SITE_URL}" target="_blank">            ${SITE_NAME}</a>上的评论有了新的回复</h2> ${PARENT_NICK} 同学，您曾发表评论：<div style="padding:0 12px 0 12px;margin-top:18px"><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">            ${PARENT_COMMENT}</div><p><strong>${NICK}</strong>回复说：</p><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;"> ${COMMENT}</div><p>您可以点击<a style="text-decoration:none; color:#12addb" href="${POST_URL}" target="_blank">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb" href="${SITE_URL}" target="_blank">${SITE_NAME}</a>。<br></p></div></div>
```
效果如图：
<img src="https://i.loli.net/2020/07/19/2g9lkajHZhczWL3.png" alt="默认主题" width="600" style="display: block;margin: auto" />

**（2）彩虹风格的@通知邮件模板代码：**

``` html
<div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"><h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">您在<a style="text-decoration:none;color: #12ADDB;" href="${SITE_URL}" target="_blank">            ${SITE_NAME}</a>上的评论有了新的回复</h2> ${PARENT_NICK} 同学，您曾发表评论：<div style="padding:0 12px 0 12px;margin-top:18px"><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">            ${PARENT_COMMENT}</div><p><strong>${NICK}</strong>回复说：</p><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;"> ${COMMENT}</div><p>您可以点击<a style="text-decoration:none; color:#12addb" href="${POST_URL}" target="_blank">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb" href="${SITE_URL}" target="_blank">${SITE_NAME}</a>。<br></p></div></div>
```
效果如图：
<img src="https://i.loli.net/2020/07/19/pq9h1KPgynVSbIX.png" alt="彩虹风格" width="600" style="display: block;margin: auto" />


博主通知邮件模板中的可用变量与@通知中的基本一致，***PARENT_NICK*** 和 ***PARENT_COMMENT*** 变量不再可用。


**（3）默认博主通知邮件内容模板如下：**
``` html
<div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"><h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">您在<a style="text-decoration:none;color: #12ADDB;" href="${SITE_URL}" target="_blank">${SITE_NAME}</a>上的文章有了新的评论</h2><p><strong>${NICK}</strong>回复说：</p><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;"> ${COMMENT}</div><p>您可以点击<a style="text-decoration:none; color:#12addb" href="${POST_URL}" target="_blank">查看回复的完整內容</a><br></p></div></div>
```
因为没使用过这个，所以就没挂图~~~

**（4）彩虹风格的博主通知邮件内容模板如下：**
``` html
<div style="border-radius: 10px 10px 10px 10px;font-size:13px;    color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);"><div style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;"><p style="font-size:15px;word-break:break-all;padding: 23px 32px;margin:0;background-color: hsla(0,0%,100%,.4);border-radius: 10px 10px 0 0;">您在<a style="text-decoration:none;color: #ffffff;"href="${SITE_URL}">${SITE_NAME}</a>上有新评论啦！</p></div><div style="margin:40px auto;width:90%"><p>${NICK}给您的回复如下：</p><div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">${COMMENT}</div><p>您可以点击<a style="text-decoration:none; color:#12addb"href="${POST_URL}#comments">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb"href="${SITE_URL}">${SITE_NAME}</a>。</p><style type="text/css">a:link{text-decoration:none}a:visited{text-decoration:none}a:hover{text-decoration:none}a:active{text-decoration:none}</style></div></div>
```
效果如图：
<img src="https://i.loli.net/2020/07/19/sNiR4QHFDjmqXGB.png" alt="彩虹风格" width="600" style="display: block;margin: auto" />


## 改编版本教程

## Qmsg酱

### 申请APPKey 

首先前往[**Qmsg酱官网**](https://qmsg.zendee.cn/),按照官方文档完成相应的注册。并添加「Qmsg酱」小姐姐为QQ好友。然后点击文档按钮。  

<img src="https://i.loli.net/2020/07/19/WPHmEcjfdzM7y9r.png" alt="个人中心" width="600" style="display: block;margin: auto" />

看到接口地址后将 `send/` 之后的内容复制下来，填写进 `QMSG_KEY` 变量中。

<img src="https://i.loli.net/2020/07/19/gc8Aad5ZmNP3fIk.png" alt="接口地址" width="600" style="display: block;margin: auto" />

### Qmsg模板

初始化模板样式如下：

<img src="https://i.loli.net/2020/07/19/tWilU9OCqAdbx6H.png" alt="QMSG_TEMPLATE" width="600" style="display: block;margin: auto" />

如果你并不不喜欢当前的样式，这里为您抛出了一些接口供您自定义模板：  

|   变量    |         说明         |
|:---------:|:--------------------:|
| SITE_NAME |    [可选]站点名称    |
|   NICK    |   [可选]评论者名称   |
|  comment  |    [必填]评论信息    |
| POST_URL  | [可选]对应的评论地址 |

**使用字符串拼接方法，将变量放入其中**

参考如下：
``` js
`您在 ${SITE_NAME} 上有新评论啦！
${NICK} 给您的回复如下：[CQ:emoji,id=11015]
           
    [CQ:face,id=12] ${comment}
        
您可以点击 ${POST_URL} 前去查看！`
```

同时您还可以使用QQ表情用来点缀您的信息模板。使用方法为 `[CQ:face,id=XX]` ,其中XX为下图的表情序号。

<img src="https://i.loli.net/2020/07/19/Sro5UpwiPBGHKsY.png" alt="表情" width="600" style="display: block;margin: auto" />

如果你觉得QQ表情不是特别好看的话，您可以使用QQ里面的emoji表情。使用方法为 `[CQ:emoji,id=XX]` ,其中XX为emoji表情序号。

[**emoji表情id查询地址**](https://cqp.cc/t/15827/)


### QQ戳一戳

如果想开启戳一戳提示的话，就设置true。

## Server酱

### 申请SC_KEY

首先前往[**Server酱官网**](https://sc.ftqq.com/3.version), 通过Github登录。点击 `微信推送` 完成微信绑定。

<img src="https://i.loli.net/2020/07/19/DpXSO96R8gFHCmk.png" alt="微信绑定" width="600" style="display: block;margin: auto" />

测试微信推送正常以后，点击 `发送消息` 进入页面。可以看到 `SCKEY` 复制粘贴到变量 `SC_KEY` 中。

<img src="https://i.loli.net/2020/07/19/mhfROXjAITVL58y.png" alt="查看SCKEY" width="600" style="display: block;margin: auto" />

### 消息 标题/内容 模板
 
初始化模板样式如下：

<img src="https://i.loli.net/2020/07/19/sCcjfIzUpvDdknh.png" alt="标题模板" width="600" style="display: block;margin: auto" />


### 自定义 标题/内容 模板 

抛出的接口： 

|   变量    |         说明         |
|:---------:|:--------------------:|
| SITE_NAME |    [可选]站点名称    |
|   NICK    |   [可选]评论者名称   |
|  COMMENT  |    [必填]评论信息    |
| POST_URL  | [可选]对应的评论地址 |

**使用字符串拼接方法，将变量放入其中**

消息标题模板参考：
```js
`您在 ${SITE_NAME} 上有新评论啦！`
```


消息内容模板参考：
```js
`#### ${NICK} 给您的回复如下：
        
> ${COMMENT}
        
#### 您可以点击[查看回复的完整內容](${POST_URL})`
```

变量 `SC_DESP_TEMPLATE` 支持MarkDown。但是最大只有64K，请提前注意。

> 注意这里的 COMMENT 与 QQ消息模板中的 comment 并不相同，请注意分别。

## 改编版本内容介绍

**Version 1.0.2**
1. 增加了QQ提醒功能(Qmsg酱)
2. 增加了微信提醒功能(Server酱)

**Version 1.0.1**
1. 增加了用户头像的判断 QQ头像以及gravatar头像
2. 增加了分页插件
3. 增加了博主/全部列表的展示
4. 增加了返回顶部按钮
5. 不断升级中~~~

**以上所有内容供大家参考，有问题请及时指正，如有侵权，请及时联系删除**

:::tip
本文作者 [Caleb](https://github.com/ComicAuthor)，博客 [平凡的你我](https://reinness.com/)。
:::
### **完结撒花:tada::tada::tada:**
