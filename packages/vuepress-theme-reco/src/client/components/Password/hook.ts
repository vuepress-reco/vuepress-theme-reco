import { ref, watch, computed } from 'vue'
import { md5 } from '@vuepress-reco/shared'
import { useSiteLocaleData } from '@vuepress/client'
import { useThemeLocaleData } from '../../composables'

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

export function useHandlePassword(sitePassword, emit) {
  const password = ref('')
  const passwordRef = ref(null)
  const lockIcon = ref('Locked')
  const lockText = ref('请输入密码')

  watch(password, (newVal) => {
    if (newVal.length !== 6) return
    if (sitePassword.value.includes(md5(md5(newVal)))) {
      lockIcon.value = 'Unlocked'
      lockText.value = '密码正确，请重稍后！'
      setTimeout(() => {
        emit('pass')
      }, 600)
    } else {
      password.value = ''
      lockText.value = '密码错误，请重新输入！'
    }
  })

  const focus = () => {
    // @ts-ignore
    passwordRef.value.focus()
  }

  return { password, passwordRef, lockIcon, lockText, focus }
}
