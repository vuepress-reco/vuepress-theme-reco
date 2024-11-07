import { ref, watch, computed, shallowRef } from 'vue'
import { md5 } from '@vuepress-reco/shared'
import { IconLocked, IconUnlocked } from '@components/icons/index.js'
import { useSiteLocaleData } from 'vuepress/client'

import { useThemeLocaleData } from '@composables/index.js'

import type { ComputedRef, Ref } from 'vue'

export function useSiteInfo() {
  const siteLocale = useSiteLocaleData()
  const themeLocal = useThemeLocaleData()

  const siteBrandLogo = computed(() => themeLocal.value.logo)
  const siteBrandTitle = computed(() => siteLocale.value.title)
  const sitePassword = computed(() => {
    const _password = themeLocal.value.password
    if (!_password) return []
    return Array.isArray(_password) ? _password : [_password]
  })

  return { siteBrandLogo, siteBrandTitle, sitePassword }
}

export function useHandlePassword(sitePassword: ComputedRef<string[]>, emit: any): {
  lockIcon: Ref<any>
  password: Ref<string>
  passwordRef: Ref<any>
  lockText: Ref<string>
  focus: () => void
} {
  const themeLocal = useThemeLocaleData()

  const password = ref('')
  const passwordRef = ref(null)
  const lockIcon = shallowRef(IconLocked)
  const lockText = ref(themeLocal.value.inputPasswordText || 'Please enter the password')

  watch(password, (newVal) => {
    if (newVal.length !== 6) return
    if (sitePassword.value.includes(md5(md5(newVal)))) {
      lockIcon.value = IconUnlocked
      lockText.value = themeLocal.value.unlockSucessText || 'Success, enjoy it!'
      setTimeout(() => {
        emit('pass')
      }, 600)
    } else {
      password.value = ''
      lockText.value = themeLocal.value.unlockFailuerText || 'Failed, please enter again!'
    }
  })

  const focus = () => {
    // @ts-ignore
    passwordRef.value.focus()
  }

  return { password, passwordRef, lockIcon, lockText, focus }
}
