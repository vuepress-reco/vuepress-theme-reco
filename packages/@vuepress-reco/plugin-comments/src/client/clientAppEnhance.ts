import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import Comments from './components/Comments'
import ValineViews from './components/ValineViews'

export default defineClientAppEnhance(({ app }) => {
  app.component('Comments', (props) => h(Comments, { ...props }))
  app.component('ValineViews', (props) => h(ValineViews, { ...props }))
})
