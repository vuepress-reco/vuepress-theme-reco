import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { NavLink, SeriesConfig } from './nav'

export interface RecoThemePageData extends GitPluginPageData {
  filePathRelative: string | null
  logo?: string
  password?: string | Array<string>
  colorMode?: 'light' | 'dark'
  home?: string
}

export interface DefaultThemePageFrontmatter {
  home?: boolean
  navbar?: boolean
  pageClass?: string
}

export interface DefaultThemeHomePageFrontmatter
  extends DefaultThemePageFrontmatter {
  home: true
  heroImage?: string
  heroAlt?: string
  heroText?: string | null
  tagline?: string | null
  actions?: {
    text: string
    link: string
    type?: 'primary' | 'secondary'
  }[]
  features?: {
    title: string
    details: string
  }[]
  footer?: string
  footerHtml?: boolean
}

export interface DefaultThemeNormalPageFrontmatter
  extends DefaultThemePageFrontmatter {
  home?: false
  editLink?: boolean
  lastUpdated?: boolean
  contributors?: boolean
  series?: false | SeriesConfig
  prev?: string | NavLink
  next?: string | NavLink
}
