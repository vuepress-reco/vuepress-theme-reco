import { useThemeData as _useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import type { ThemeDataRef } from '@vuepress/plugin-theme-data/lib/client'
import type { DefaultThemeData } from '../../types'

export const useThemeData = (): ThemeDataRef<DefaultThemeData> =>
  _useThemeData<DefaultThemeData>()
