import type { Plugin, App } from '@vuepress/core'
import taskLists from 'markdown-it-task-lists'

export const markdownTaskPlugin = (): ((app: App) => Plugin) => {
  return (app: App): Plugin => {
    return {
      name: '@vuepress-reco/vuepress-plugin-markdown-task',
      extendsMarkdown: (md) => {
        md.use(taskLists)
      },
    }
  }
}
