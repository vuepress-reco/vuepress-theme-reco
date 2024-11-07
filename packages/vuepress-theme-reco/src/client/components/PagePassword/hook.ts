import { ref, watch, computed } from 'vue'
import { md5 } from '@vuepress-reco/shared'
import { usePageFrontmatter, useThemeLocaleData } from '@composables/index.js'

export function usePageInfo() {
  const frontmatter = usePageFrontmatter()

  const pagePassword = computed(() => {
    const _password = frontmatter.value.password
    if (!_password) return []
    return Array.isArray(_password) ? _password : [_password]
  })

  return { pagePassword }
}

export function useHandlePassword(pagePassword, emit) {
  const themeLocal = useThemeLocaleData()
  const password = ref('')
  const passwordRef = ref(null)
  const lockIcon = ref('Locked')
  const lockText = ref(themeLocal.value.inputPasswordText || 'Please enter the password')

  watch(password, (newVal) => {
    if (newVal.length !== 6) return
    if (pagePassword.value.includes(md5(md5(newVal)))) {
      lockIcon.value = 'Unlocked'
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
