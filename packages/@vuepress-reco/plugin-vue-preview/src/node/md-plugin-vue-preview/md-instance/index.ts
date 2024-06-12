import { createMarkdown, Markdown } from '@vuepress/markdown'
import {
  highlightPlugin,
  preWrapperPlugin,
  resolveHighlighter,
  type HighlightOptions,
  type PreWrapperOptions
} from '@vuepress/plugin-prismjs'
import { lineNumbers as lineNumbersPlugin } from '@vuepress/highlighter-helper'

const md: Markdown = createMarkdown()

md.options.highlight = (code, lang) => {
  const highlighter = resolveHighlighter(lang)
  return highlighter?.(code) || ''
}

md.use<HighlightOptions>(highlightPlugin)
md.use<PreWrapperOptions>(preWrapperPlugin, { preWrapper: true })
md.use(lineNumbersPlugin, { lineNumbers: true, removeLastLine: true })

export { md }
