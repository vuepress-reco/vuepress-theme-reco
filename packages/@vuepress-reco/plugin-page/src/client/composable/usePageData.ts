import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  classificationPostsSymbol,
  classificationSummarySymbol,
  postsSymbol,
} from '../constants'

export function usePageData(): Record<string, any> {
  const { currentRoute } = useRouter()

  const classificationSummary = inject(classificationSummarySymbol)
  const posts = inject(postsSymbol)
  const cp = inject(classificationPostsSymbol)

  const classificationPosts = computed(() => {
    return (
      ((cp as { value: any }).value as Record<string, any>)[
        currentRoute.value.path
      ] || {}
    )
  })

  return { classificationPosts, classificationSummary, posts }
}
