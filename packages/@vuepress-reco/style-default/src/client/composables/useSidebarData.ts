import { ref, computed } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { useSidebarItems, usePageHeaders } from './index'

export const useSidebarData: () => any = () => {
  const isOpenSidebar = ref(false)
  const frontmatter = usePageFrontmatter()
  const sidebarItems = useSidebarItems()
  const pageHeaders = usePageHeaders()

  const isShowSidebar = computed(
    () => sidebarItems.value.length > 0 && isOpenSidebar
  )
  const isShowHeaders = computed(
    () => pageHeaders.value.length > 0 && frontmatter.value.home !== true
  )

  const toggleSidebar = (to: boolean): void => {
    isOpenSidebar.value = typeof to === 'boolean' ? to : !isOpenSidebar.value
  }

  return { isOpenSidebar, isShowSidebar, isShowHeaders, toggleSidebar }
}
