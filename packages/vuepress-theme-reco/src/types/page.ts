import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { NavLink, SeriesConfig } from './nav'

export interface RecoThemePageData extends GitPluginPageData {
  filePathRelative: string | null
}

export interface RecoThemePageFrontmatter {
  home?: boolean
  pageClass?: string
}

export interface RecoThemeNormalPageFrontmatter
  extends RecoThemePageFrontmatter {
  home?: false
  editLink?: boolean
  lastUpdated?: boolean
  prev?: string | NavLink
  next?: string | NavLink
  password?: string | Array<string>
  sticky?: number
}

interface Style {
  [prop: string]: string
}

interface Banner {
  heroText?: string
  tagline?: string
  heroImage?: string
  heroImageStyle?: Style
  bgImage?: string
  bgImageStyle?: Style
}

interface Button {
  text?: string
  link?: string
  type?: 'plain' | 'link'
}

interface SocialLink {
  icon?: string
  link?: string
}

interface BannerBrand {
  title?: string
  description?: string
  tagline?: string
  buttons?: Button[]
  socialLinks?: SocialLink[]
}

interface Blog {
  socialLinks?: SocialLink[]
}

interface Footer {
  record?: string
  recordLink?: string
  cyberSecurityRecord?: string
  cyberSecurityLink?: string
  startYear?: number
}

export interface RecoThemeHomePageFrontmatter extends RecoThemePageFrontmatter {
  home: true
  modules: string[]
  banner?: Banner
  bannerBrand?: BannerBrand
  blog?: Blog
  footer?: Footer
}
