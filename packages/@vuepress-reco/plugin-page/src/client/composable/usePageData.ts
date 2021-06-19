import { inject } from 'vue'
import { useRouter } from 'vue-router'
import {
  classificationPostsSymbol,
  classificationSummarySymbol,
  postsSymbol,
} from '../constants'

export function usePageData(): Record<string, any> {
  const { currentRoute } = useRouter()
  const path = currentRoute.value.path

  const classificationPosts = inject(classificationPostsSymbol)
  const classificationSummary = inject(classificationSummarySymbol)
  const posts = inject(postsSymbol)

  return {
    classificationPosts:
      (classificationPosts as Record<string, any>)[path] || [],
    classificationSummary,
    posts,
  }
}
