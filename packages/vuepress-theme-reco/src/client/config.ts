import { defineClientConfig } from '@vuepress/client'

import { applyClientSetup } from './clientSetup'
import { applyClientEnhance } from './clientEnhance'

import * as layouts from './layouts'

export default defineClientConfig({
  enhance(...args) {
    applyClientEnhance(...args)
  },
  setup() {
    applyClientSetup()
  },
  layouts,
})
