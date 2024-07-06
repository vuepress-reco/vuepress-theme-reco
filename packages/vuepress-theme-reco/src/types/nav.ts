/**
 * Base nav item, displayed as text
 */
export interface MenuItem {
  text: string
  icon?: string
  ariaLabel?: string
}

/**
 * Base nav group, has nav items children
 */
export interface MenuGroup<T> extends MenuItem {
  children: T[]
}

/**
 * Props for `<NavLink>`
 */
export interface MenuLink extends MenuItem {
  link?: string
  rel?: string
  target?: string
}

export interface MenuLinkGroup extends MenuLink {
  children?: MenuLinkGroup[]
}

/**
 * Navbar types
 */
// user config
export type NavbarConfig = (MenuLink | MenuGroup<MenuLinkGroup> | string)[]

/* *
 * Series types
 */
export interface SeriesGroup
  extends MenuGroup<SeriesGroup | MenuLink | string> {}
export type SeriesConfigArray = (SeriesGroup | MenuLink | string)[]
export type SeriesConfigObject = Record<string, SeriesConfigArray>
export type SeriesConfig = SeriesConfigObject

export interface ResolvedSeriesItem extends MenuLinkGroup {
  level?: number
  collapsible?: boolean
}
