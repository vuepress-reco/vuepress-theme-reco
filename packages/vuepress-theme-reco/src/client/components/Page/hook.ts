import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePageFrontmatter } from '@vuepress/client'

let PAGE_PASSWORD_PASS = 'PAGE_PASSWORD_PASS'
export function usePassword() {
  const route = useRoute()
  PAGE_PASSWORD_PASS = `${PAGE_PASSWORD_PASS}:${route.path}`
  const frontmatter = usePageFrontmatter()

  const pageLoaded = ref(false)
  const pagePasswordPass = ref(true)
  const setedPagePassword = ref(!!frontmatter.value.password)

  onMounted(() => {
    let pagePasswordPassCache = 'true'

    // @ts-ignore
    if (!__VUEPRESS_SSR__) {
      pagePasswordPassCache = sessionStorage.getItem(
        PAGE_PASSWORD_PASS
      ) as string
    }

    if (frontmatter.value.password && pagePasswordPassCache !== 'true') {
      pagePasswordPass.value = false
    }

    pageLoaded.value = true
  })

  const handlePass = () => {
    pagePasswordPass.value = true

    // @ts-ignore
    if (!__VUEPRESS_SSR__) {
      sessionStorage.setItem(PAGE_PASSWORD_PASS, 'true')
    }
  }

  return { pageLoaded, pagePasswordPass, setedPagePassword, handlePass }
}
