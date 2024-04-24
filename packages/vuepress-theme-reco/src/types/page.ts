import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { NavLink } from './nav.js'

export interface HeaderItem {
  slug: string
  link: string
  level: number
  title: string
  children: Array<HeaderItem>
}

export interface RecoThemePageData extends GitPluginPageData {
  filePathRelative: string | null
  headers: Array<HeaderItem>
  // path?: string
}

export interface SocialLink {
  icon: string
  link?: string
  color?: string
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
  icon?: string
  text?: string
  link?: string
  type?: 'plain' | 'link'
}

interface BannerBrand {
  title?: string
  description?: string
  tagline?: string
  buttons?: Button[]
  socialLinks?: SocialLink[]
  heroImage?: string
  heroImageStyle?: Record<string, any>
  bgImage?: string
  bgImageStyle?: Record<string, any>
  [key: string]: any
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
