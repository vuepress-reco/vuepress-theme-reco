// AI聊天功能的客户端配置
import { defineComponent, h } from 'vue'
import { type ClientConfig, defineClientConfig } from 'vuepress/client'

// 导入AIChat浮动按钮组件
import AIChatButton from './components/AIChatButton.vue'

// 导入生成的文档内容索引
// 注意：这个文件是在构建时生成的
// @ts-ignore
import siteContextData from '@temp/ai-assistant-context'

export default defineClientConfig({
  enhance({ app }) {
    // 将文档内容索引注入到全局
    app.provide('aiChatSiteContext', siteContextData)
  },
  
  // 注册全局根组件 - 悬浮按钮
  rootComponents: [
    defineComponent(() => {
      // 服务端渲染时返回空
      // @ts-ignore
      if (__VUEPRESS_SSR__) return () => null
      return () => h(AIChatButton)
    }),
  ],
}) as ClientConfig
