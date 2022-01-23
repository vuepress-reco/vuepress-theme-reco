import { defineClientAppEnhance } from '@vuepress/client'
import { registerGlobalComponents, resolveSearchComponent } from './utils'
import './utils/resolveStyles'

export default defineClientAppEnhance(({ app, router }) => {
  registerGlobalComponents(app)
  resolveSearchComponent(app)
})
