import { defineClientConfig } from '@vuepress/client'

import { applyClientSetup } from './clientSetup'

export default defineClientConfig({
  setup(){
    applyClientSetup()
  },
})
