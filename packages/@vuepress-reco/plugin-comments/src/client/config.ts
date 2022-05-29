import { defineClientConfig } from '@vuepress/client'

import { applyClientEnhance } from './clientEnhance'

export default defineClientConfig({
  enhance(...args){
    applyClientEnhance(...args)
  },
})
