import {
  usePageData as _usePageData,
  usePageFrontmatter as _usePageFrontmatter,
} from 'vuepress/client'

import type {
  RecoThemePageData,
  RecoThemeNormalPageFrontmatter,
} from '../../types'
import { Ref } from 'vue'

export const usePageData = (): Ref<RecoThemePageData> => _usePageData<RecoThemePageData>()
export const usePageFrontmatter = (): Ref<RecoThemeNormalPageFrontmatter> => _usePageFrontmatter<RecoThemeNormalPageFrontmatter>()
