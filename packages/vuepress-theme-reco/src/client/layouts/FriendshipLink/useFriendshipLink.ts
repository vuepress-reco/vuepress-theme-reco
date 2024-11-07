import { computed } from 'vue'

import { useThemeLocaleData } from '@composables/index.js'

export function useFriendshipLink() {
  const themeLocal = useThemeLocaleData()

  const friendshipLinks = computed(() => {
    return themeLocal.value.friendshipLinks || []
  })

  const handlClick = (link: string) => {
    window.open(link, '_blank')
  }

  return { friendshipLinks, handlClick }
}
