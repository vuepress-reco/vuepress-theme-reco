
import { computed, ComputedRef } from 'vue'
import { isLinkHttp } from 'vuepress/shared'

import { resolveRepoType } from '@utils/index.js'
import { useThemeLocaleData } from '@composables/index.js'

import type { MenuLink } from '../../../types'

/**
 * Get navbar config of repository link
 */
export const useNavbarRepo = (): ComputedRef<Array<MenuLink>>=> {
  const themeLocal = useThemeLocaleData()

  const repo = computed(() => themeLocal.value.repo || themeLocal.value.docsRepo || '')
  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null
  )

  const repoLink = computed(() => {
    if (repoType.value === 'GitHub' && !isLinkHttp(repo.value)) {
      return `https://github.com/${repo.value}`
    }
    return repo.value
  })

  const repoLabel = computed(() => {
    if (!repoLink.value) return null
    if (themeLocal.value.repoLabel) return themeLocal.value.repoLabel
    if (repoType.value === null) return 'Source'
    return repoType.value
  })

  const result = computed(() => {
    if (!repoLink.value || !repoLabel.value) {
      return []
    }

    return [
      {
        text: repoLabel.value,
        link: repoLink.value,
      },
    ]
  })

  return result
}
