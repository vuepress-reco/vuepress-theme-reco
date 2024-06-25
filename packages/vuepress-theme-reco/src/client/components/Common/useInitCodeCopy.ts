import { useRoute } from 'vue-router'
import { watch, onMounted } from 'vue'
import { useInitCopyBtn } from '@vuepress-reco/vuepress-plugin-code-copy/composables'

export function useInitCodeCopy() {
  const _initCodeCopyBtn = () => {
    const route = useRoute()
    const { initCopyBtn } = useInitCopyBtn()

    watch(route, () => {
      setTimeout(() => {
        initCopyBtn()
      }, 0)
    })
  }

  const initCodeCopy = () => {
    onMounted(() => {
      _initCodeCopyBtn()
    })
  }

  return { initCodeCopy }
}
