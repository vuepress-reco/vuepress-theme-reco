import { Ref } from 'vue'
import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type { RecoThemePageData } from '../../types'

export const useThemeData = (): Ref<RecoThemePageData> =>
  _useThemeData()
export const useThemeLocaleData = (): Ref<RecoThemePageData> =>
  _useThemeLocaleData()

