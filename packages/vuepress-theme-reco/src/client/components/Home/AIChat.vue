<template>
  <section class="ai-chat">
    <div class="chat-container">
      <div class="chat-header">
        <h2>Vuepress Reco AI Chat</h2>
      </div>
      <div class="chat-messages" ref="chatMessagesRef">
        <div v-for="(message, index) in messages" :key="index"
             :class="['message', message.role === 'user' ? 'user-message' : 'assistant-message']">
          <div class="message-content">
            <div v-if="message.role === 'assistant'" class="message-avatar assistant-avatar">
              <Xicons
                :icon="IconRobot"
                icon-size="20"
              />
            </div>
            <div class="message-text" v-html="renderMarkdown(message.displayContent || message.content)"></div>
            <div v-if="message.role === 'user'" class="message-avatar user-avatar">
              <Xicons
                :icon="IconUser"
                icon-size="20"
              />
            </div>
          </div>
        </div>
        <div v-if="loading" class="message assistant-message">
          <div class="message-content">
            <div class="message-avatar assistant-avatar">
              <Xicons
                :icon="IconRobot"
                icon-size="20"
              />
            </div>
            <div class="message-text typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-input-container">
        <div class="chat-control-buttons">
          <button class="control-button" @click="clearChatHistory" :disabled="loading || typing">
            <span>Clear History</span>
          </button>
        </div>
        <div class="chat-input">
          <input
            type="text"
            v-model="userInput"
            @keyup.enter="sendMessage"
            placeholder="Ask any questions..."
            :disabled="loading || typing"
          />
          <button @click="sendMessage" :disabled="loading || typing || !userInput.trim()">
            <span v-if="!loading && !typing">Send</span>
            <span v-else-if="typing">Replying...</span>
            <span v-else>Processing...</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { usePageData, usePageFrontmatter, useSiteData } from 'vuepress/client'

import { IconRobot, IconUser } from '@components/icons/index.js'

// 这里将来从预编译的上下文文件导入网站内容摘要
// 编译时生成的数据将在这里被导入
// import siteContextData from '@temp/ai-assistant-context.js'

interface Message {
  role: 'user' | 'assistant'
  content: string
  // 用于打字机效果的显示内容
  displayContent?: string
}

// 定义响应式状态
const userInput = ref('')
const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '你好！我是文档智能助手，有关于本文档的任何问题都可以问我。',
    displayContent: '你好！我是文档智能助手，有关于本文档的任何问题都可以问我。'
  }
])
const loading = ref(false)
const typing = ref(false)
const chatMessagesRef = ref<HTMLElement | null>(null)

// 会话ID（用于区分不同页面的会话）
const sessionId = ref('')

// 获取文档相关信息
const pageData = usePageData()
const siteData = useSiteData()
const frontmatter = usePageFrontmatter()

// 生成会话ID
onMounted(() => {
  const path = window.location.pathname
  sessionId.value = `vuepress-reco-chat-${path}`
  loadChatHistory()
})

// 保存聊天历史到localStorage
const saveChatHistory = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(sessionId.value, JSON.stringify(messages.value))
  }
}

// 从localStorage加载聊天历史
const loadChatHistory = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedMessages = window.localStorage.getItem(sessionId.value)
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages) as Message[]
        messages.value = parsedMessages
      } catch (e) {
        console.error('加载聊天历史失败:', e)
      }
    }
  }
}

// 清除聊天历史
const clearChatHistory = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(sessionId.value)
    messages.value = [
      {
        role: 'assistant',
        content: 'Hello! I am the document assistant for this site. Feel free to ask me any questions about the content.',
        displayContent: 'Hello! I am the document assistant for this site. Feel free to ask me any questions about the content.'
      }
    ]
  }
}

// 当消息变化时保存历史记录
watch(messages, () => {
  saveChatHistory()
}, { deep: true })

// 发送消息
const sendMessage = async () => {
  const input = userInput.value.trim()
  if (!input || loading.value) return

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: input
  })

  // 清空输入框并设置加载状态
  userInput.value = ''
  loading.value = true

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  try {
    // 调用DeepSeek API获取回复
    const response = await callDeepSeekAPI(input)

    // 添加AI回复并启用打字机效果
    const newMessage = {
      role: 'assistant',
      content: response,
      displayContent: ''
    }
    messages.value.push(newMessage)

    // 执行打字机效果
    typing.value = true
    await typeWriterEffect(newMessage)
  } catch (error) {
    // 处理错误，为用户提供更详细的错误信息
    let errorMessage = '抱歉，我遇到了一些问题，请稍后再试。'

    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = '网络连接错误。请检查您的网络连接并重试。'
      } else if (error.message.includes('API') || error.message.includes('key')) {
        errorMessage = 'API密钥错误或权限不足。请检查您的API设置。'
      }
    }

    const errorResponse = {
      role: 'assistant',
      content: errorMessage,
      displayContent: errorMessage
    }

    messages.value.push(errorResponse)
    console.error('AI响应错误:', error)
  } finally {
    loading.value = false

    // 滚动到底部
    await nextTick()
    scrollToBottom()
  }
}

// 调用DeepSeek API获取回复
const callDeepSeekAPI = async (input: string): Promise<string> => {
  try {
    // 使用getApiKey函数获取API密钥
    const apiKey = getApiKey()

    if (!apiKey) {
      console.warn('未配置DeepSeek API密钥，使用备用响应')
      return fallbackResponse(input)
    }

    // 获取网站信息作为上下文
    const siteName = siteData.value.title
    const siteDescription = siteData.value.description
    const currentPage = pageData.value.title
    const currentPagePath = pageData.value.path

    // 这里将来从预编译的内容中获取网站全局上下文
    // 目前这个功能尚未实现，需要在构建时生成
    // const siteContext = siteContextData?.content || '站点内容摘要尚未生成'

    // 构建请求体
    const requestBody = {
      model: 'deepseek-chat', // 使用DeepSeek提供的模型
      messages: [
        {
          role: 'system',
          content: `你是${siteName}文档网站的AI助手。你的职责是帮助用户了解整个网站的内容和功能。

当前站点信息:
- 站点名称: ${siteName}
- 站点描述: ${siteDescription}
- 用户当前浏览页面: ${currentPage} (${currentPagePath})

重要说明:
1. 你的回答应该基于整个网站的内容，不仅限于当前页面
2. 本网站是关于vuepress-theme-reco 2.0版本的文档站点
3. 你应该提供关于主题配置、组件使用、插件整合等各方面的帮助
4. 如果不确定某些细节，可以引导用户查看特定的文档页面

/* 在这里将来会添加从编译时生成的站点内容摘要 */

请根据用户的问题提供简洁、准确的回答。你的回答应该友好、专业，帮助用户理解和使用本站点提供的全部内容和功能。`
        },
        ...messages.value.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: input
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    }

    // 发送请求到DeepSeek API
    // 注意：实际环境中应该通过服务器代理此请求，以保护API密钥
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    })

    // 解析响应
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`API错误: ${data.error?.message || '未知错误'}`)
    }

    // 从API响应中提取AI回复
    return data.choices[0].message.content
  } catch (error) {
    console.error('DeepSeek API调用失败:', error)

    // 在控制台显示详细错误，方便调试
    if (error instanceof Error) {
      console.error('API错误详情:', error.message, error.stack)
    }

    // 根据错误类型返回更友好的错误信息
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return '网络连接错误。请检查您的网络连接并重试。'
    }

    // 使用备用的模拟响应
    return fallbackResponse(input)
  }
}

// 备用的模拟响应（当API调用失败时使用）
const fallbackResponse = async (input: string): Promise<string> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 这里可以根据网站内容构建更智能的回答
  const siteName = siteData.value.title
  const currentPage = pageData.value.title

  // 简单的关键词匹配示例（实际项目应使用更复杂的搜索或AI服务）
  if (input.toLowerCase().includes('主题') || input.toLowerCase().includes('theme')) {
    return `vuepress-theme-reco是一款简洁的vuepress博客和文档主题。它提供了博客、分类、标签、时间轴等功能，非常适合构建个人博客或项目文档。`
  } else if (input.toLowerCase().includes('插件') || input.toLowerCase().includes('plugin')) {
    return `vuepress-theme-reco支持多种插件，包括评论插件、页面插件、vue-previews插件和bulletin-popover插件等。您可以在文档中查看更详细的插件使用说明。`
  } else if (input.toLowerCase().includes('模块') || input.toLowerCase().includes('module')) {
    return `vuepress-theme-reco的首页由多个可配置模块组成，包括Banner、BannerBrand、Blog、MdContent、Comment、Footer和Features等。您可以通过frontmatter.modules来自定义显示哪些模块以及它们的顺序。`
  } else if (input.toLowerCase().includes('如何') || input.toLowerCase().includes('how')) {
    return `要开始使用vuepress-theme-reco主题，您可以通过以下命令初始化项目：\`\`\`bash\nnpm install @vuepress-reco/theme-cli@1.0.7 -g\ntheme-cli init\n\`\`\`然后按照提示选择2.x版本进行安装。`
  }

  // 默认回答
  return `关于"${input}"的问题，我建议您查看${siteName}的官方文档获取更详细的信息。如果您有更具体的问题，请随时询问我！`
}

// 简单地处理文本，将代码块用pre和code标签包裹，将换行符转换为<br>标签
const renderMarkdown = (text: string): string => {
  if (!text) return ''

  // 处理代码块，增强代码高亮
  let processedText = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
    const lang = language ? ` class="language-${language}"` : ''
    return `<pre><code${lang}>${code.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;')}</code></pre>`
  })

  // 处理行内代码
  processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>')

  // 处理普通文本中的换行符
  return processedText.replace(/\n/g, '<br>')
}

// 获取API密钥的函数 - 从多个来源尝试获取密钥
const getApiKey = (): string => {
  // 1. 首先尝试从页面frontmatter的aiChat配置获取
  const aiChatConfig = frontmatter.value.aiChat || {}

  // 2. 尝试从环境变量获取（如果在构建时设置）
  // 注意：浏览器端无法直接访问服务器端环境变量，除非在构建时注入
  const envApiKey = (window as any).__DEEPSEEK_API_KEY

  // 3. 从localStorage获取（用户可能在设置中手动添加）
  let storedApiKey = ''
  if (typeof window !== 'undefined' && window.localStorage) {
    storedApiKey = window.localStorage.getItem('deepseek-api-key') || ''
  }

  // 返回找到的第一个API密钥，优先级: 页面aiChat配置 > 环境变量 > localStorage > 默认密钥
  return (aiChatConfig.apiKey as string) ||
         envApiKey ||
         storedApiKey ||
         '' // 默认密钥，应替换为实际值
}

// 打字机效果实现
const typeWriterEffect = async (message: Message) => {
  const fullText = message.content
  message.displayContent = ''

  // 如果文本为空，立即返回
  if (!fullText) {
    typing.value = false
    return
  }

  // 定义每次添加的字符数
  const chunkSize = 3
  // 打字速度（毫秒）
  const typingSpeed = 30

  for (let i = 0; i < fullText.length; i += chunkSize) {
    // 每次添加几个字符
    message.displayContent = fullText.substring(0, i + chunkSize)
    // 等待一小段时间
    await new Promise(resolve => setTimeout(resolve, typingSpeed))
    // 滚动到底部
    scrollToBottom()
  }

  // 确保显示完整内容
  message.displayContent = fullText
  typing.value = false
}

// 滚动到底部
const scrollToBottom = () => {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
  }
}

// 组件挂载时滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<!-- 样式已移至 /client/styles/home/aiChat.css -->
<style></style>
