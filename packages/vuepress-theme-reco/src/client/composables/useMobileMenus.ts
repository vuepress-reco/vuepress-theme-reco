import { ref } from 'vue'

export const useMobileMenus: () => any = () => {
  const isOpenMobileMenus = ref(false)

  const toggleMobileMenus = (to: boolean): void => {
    isOpenMobileMenus.value = typeof to === 'boolean' ? to : !isOpenMobileMenus.value
  }

  return { isOpenMobileMenus, toggleMobileMenus }
}
