import { inject } from 'vue'
import { useRouter } from 'vue-router'

export function useClassifiable(): Record<string, any> {
  const { currentRoute } = useRouter()
  const path = currentRoute.value.path
  const pages = inject('pages')

  return (pages as Record<string, any>)[path] || []
}
