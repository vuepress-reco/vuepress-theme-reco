import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import Comments from './components/Comments'
// import AccessNumber from './components/AccessNumber.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('Comments', (props) => h(Comments, { ...props }))
  // app.component('AccessNumber', (props) => h(AccessNumber, { ...props }))
})
