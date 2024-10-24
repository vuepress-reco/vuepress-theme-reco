import { createMarkdown, Markdown } from '@vuepress/markdown'
import {
  highlightPlugin,
  preWrapperPlugin,
  resolveHighlighter,
  type PrismjsPluginOptions,
  type MarkdownItPreWrapperOptions
} from '@vuepress/plugin-prismjs'
import { lineNumbers as lineNumbersPlugin } from '@vuepress/highlighter-helper'

const md: Markdown = createMarkdown()

md.options.highlight = (code, lang) => {
  const highlighter = resolveHighlighter(lang)
  return highlighter?.(code) || ''
}

md.use<PrismjsPluginOptions>(highlightPlugin)
md.use<MarkdownItPreWrapperOptions>(preWrapperPlugin, { preWrapper: true })
md.use(lineNumbersPlugin, { lineNumbers: true, removeLastLine: true })

export { md }
