import { inject } from 'vue'
import { useRouter } from 'vue-router'

export function usePageData(): Record<string, any> {
  const { currentRoute } = useRouter()
  const path = currentRoute.value.path

  const classificationPosts = inject('classificationPosts')
  const posts = inject('posts')

  return {
    classificationPosts:
      (classificationPosts as Record<string, any>)[path] || [],
    posts,
  }
}
