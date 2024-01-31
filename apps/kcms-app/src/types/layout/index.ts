export interface MainNavItem {
  title: string
  href: string
  external?: boolean
}

export interface SidebarNavItem {
  title: string
  href?: string
  items: SidebarNavItem[]
  disabled?: boolean
}
