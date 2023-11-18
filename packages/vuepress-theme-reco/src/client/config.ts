import { Component } from 'vue';
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
  // @ts-ignore
  layouts: layouts as Record<string, Component>,
})
