import { defineClientConfig } from '@vuepress/client'

import { applyClientSetup } from './clientSetup'
import { applyClientEnhance } from './clientEnhance'

import Categories from './layouts/Categories.vue'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'
import Posts from './layouts/Posts.vue'
import Timeline from './layouts/Timeline.vue'

export default defineClientConfig({
  enhance(...args) {
    applyClientEnhance(...args)
  },
  setup() {
    applyClientSetup()
  },
  layouts: {
    Categories,
    Layout,
    NotFound,
    Posts,
    Timeline,
  },
})
