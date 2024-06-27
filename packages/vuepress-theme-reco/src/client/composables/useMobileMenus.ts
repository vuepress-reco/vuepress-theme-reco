import { ref } from 'vue'

const isOpenMobileMenus = ref(false)
export const useMobileMenus: () => any = () => {

  const toggleMobileMenus = (to: boolean): void => {
    isOpenMobileMenus.value = typeof to === 'boolean' ? to : !isOpenMobileMenus.value
  }

  return { isOpenMobileMenus, toggleMobileMenus }
}
