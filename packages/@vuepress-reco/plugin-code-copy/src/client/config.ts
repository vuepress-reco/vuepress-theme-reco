import { defineClientConfig, type ClientConfig } from 'vuepress/client'

import { applyClientSetup } from './clientSetup.js'

export default defineClientConfig({
  setup(){
    applyClientSetup()
  },
}) as ClientConfig
