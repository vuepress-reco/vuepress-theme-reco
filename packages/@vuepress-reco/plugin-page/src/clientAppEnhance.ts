import { defineClientAppEnhance } from '@vuepress/client'

// @ts-ignore
import Test from './components/Test.vue'

export default defineClientAppEnhance(({ app }) => {
  /* eslint-disable vue/match-component-file-name */
  app.component('Test', Test)
})
