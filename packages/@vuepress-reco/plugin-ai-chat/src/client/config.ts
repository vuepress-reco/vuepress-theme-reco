// AI聊天功能的客户端配置
import { type ClientConfig, defineClientConfig } from 'vuepress/client'
import { applyClientEnhance } from './clientEnhance.js'


// 导入生成的文档内容索引
// 注意：这个文件是在构建时生成的
// @ts-ignore
import siteContextData from '@temp/ai-assistant-context'

export default defineClientConfig({
  enhance({ app }) {
    applyClientEnhance({ app })
    // 将文档内容索引注入到全局
    app.provide('aiChatSiteContext', siteContextData)
    // 也可以挂载到window对象，方便调试
    // if (typeof window !== 'undefined') {
    //   window.__AI_CHAT_SITE_CONTEXT = siteContextData

    //   // 注入全局配置
    //   window.__AI_CHAT_OPTIONS = __AI_CHAT_OPTIONS__
    // }
  }
}) as ClientConfig
