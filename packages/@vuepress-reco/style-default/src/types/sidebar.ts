export interface ResolvedSidebarItem extends Partial<NavLink> {
  isGroup?: boolean
  children?: ResolvedSidebarItem[]
}
