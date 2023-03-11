import { Ref } from 'vue'
import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type { RecoThemeData } from '../../types'

export const useThemeData = (): Ref<RecoThemeData> => _useThemeData()
export const useThemeLocaleData = (): Ref<RecoThemeData> =>
  _useThemeLocaleData()
