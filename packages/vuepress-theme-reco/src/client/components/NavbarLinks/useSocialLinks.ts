import { computed } from "vue"

import { useNavbarRepo } from "./useNavbarRepo.js"
import { IconGithub } from "@components/icons/index.js"
import { useThemeLocaleData } from '@composables/index.js'

import type { ComputedRef } from "vue"
import type { SocialLink } from "../../../types/page.js"

export function useSocialLinks(): {
  socialLinks: ComputedRef<Array<SocialLink>>
  jumpSocialLink: (link?: string) => void
} {
  const navbarRepo = useNavbarRepo()
  const themeLocal = useThemeLocaleData()

  const socialLinks = computed(() => {
    const data = themeLocal.value?.socialLinks || []
    navbarRepo.value.text === 'GitHub' && data.unshift({
      icon: IconGithub,
      link: navbarRepo.value.link
    })

    return data
  })

  const jumpSocialLink = (link) => {
    link && window.open(link, '_blank')
  }
  return { socialLinks, jumpSocialLink }
}
