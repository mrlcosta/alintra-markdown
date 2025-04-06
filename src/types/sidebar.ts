export interface SidebarLink {
    label: string;
    path: string;
}

export interface SidebarSection {
    label: string;
    children: SidebarLink[];
}

export type SidebarItem = SidebarLink | SidebarSection;