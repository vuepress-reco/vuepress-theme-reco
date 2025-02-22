import { useRoute } from 'vuepress/client'
import { defineComponent, h, onMounted, onUpdated, toRefs } from 'vue'

import { pageviewCount } from '@waline/client'
import { useComment } from '../composables/index.js'

export default defineComponent({
  name: 'WalineViews',
  props: {
    path: String,
  },
  setup(props) {
    const { path } = toRefs(props)
    const { options } = useComment()
    const route = useRoute()
    const viewFn = function () {
      pageviewCount({
        serverURL: options.value.serverURL,
        path: path.value,
        selector: `[data-path="${path.value}"]`,
        update: route.path === path.value,
      })
    }
    onMounted(() => {
      viewFn()
    })
    onUpdated(() => {
      viewFn()
    })
    return () =>
      h('span', {
        'class': 'waline-pageview-count',
        'data-path': path.value,
      })
  },
})
