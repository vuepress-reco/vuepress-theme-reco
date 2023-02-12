import { ref, watch, computed } from 'vue'
import { md5 } from '@vuepress-reco/shared'
import { usePageFrontmatter } from '@vuepress/client'

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
  const password = ref('')
  const passwordRef = ref(null)
  const lockIcon = ref('Locked')
  const lockText = ref('请输入密码')

  watch(password, (newVal) => {
    if (newVal.length !== 6) return
    if (pagePassword.value.includes(md5(md5(newVal)))) {
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
