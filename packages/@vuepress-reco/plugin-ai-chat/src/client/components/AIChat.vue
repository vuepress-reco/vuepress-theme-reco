<template>
  <section class="ai-chat">
    <div class="chat-container">
      <div class="chat-header">
        <h2>Vuepress Reco AI Chat (Beta)</h2>
      </div>
      <div class="chat-messages" ref="chatMessagesRef">
        <div v-for="(message, index) in messages" :key="index"
             :class="['message', message.role === 'user' ? 'user-message' : 'assistant-message']">
          <div class="message-content">
            <div v-if="message.role === 'assistant'" class="message-avatar assistant-avatar">
              <span class="robot-icon">🤖</span>
            </div>
            <div class="message-text" v-html="renderMarkdown(message.displayContent || message.content)"></div>
            <div v-if="message.role === 'user'" class="message-avatar user-avatar">
              <span class="user-icon">👤</span>
            </div>
          </div>
        </div>
        <!-- 移除多余的loading效果，只使用消息中的"正在思考..."文本作为loading指示 -->
      </div>
      <div class="chat-input-container">
        <div class="chat-control-buttons">
          <button class="control-button" @click="clearChatHistory" :disabled="loading || typing">
            <span>清除历史</span>
          </button>
        </div>
        <div class="chat-input">
          <input
            type="text"
            v-model="userInput"
            @keyup.enter="sendMessage"
            placeholder="有什么问题都可以问我..."
            :disabled="loading || typing"
          />
          <button @click="sendMessage" :disabled="loading || typing || !userInput.trim()">
            <span v-if="!loading && !typing">发送</span>
            <span v-else-if="typing">回复中...</span>
            <span v-else>处理中...</span>
          </button>
        </div>
      </div>
    </div>


  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, inject } from 'vue'
import { usePageData, usePageFrontmatter, useSiteData } from 'vuepress/client'

// 从预编译的上下文文件导入网站内容摘要
// 编译时生成的数据将在这里被导入
interface SiteContextData {
  pages: Array<{
    path: string
    title: string
    summary: string
    content: string
    headings: Array<{text: string, level: number}>
    tags: string[]
    categories: string[]
    score?: number
  }>
  timestamp?: string
  totalPages: number
  indexId?: string
}

const siteContextData = inject<SiteContextData>('aiChatSiteContext') || { pages: [], totalPages: 0 }

// 获取全局配置
const globalOptions = typeof window !== 'undefined' ? (window as any).__AI_CHAT_OPTIONS || {} : {}

// 存储最近一次搜索结果（仅用于控制台打印）
const lastSearchResults = ref<any[]>([]);


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
    // 确保每个消息都有内容，防止空消息被保存
    const messagesToSave = messages.value.map(msg => ({
      ...msg,
      // 确保content不为空，如果为空则使用displayContent
      content: msg.content || msg.displayContent || '',
      // 确保displayContent不为空，如果为空则使用content
      displayContent: msg.displayContent || msg.content || ''
    }))
    window.localStorage.setItem(sessionId.value, JSON.stringify(messagesToSave))
  }
}

// 从localStorage加载聊天历史
const loadChatHistory = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedMessages = window.localStorage.getItem(sessionId.value)
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages) as Message[]
        // 确保加载的消息都有有效的content和displayContent
        messages.value = parsedMessages.map(msg => ({
          ...msg,
          // 确保content不为空
          content: msg.content || msg.displayContent || '',
          // 确保displayContent不为空
          displayContent: msg.displayContent || msg.content || ''
        })).filter(msg => msg.content.trim() !== '') // 过滤掉内容为空的消息
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
        content: '你好！我是文档智能助手，有关于本文档的任何问题都可以问我。',
        displayContent: '你好！我是文档智能助手，有关于本文档的任何问题都可以问我。'
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
    content: input,
    displayContent: input // 确保用户消息也有displayContent
  })

  // 清空输入框并设置加载状态
  userInput.value = ''
  loading.value = true

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  try {
    // 创建新消息并添加到消息列表
    const newMessage: Message = {
      role: 'assistant',
      content: '正在思考...',  // 默认占位内容
      displayContent: '正在思考...'
    }
    messages.value.push(newMessage)
    typing.value = true

    // 调用DeepSeek API获取流式回复
    const fullResponse = await callDeepSeekAPI(input, (chunk) => {
      // 每收到一个文本块，就更新消息内容
      if (chunk) { // 确保chunk不为空
        newMessage.content = (newMessage.content === '正在思考...') ? chunk : newMessage.content + chunk
        newMessage.displayContent = newMessage.content
        scrollToBottom()
      }
    })

    // 确保最终内容完整
    if (fullResponse) { // 确保响应不为空
      newMessage.content = fullResponse
      newMessage.displayContent = fullResponse
    } else if (newMessage.content === '正在思考...') {
      // 如果API返回为空且内容仍为默认值，使用备用响应
      const fallbackText = await fallbackResponse(input)
      newMessage.content = fallbackText
      newMessage.displayContent = fallbackText
    }
  } catch (error) {
    // 处理错误，为用户提供更详细的错误信息
    let errorMessage = '抱歉，我遇到了一些问题，请稍后再试。'

    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = '网络连接错误。请检查您的网络连接并重试。'
      } else if (error.message.includes('API') || error.message.includes('key')) {
        errorMessage = 'API密钥错误或权限不足。请检查您的API设置。'
      }
      console.error('AI回复错误:', error)
    }

    // 更新最后一条消息或添加新的错误消息
    const lastMessage = messages.value[messages.value.length - 1]
    if (lastMessage && lastMessage.role === 'assistant' && lastMessage.content === '正在思考...') {
      // 更新现有的消息
      lastMessage.content = errorMessage
      lastMessage.displayContent = errorMessage
    } else {
      // 添加新的错误消息
      messages.value.push({
        role: 'assistant',
        content: errorMessage,
        displayContent: errorMessage
      })
    }
  } finally {
    loading.value = false
    typing.value = false
    // 保存聊天历史
    saveChatHistory()
  }
}

// 文档内容搜索函数
const searchDocumentContent = (query: string) => {
  console.log('搜索查询:', query)
  console.log('可用文档数量:', siteContextData.pages?.length || 0)
  console.log('文档索引ID:', siteContextData.indexId || '未知')

  if (!siteContextData || !siteContextData.pages || !siteContextData.pages.length) {
    console.log('没有可用的文档内容')
    return { relevantPages: [] }
  }

  // 将查询分解为关键词（更智能的分词）
  // 1. 先分割为短语
  const phrases = query.toLowerCase().split(/[,.?!;:\n]/).filter(p => p.trim().length > 0)

  // 2. 再将短语分解为关键词
  const allKeywords = new Set<string>()

  // 将原始查询也添加为关键词（确保完整匹配有最高优先级）
  if (query.trim().length > 0) {
    allKeywords.add(query.toLowerCase().trim())
  }

  phrases.forEach(phrase => {
    // 中文分词处理（更细粒度）
    // 1. 添加完整短语
    const trimmedPhrase = phrase.trim()
    if (trimmedPhrase.length >= 2) {
      allKeywords.add(trimmedPhrase)
    }

    // 2. 提取中文关键词（单个汉字或连续汉字）
    const chineseWords = phrase.match(/[\u4e00-\u9fa5]+/g) || []
    chineseWords.forEach(word => {
      // 添加完整中文词
      if (word.length >= 1) {
        allKeywords.add(word)
      }

      // 对于较长的中文词（2个字及以上），尝试分解为更小的单位
      if (word.length >= 2) {
        // 添加单字（对于重要的单字）
        for (let i = 0; i < word.length; i++) {
          const char = word.charAt(i)
          // 一些常见的重要单字，如"系"、"列"、"配"、"置"等
          const importantChars = ['系', '列', '配', '置', '文', '档', '主', '题', '插', '件', '页', '标', '组', '件']
          if (importantChars.includes(char)) {
            allKeywords.add(char)
          }
        }
      }

      // 对于3个字及以上的词，添加2字组合（滑动窗口）
      if (word.length >= 3) {
        for (let i = 0; i < word.length - 1; i++) {
          const twoChars = word.substring(i, i + 2)
          allKeywords.add(twoChars)
        }
      }
    })

    // 提取英文关键词
    const englishWords = phrase.match(/[a-zA-Z]+/g) || []
    englishWords.forEach(word => {
      if (word.length >= 2) { // 至少2个字母
        allKeywords.add(word)
      }
    })

    // 提取数字和特殊标识符
    const codeTerms = phrase.match(/[a-zA-Z0-9_\-.]+/g) || []
    codeTerms.forEach(term => {
      if (term.length >= 2 && /[0-9_\-.]/.test(term)) { // 包含数字或特殊字符
        allKeywords.add(term)
      }
    })
  })

  // 将关键词转换为数组
  const keywords = Array.from(allKeywords)
  console.log('提取的关键词:', keywords)

  // 如果没有有效的关键词，尝试使用整个查询语句
  if (keywords.length === 0) {
    console.log('没有提取到关键词，使用完整查询')
    // 如果查询语句足够长，直接使用
    if (query.length >= 2) {
      keywords.push(query.toLowerCase())
    } else {
      console.log('查询过短，无法匹配')
      return { relevantPages: [] }
    }
  }

  console.log('处理后的关键词:', Array.from(allKeywords))

  // 计算每个页面的相关性得分
  const scoredPages = siteContextData.pages.map(page => {
    // 将页面内容转为小写以进行不区分大小写的匹配
    const titleLower = page.title.toLowerCase()
    const summaryLower = page.summary.toLowerCase()
    const contentLower = (page.content || '').toLowerCase()
    const tagsLower = (page.tags || []).map(tag => tag.toLowerCase())
    const headings = page.headings || []
    const headingsLower = headings.map(h => h.text.toLowerCase())

    // 计算得分
    let score = 0
    let matchDetails: string[] = [] // 用于调试的匹配详情

    // 完全匹配原始查询（给予最高权重）
    if (titleLower.includes(query.toLowerCase())) {
      score += 50 // 标题完全匹配原始查询
      matchDetails.push(`标题完全匹配[+50]`)
    } else if (titleLower.includes(query.toLowerCase().replace(/\s+/g, ''))) {
      score += 45 // 标题匹配无空格的查询
      matchDetails.push(`标题匹配无空格查询[+45]`)
    }

    // 部分匹配标题（如查询是标题的一部分）
    // 例如：查询"系"，标题包含"系列文档"
    const queryTerms = query.toLowerCase().trim().split(/\s+/)
    if (queryTerms.length === 1 && queryTerms[0].length >= 1) {
      // 单个词的查询，检查是否是标题的一部分
      const singleTerm = queryTerms[0]
      if (titleLower.includes(singleTerm)) {
        const matchRatio = singleTerm.length / titleLower.length
        // 匹配比例越高，分数越高（最高40分）
        const partialScore = Math.min(40, Math.round(40 * matchRatio))
        score += partialScore
        matchDetails.push(`标题部分匹配[+${partialScore}]`)
      }
    }

    if (contentLower.includes(query.toLowerCase())) {
      score += 30 // 内容完全匹配原始查询
      matchDetails.push(`内容完全匹配[+30]`)
    }

    // 关键词匹配
    keywords.forEach(keyword => {
      // 标题匹配（最高权重）
      if (titleLower.includes(keyword)) {
        // 根据关键词长度给予不同权重
        const keywordWeight = Math.min(20, Math.max(5, keyword.length * 3))
        score += keywordWeight
        matchDetails.push(`标题包含关键词"${keyword}"[+${keywordWeight}]`)
      }

      // 子标题匹配（次高权重）
      const headingMatches = headingsLower.filter(h => h.includes(keyword)).length
      if (headingMatches > 0) {
        const headingScore = headingMatches * 10
        score += headingScore
        matchDetails.push(`${headingMatches}个子标题包含"${keyword}"[+${headingScore}]`)
      }

      // 摘要匹配
      if (summaryLower.includes(keyword)) {
        score += 8
        matchDetails.push(`摘要包含"${keyword}"[+8]`)
      }

      // 内容匹配（计算匹配次数和匹配质量）
      let contentMatchCount = 0
      let pos = contentLower.indexOf(keyword)
      while (pos !== -1) {
        // 检查是否是单词边界（提高精确匹配的权重）
        const isBoundaryMatch = (
          (pos === 0 || !/[a-zA-Z0-9\u4e00-\u9fa5]/.test(contentLower.charAt(pos - 1))) &&
          (pos + keyword.length === contentLower.length || !/[a-zA-Z0-9\u4e00-\u9fa5]/.test(contentLower.charAt(pos + keyword.length)))
        )

        // 边界匹配给予更高权重
        contentMatchCount += isBoundaryMatch ? 1.5 : 1
        pos = contentLower.indexOf(keyword, pos + 1)
      }

      // 内容匹配次数越多，得分越高，但有上限
      // 关键词长度也影响权重（更长的关键词匹配更有价值）
      if (contentMatchCount > 0) {
        const contentMatchScore = Math.min(contentMatchCount * (2 + Math.min(3, keyword.length / 2)), 20)
        score += contentMatchScore
        matchDetails.push(`内容包含"${keyword}"${contentMatchCount}次[+${contentMatchScore.toFixed(1)}]`)
      }

      // 标签匹配
      if (tagsLower.some(tag => tag.includes(keyword))) {
        score += 5
        matchDetails.push(`标签包含"${keyword}"[+5]`)
      }
    })

    // 计算短语匹配（对于多个关键词连续出现的情况给予额外奖励）
    phrases.forEach(phrase => {
      if (phrase.length >= 3) { // 考要3个字符及以上的短语
        const phraseLower = phrase.trim().toLowerCase()
        if (contentLower.includes(phraseLower)) {
          const phraseScore = Math.min(15, 5 + phrase.length)
          score += phraseScore // 短语匹配给予额外奖励
          matchDetails.push(`内容包含完整短语"${phraseLower}"[+${phraseScore}]`)
        }
      }
    })

    // 记录匹配详情（仅用于调试）
    if (score > 0) {
      console.log(`页面"${page.title}"得分:${score}，匹配详情:`, matchDetails)
    }

    return { ...page, score, matchDetails }
  })

  // 过滤掉得分为0的页面，并按得分降序排序
  let relevantPages = scoredPages
    .filter(page => page.score > 0)
    .sort((a, b) => b.score - a.score)

  // 如果没有找到任何结果，尝试使用更宽松的匹配
  if (relevantPages.length === 0 && query.trim().length >= 1) {
    console.log('没有找到精确匹配，尝试模糊匹配')
    // 使用更宽松的匹配逻辑重新计算得分
    relevantPages = siteContextData.pages
      .map(page => {
        const titleLower = page.title.toLowerCase()
        const contentLower = (page.content || '').toLowerCase()
        const headings = page.headings || []
        const headingsLower = headings.map(h => h.text.toLowerCase())
        let fuzzyScore = 0
        let fuzzyMatchDetails: string[] = []

        // 检查查询是否是标题或内容的子串
        const queryLower = query.toLowerCase().trim()

        // 1. 检查单个汉字匹配
        for (let i = 0; i < queryLower.length; i++) {
          const char = queryLower.charAt(i)
          if (/[\u4e00-\u9fa5]/.test(char)) { // 是汉字
            if (titleLower.includes(char)) {
              fuzzyScore += 8
              fuzzyMatchDetails.push(`标题包含汉字"${char}"[+8]`)
            }
            if (headingsLower.some(h => h.includes(char))) {
              fuzzyScore += 5
              fuzzyMatchDetails.push(`子标题包含汉字"${char}"[+5]`)
            }
            if (contentLower.includes(char)) {
              fuzzyScore += 3
              fuzzyMatchDetails.push(`内容包含汉字"${char}"[+3]`)
            }
          }
        }

        // 2. 检查2字符组合
        if (queryLower.length >= 2) {
          for (let i = 0; i < queryLower.length - 1; i++) {
            const subQuery = queryLower.substring(i, i + 2)
            if (titleLower.includes(subQuery)) {
              fuzzyScore += 10
              fuzzyMatchDetails.push(`标题包含"${subQuery}"[+10]`)
            }
            if (contentLower.includes(subQuery)) {
              fuzzyScore += 5
              fuzzyMatchDetails.push(`内容包含"${subQuery}"[+5]`)
            }
          }
        }

        // 记录模糊匹配详情
        if (fuzzyScore > 0) {
          console.log(`模糊匹配: 页面"${page.title}"得分:${fuzzyScore}，匹配详情:`, fuzzyMatchDetails)
        }

        return { ...page, score: fuzzyScore, matchDetails: fuzzyMatchDetails }
      })
      .filter(page => page.score > 0)
      .sort((a, b) => b.score - a.score)
  }

  // 只返回最相关的5个页面
  relevantPages = relevantPages.slice(0, 5)

  console.log('找到相关文档:', relevantPages.length)
  relevantPages.forEach((page, index) => {
    console.log(`文档 ${index+1}:`, page.title, '得分:', page.score)
  })

  // 存储搜索结果用于控制台调试
  lastSearchResults.value = relevantPages
  console.log('搜索结果已存储:', lastSearchResults.value.length, '条记录')

  return { relevantPages }
}

// 调用DeepSeek API获取回复（流式输出）
const callDeepSeekAPI = async (input: string, onChunk?: (chunk: string) => void): Promise<string> => {
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

    // 从预编译的内容中获取网站全局上下文
    // 搜索相关文档内容
    const { relevantPages } = searchDocumentContent(input)

    // 构建文档上下文
    let documentContext = ''
    if (relevantPages.length > 0) {
      documentContext = `以下是与用户问题相关的文档内容 (索引ID: ${siteContextData.indexId || '未知'}):\n`

      // 添加相关文档的详细内容
      relevantPages.forEach((page, index) => {
        // 添加分隔线和文档编号
        documentContext += `\n------- 文档 ${index + 1} -------\n`

        // 添加标题和路径
        documentContext += `标题: ${page.title}\n路径: ${page.path}\n`

        // 添加标签信息（如果有）
        if (page.tags && page.tags.length > 0) {
          documentContext += `标签: ${page.tags.join(', ')}\n`
        }

        // 添加子标题结构（如果有）
        if (page.headings && page.headings.length > 0) {
          documentContext += `\n文档结构:\n`
          page.headings.forEach(heading => {
            const indent = '  '.repeat(heading.level - 1)
            documentContext += `${indent}- ${heading.text}\n`
          })
        }

        // 添加完整文档内容
        documentContext += `\n完整内容:\n${page.content}\n`
      })

      // 添加使用提示
      documentContext += `\n\n请根据以上文档内容回答用户的问题。如果文档中没有相关信息，请说明这一点。`
    } else {
      documentContext = '未找到与用户问题直接相关的文档内容。'
    }

    // 构建请求体
    const requestBody = {
      model: globalOptions.model || 'deepseek-chat', // 使用全局配置或默认值
      messages: [
        {
          role: 'system',
          content: `你是${siteName}文档网站的AI助手。你的职责是基于文档内容准确回答用户问题。

当前站点信息:
- 站点名称: ${siteName}
- 站点描述: ${siteDescription}
- 用户当前浏览页面: ${currentPage} (${currentPagePath})

指导原则:
1. 你必须严格基于提供给你的文档内容回答问题，不要自行编造信息
2. 如果文档中包含了用户问题的直接答案，请引用该内容并清晰地解释
3. 如果文档中没有直接相关内容，请基于最相关的文档部分进行推断和解释
4. 强调重点内容，使用代码示例或列表增强可读性
5. 回答应简洁清晰，直接解决用户问题

${documentContext}

请根据上述文档内容，提供准确、具体、有帮助的回答。如果需要展示代码，请使用正确的代码格式。回答使用中文。`
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
      temperature: globalOptions.temperature || 0.7,
      max_tokens: globalOptions.maxTokens || 2000, // 增加 token 上限确保完整输出
      stream: true // 启用流式输出
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

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`API错误: ${errorData.error?.message || '未知错误'}`)
    }

    // 处理流式响应
    if (!response.body) {
      throw new Error('响应体为空')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let fullText = ''
    let buffer = ''

    // 读取流
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      // 解码二进制数据
      const chunk = decoder.decode(value, { stream: true })
      buffer += chunk

      // 处理数据行
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.trim() === '') continue
        if (line.trim() === 'data: [DONE]') continue

        try {
          // 去掉 'data: ' 前缀
          const jsonStr = line.replace(/^data: /, '')
          const json = JSON.parse(jsonStr)

          // 提取文本块
          const textChunk = json.choices[0]?.delta?.content || ''
          if (textChunk) {
            fullText += textChunk
            // 如果提供了回调函数，则调用它
            if (onChunk) {
              onChunk(textChunk)
            }
          }
        } catch (e) {
          console.error('解析流数据错误:', e, line)
        }
      }
    }

    return fullText
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

  // 尝试使用文档内容搜索功能
  const { relevantPages } = searchDocumentContent(input)

  // 如果找到相关页面，使用这些信息构建回答
  if (relevantPages.length > 0) {
    let response = `[基于文档内容 - 索引ID: ${siteContextData.indexId || '未知'}] 根据我在文档中找到的信息：\n\n`

    // 添加最相关页面的信息
    const topPage = relevantPages[0]
    response += `来自《${topPage.title}》的内容:\n${topPage.summary}\n\n`

    // 添加相关页面链接
    if (relevantPages.length > 1) {
      response += `您可能还对以下页面感兴趣：\n`
      relevantPages.slice(1).forEach((page, index) => {
        response += `- [${page.title}](${page.path})\n`
      })
    }

    return response
  }

  // 如果文档搜索没有结果，使用简单的关键词匹配
  const siteName = siteData.value.title
  const currentPage = pageData.value.title

  // 简单的关键词匹配示例
  if (input.toLowerCase().includes('主题') || input.toLowerCase().includes('theme')) {
    return `vuepress-theme-reco是一款简洁的vuepress博客和文档主题。它提供了博客、分类、标签、时间轴等功能，非常适合构建个人博客或项目文档。`
  } else if (input.toLowerCase().includes('插件') || input.toLowerCase().includes('plugin')) {
    return `vuepress-theme-reco支持多种插件，包括评论插件、页面插件、vue-previews插件和bulletin-popover插件等。您可以在文档中查看更详细的插件使用说明。`
  } else if (input.toLowerCase().includes('模块') || input.toLowerCase().includes('module')) {
    return `vuepress-theme-reco的首页由多个可配置模块组成，包括Banner、BannerBrand、Blog、MdContent、Comment、Footer和Features等。您可以通过frontmatter.modules来自定义显示哪些模块以及它们的顺序。`
  } else if (input.toLowerCase().includes('如何') || input.toLowerCase().includes('how')) {
    return `要开始使用vuepress-theme-reco主题，您可以通过以下命令初始化项目：\`\`\`bash\npnpm install @vuepress-reco/theme-cli@1.0.7 -g\ntheme-cli init\n\`\`\`然后按照提示选择2.x版本进行安装。`
  }

  // 默认回答
  return `[通用回复] 关于"${input}"的问题，我建议您查看${siteName}的官方文档获取更详细的信息。如果您有更具体的问题，请随时询问我！`
}

// 导入必要的依赖
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

// 先加载Prism核心语言
// 注意：在客户端不能使用loadLanguages动态加载，所以需要静态导入

// 基础语言
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'

// 常用语言
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-markup-templating'

// 创建markdown-it实例
const md = new MarkdownIt({
  html: true,        // 允许HTML标签
  linkify: true,     // 自动将URL转换为链接
  typographer: true, // 启用一些语言中立的替换和引号美化
  breaks: true,      // 将换行符转换为<br>
  highlight: function (code, lang) {
    // 安全处理语言标识符
    const safeLanguage = (lang || '').toLowerCase()

    // 检查是否支持该语言
    const supportedLanguage = safeLanguage && Prism.languages[safeLanguage] ? safeLanguage : null

    // 如果有指定语言且Prism支持该语言
    if (supportedLanguage) {
      try {
        // 使用安全的语言标识符
        const highlighted = Prism.highlight(code, Prism.languages[supportedLanguage], supportedLanguage)

        // 将高亮后的代码包裹在VuePress风格的容器中
        return highlighted
      } catch (e) {
        console.error(`Prism高亮错误:`, e)
      }
    }

    // 如果没有语言或找不到语言，使用默认样式
    return code
  }
})

// 添加常用插件
// 添加表格支持
try {
  const markdownItTable = require('markdown-it-table')
  md.use(markdownItTable)
} catch (e) {
  // 如果插件不可用，忽略错误
}

// 添加任务列表支持
try {
  const markdownItTaskLists = require('markdown-it-task-lists')
  md.use(markdownItTaskLists, { enabled: true, label: true })
} catch (e) {
  // 如果插件不可用，忽略错误
}

// 自定义链接渲染器，使其与VuePress的链接风格一致
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // 添加VuePress风格的类名
  const aIndex = tokens[idx].attrIndex('class')
  if (aIndex < 0) {
    tokens[idx].attrPush(['class', 'external-link'])
  } else if (tokens[idx].attrs && tokens[idx].attrs[aIndex] && tokens[idx].attrs[aIndex][1]) {
    // 确保 attrs 和 attrs[aIndex] 存在
    tokens[idx].attrs[aIndex][1] += ' external-link'
  }

  // 对外部链接添加target="_blank"和rel="noopener noreferrer"
  const hrefIndex = tokens[idx].attrIndex('href')
  if (hrefIndex >= 0 && tokens[idx].attrs) {
    // 确保 attrs 存在
    const hrefAttr = tokens[idx].attrs[hrefIndex]
    if (hrefAttr && hrefAttr[1] && /^https?:\/\//.test(hrefAttr[1])) {
      tokens[idx].attrPush(['target', '_blank'])
      tokens[idx].attrPush(['rel', 'noopener noreferrer'])
    }
  }

  return defaultRender(tokens, idx, options, env, self)
}

// 使用markdown-it渲染markdown文本
const renderMarkdown = (text: string): string => {
  if (!text) return ''

  try {
    // 使用markdown-it渲染
    const html = md.render(text)

    // 添加VuePress风格的容器类
    return `<div class="vuepress-markdown-body">${html}</div>`
  } catch (error) {
    console.error('Markdown渲染失败:', error)

        // 降级处理：如果渲染失败，使用简单的处理方式
    // 处理代码块，增强代码高亮
    let processedText = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || 'text'

      // 安全处理语言标识符
      const safeLanguage = (lang || '').toLowerCase()
      const supportedLanguage = safeLanguage && safeLanguage !== 'text' && Prism.languages[safeLanguage] ? safeLanguage : null

      // 尝试使用Prism高亮代码
      if (supportedLanguage) {
        try {
          const highlighted = Prism.highlight(code, Prism.languages[supportedLanguage], supportedLanguage)
          return `<div class="language-${supportedLanguage} ext-${supportedLanguage} line-numbers-mode"><pre class="language-${supportedLanguage}"><code>${highlighted}</code></pre></div>`
        } catch (e) {
          console.error(`Prism高亮错误:`, e)
        }
      }

      // 如果没有语言或找不到语言，使用默认处理
      return `<div class="language-${lang} ext-${lang} line-numbers-mode"><pre class="language-${lang}"><code>${code.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;')}</code></pre></div>`
    })

    // 处理行内代码
    processedText = processedText.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

    // 处理标题
    processedText = processedText.replace(/^#{1,6}\s+(.+)$/gm, (match, title) => {
      const level = match.trim().split(' ')[0].length
      return `<h${level} class="vuepress-heading">${title}</h${level}>`
    })

    // 处理列表
    processedText = processedText.replace(/^\s*[-*+]\s+(.+)$/gm, '<li class="vuepress-list-item">$1</li>')
    processedText = processedText.replace(/(<li[^>]*>.*<\/li>)+/g, '<ul class="vuepress-list">$&</ul>')

    // 处理普通文本中的换行符
    processedText = processedText.replace(/\n\n/g, '</p><p class="vuepress-paragraph">')
    processedText = processedText.replace(/\n/g, '<br>')

    // 包裹在段落中
    if (!processedText.startsWith('<')) {
      processedText = `<p class="vuepress-paragraph">${processedText}</p>`
    }

    return `<div class="vuepress-markdown-body">${processedText}</div>`
  }
}

// 获取API密钥的函数 - 从多个来源尝试获取密钥
const getApiKey = (): string => {
  // 1. 首先尝试从页面frontmatter的aiChat配置获取
  const aiChatConfig = frontmatter.value.aiChat as { apiKey?: string } || {}

  // 2. 尝试从全局配置获取
  const configApiKey = globalOptions.apiKey

  // 3. 从localStorage获取（用户可能在设置中手动添加）
  let storedApiKey = ''
  if (typeof window !== 'undefined' && window.localStorage) {
    storedApiKey = window.localStorage.getItem('deepseek-api-key') || ''
  }

  // 返回找到的第一个API密钥，优先级: 页面aiChat配置 > 全局配置 > localStorage
  return aiChatConfig.apiKey ||
         configApiKey ||
         storedApiKey ||
         ''
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

// 消息已经在渲染时高亮，不需要额外的监听处理
</script>

<style>
/* 引入Prism的默认主题样式 */
@import 'prismjs/themes/prism-tomorrow.css';
@import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
</style>

<style scoped>
@import '@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css';

.ai-chat {
  @apply max-w-screen-xl mx-auto my-16 px-6;
}

.chat-container {
  @apply rounded-2xl overflow-hidden border border-primary flex flex-col h-[600px];
  @apply bg-white dark:bg-reco-bg-darkmode-code;
}

.chat-header {
  @apply p-4 flex justify-center items-center;
  @apply bg-reco-primary;
}

.chat-header h2 {
  @apply m-0 pt-0 text-xl font-medium text-white z-10;
  &::before {
    @apply hidden;
  }
}

.chat-messages {
  @apply flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth;
}

.message {
  @apply flex flex-col;
}

.message-content {
  @apply flex;
}

.user-message .message-content {
  @apply justify-end;
}

.message-text {
  @apply px-4 py-3 rounded-2xl max-w-[80%];
  @apply bg-reco-primary/10 dark:bg-reco-primary/20;
}

.assistant-message .message-text {
  @apply bg-active;
}

.message-avatar {
  @apply w-8 h-8 rounded-full flex justify-center items-center text-white font-bold text-sm flex-shrink-0;
}

.user-avatar {
  @apply bg-reco-primary/80 ml-2;
}

.assistant-avatar {
  @apply bg-reco-primary mr-2;
}

.typing-indicator {
  @apply flex items-center justify-start min-h-6 min-w-10;
}

.typing-indicator span {
  @apply h-2 w-2 rounded-full inline-block mr-1 last:mr-0;
  @apply bg-reco-text-lightmode/50 dark:bg-reco-text-darkmode/50;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.3s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes typing {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Code Styles */
.message-text :deep(pre) {
  @apply bg-reco-bg-lightmode-code dark:bg-reco-bg-darkmode-code rounded-lg p-4 my-2 overflow-x-auto;
}

.message-text :deep(pre code) {
  @apply font-mono text-sm whitespace-pre text-reco-text-lightmode dark:text-reco-text-darkmode;
}

.message-text :deep(code) {
  @apply bg-reco-bg-lightmode-code/50 dark:bg-reco-bg-darkmode-code/50 rounded px-1.5 py-0.5 font-mono;
}

/* Chat Control Area */
.chat-input-container {
  @apply border-t border-reco-border-lightmode dark:border-reco-border-darkmode;
  @apply bg-white dark:bg-reco-bg-darkmode-code;
}

.chat-control-buttons {
  @apply flex justify-end px-4 pt-2;
}

.control-button {
  @apply py-1 px-3 text-sm cursor-pointer transition-colors;
  @apply border-block rounded-lg bg-reco-primary/90 font-semibold text-white;
  @apply dark:text-reco-text-darkmode;
  @apply hover:bg-reco-primary;
}

.control-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.chat-input {
  @apply p-4 flex;
}

.chat-input input {
  @apply flex-1 px-4 py-3 text-base outline-none transition-colors rounded-full mr-2;
  @apply border border-reco-border-lightmode dark:border-reco-border-darkmode;
  @apply bg-white dark:bg-reco-bg-darkmode;
  @apply text-reco-text-lightmode dark:text-reco-text-darkmode;
}

.chat-input input:focus {
  @apply border-reco-primary;
}

.chat-input button {
  @apply py-1 px-5 text-sm cursor-pointer transition-colors;
  @apply border-block rounded-lg bg-reco-primary/90 font-semibold text-white;
  @apply dark:text-reco-text-darkmode;
  @apply hover:bg-reco-primary;
}

.chat-input button:disabled {
  @apply bg-reco-primary/70 cursor-not-allowed;
}
</style>
