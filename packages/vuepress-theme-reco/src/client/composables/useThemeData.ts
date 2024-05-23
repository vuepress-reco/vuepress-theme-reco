import { Ref } from 'vue'
import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'

import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'

import type { RecoThemeData } from '../../types'

export const useThemeData = (): ThemeDataRef<RecoThemeData> => _useThemeData()
export const useThemeLocaleData = (): ThemeLocaleDataRef<RecoThemeData> =>
  _useThemeLocaleData()
