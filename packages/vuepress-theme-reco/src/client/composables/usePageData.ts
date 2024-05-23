import {
  usePageData as _usePageData,
  usePageFrontmatter as _usePageFrontmatter,
} from 'vuepress/client'

import {
  PageDataRef,
  PageFrontmatterRef,
} from 'vuepress/client'

import type {
  RecoThemePageData,
  RecoThemeNormalPageFrontmatter,
} from '../../types'

export const usePageData = (): PageDataRef<RecoThemePageData> => _usePageData<RecoThemePageData>()
export const usePageFrontmatter = (): PageFrontmatterRef<RecoThemeNormalPageFrontmatter> => _usePageFrontmatter<RecoThemeNormalPageFrontmatter>()
