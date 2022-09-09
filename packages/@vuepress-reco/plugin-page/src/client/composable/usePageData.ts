import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'

declare const __VUEPRESS_DEV__: boolean
declare const __POSTS__: Record<string, any[]>

export function usePageData(): Record<string, any> {
  const categorySummary = inject('__CATEGORY_SUMMARY__') || {};
    const posts = inject('__POSTS__') || [];
    const categoryPaginationPosts = inject('__CATEGORY_PAGINATION_POSTS__') || {};
    if (!__POSTS__) {
        throw new Error('useSiteLocaleData() is called without provider.');
    }

  const { currentRoute } = useRouter()


  const categoryPosts = computed(() => {
    return (
      (categoryPaginationPosts as Record<string, any>)[
        currentRoute.value.path
      ] || {}
    )
  })

  return { categoryPosts, categorySummary, posts }
}
