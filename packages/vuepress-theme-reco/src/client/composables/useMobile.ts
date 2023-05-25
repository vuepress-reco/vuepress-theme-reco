import { ref } from 'vue'

const MOBILE_DESKTOP_BREAKPOINT = 719
const isMobile = ref(false)

export function useMobile() {
  const handleLinksWrapWidth = (): void => {
    isMobile.value = window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT
  }

  handleLinksWrapWidth()

  window.addEventListener('resize', handleLinksWrapWidth, false)
  window.addEventListener('orientationchange', handleLinksWrapWidth, false)

  return { isMobile }
}
