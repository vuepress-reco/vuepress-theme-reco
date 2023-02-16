/**
 * Base nav item, displayed as text
 */
export interface NavItem {
  text: string
  ariaLabel?: string
}

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends NavItem {
  children: T[]
}

/**
 * Props for `<NavLink>`
 */
export interface NavLink extends NavItem {
  link: string
  icon?: string
  rel?: string
  target?: string
}

/**
 * Navbar types
 */
// user config
export type NavbarItem = NavLink
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[]
// resolved
export type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>

/**
 * Series types
 */
// user config
export interface SeriesItem
  extends NavLink,
    NavGroup<NavLink | SeriesItem | string> {
  isGroup?: false
}
export interface SeriesGroup
  extends NavGroup<SeriesGroup | NavLink | SeriesItem | string> {
  isGroup: true
}
export type SeriesConfigArray = (SeriesGroup | SeriesItem | string)[]
export type SeriesConfigObject = Record<string, SeriesConfigArray>
// 暂时去掉 SeriesConfigArray
// export type SeriesConfig = SeriesConfigArray | SeriesConfigObject
export type SeriesConfig = SeriesConfigObject
// resolved
export interface ResolvedSeriesItem extends Partial<NavLink> {
  level?: number
  isGroup?: boolean
  children?: ResolvedSeriesItem[]
}
