import { computed } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { useSidebarItems, usePageHeaders } from './index'

export const useSidebarData: () => any = () => {
  const frontmatter = usePageFrontmatter()
  const sidebarItems = useSidebarItems()
  const pageHeaders = usePageHeaders()

  const isShowSidebar = computed(() => sidebarItems.value.length > 0)
  const isShowHeaders = computed(
    () => pageHeaders.value.length > 0 && frontmatter.value.home !== true
  )

  return { isShowSidebar, isShowHeaders }
}
