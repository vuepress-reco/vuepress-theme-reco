import { fs, path, globby } from 'vuepress/utils'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

// 在ES模块中获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * AI聊天插件配置接口
 */
export interface AIChatPluginOptions {
  /**
   * AI服务的API密钥
   */
  apiKey?: string

  /**
   * 使用的AI模型名称
   */
  model?: string

  /**
   * 回复的随机性 (0-1)
   */
  temperature?: number

  /**
   * 回复的最大token数量
   */
  maxTokens?: number
}

/**
 * 页面内容摘要接口
 */
export interface PageContent {
  path: string
  title: string
  summary: string
  content: string
  headings: Array<{text: string, level: number}>
  tags: string[]
  categories: string[]
}

/**
 * AI聊天插件 - 在构建时生成文档内容索引
 */
export const aiChatPlugin = (options: AIChatPluginOptions = {}) => {
  return {
    name: '@vuepress-reco/vuepress-plugin-ai-chat',

    // 定义客户端全局变量
    define: {
      __AI_CHAT_OPTIONS__: {
        apiKey: options.apiKey || '',
        model: options.model || 'deepseek-chat',
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 500
      }
    },

    async onPrepared(app) {
      // 获取所有Markdown文件
      const sourceDir = app.dir.source()
      const patterns = ['**/*.md', '!.vuepress', '!node_modules']
      const files = await globby(patterns, { cwd: sourceDir })

      // 存储所有页面的内容摘要
      const pagesContent: PageContent[] = []

      // 处理每个文件
      for (const file of files) {
        const filePath = path.join(sourceDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')

        // 解析frontmatter和内容
        const { data: frontmatter, content: markdownContent } = matter(content)

        // 创建页面路径
        const pagePath = '/' + file.replace(/\.md$/, '.html')

        // 提取标题
        const titleMatch = markdownContent.match(/^#\s+(.*?)$/m)
        const title = titleMatch ? titleMatch[1] : frontmatter.title || file

        // 提取所有标题（用于生成文档结构）
        const headings: Array<{text: string, level: number}> = [];
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        let match;
        while ((match = headingRegex.exec(markdownContent)) !== null) {
          headings.push({
            level: match[1].length,
            text: match[2].trim()
          });
        }

        // 处理完整内容（保留大部分原始格式，但清理一些元素）
        const cleanContent = markdownContent
          .replace(/\!\[.*?\]\(.*?\)/g, '[图片]') // 将图片替换为标记
          .replace(/```[\s\S]*?```/g, (match) => { // 保留代码块但缩短过长的代码
            if (match.length > 1000) {
              return match.substring(0, 1000) + '\n// ... [代码块已截断]\n```';
            }
            return match;
          })
          .trim();

        // 提取内容摘要（移除Markdown语法）
        let summary = markdownContent
          .replace(/^#.*$/gm, '') // 移除标题
          .replace(/\!\[.*?\]\(.*?\)/g, '') // 移除图片
          .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
          .replace(/```[\s\S]*?```/g, '') // 移除代码块
          .replace(/`.*?`/g, '') // 移除行内代码
          .replace(/\n+/g, ' ') // 将多个换行符替换为单个空格
          .trim()

        // 限制摘要长度
        if (summary.length > 500) {
          summary = summary.substring(0, 500) + '...'
        }

        // 将页面信息添加到数组
        pagesContent.push({
          path: pagePath,
          title,
          summary,
          content: cleanContent,
          headings,
          tags: frontmatter.tags || [],
          categories: frontmatter.categories || []
        })
      }

      // 生成站点内容摘要
      const indexId = `DOC-${Math.random().toString(36).substring(2, 8)}`
      const siteContentSummary = {
        pages: pagesContent,
        timestamp: new Date().toISOString(),
        totalPages: pagesContent.length,
        indexId: indexId
      }

      await app.writeTemp(
        'ai-assistant-context.js',
        `// 自动生成的文档内容索引，用于AI助手\n` +
        `// 生成时间: ${new Date().toISOString()}\n` +
        `// 索引标识: ${indexId}\n` +
        `export default ${JSON.stringify(siteContentSummary, null, 2)}`
      )

      console.log('✅ 已生成AI助手文档内容索引')
    },

    // 客户端配置文件
    clientConfigFile: path.resolve(__dirname, '../client/config.js')
  }
}
