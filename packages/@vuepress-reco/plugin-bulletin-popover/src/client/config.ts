import { defineComponent, h } from 'vue'
import { defineClientConfig } from '@vuepress/client'

import Bulletin from './components/Bulletin.vue'

export default defineClientConfig({
  rootComponents: [
    defineComponent(() => {
      // @ts-ignore
      if (__VUEPRESS_SSR__) return () => null
      return () => h(Bulletin)
    }),
  ],
})
