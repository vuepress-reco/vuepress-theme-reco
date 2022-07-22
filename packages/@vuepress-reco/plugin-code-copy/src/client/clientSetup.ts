import { watch, nextTick, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useInitCopyBtn } from './composables/initCopyBtn'

export async function applyClientSetup () {
  const route = useRoute()
  const { path } = toRefs(route)

  const { codeNodes, initCopyBtn } = useInitCopyBtn()

  onMounted(() => {
    setTimeout(() => {
      initCopyBtn()
    }, 500);
  })

  watch(path, () => {
    nextTick(() => {
      initCopyBtn()
    })
  })
}
