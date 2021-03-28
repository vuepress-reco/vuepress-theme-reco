import { defineClientAppEnhance } from '@vuepress/client'
// @ts-ignore
import Test from './components/Test.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('Test', Test)
})
