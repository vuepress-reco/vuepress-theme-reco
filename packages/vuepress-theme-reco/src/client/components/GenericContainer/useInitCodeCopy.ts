import { watch, onMounted } from 'vue'
import { useRoute } from 'vuepress/client'
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
