import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FileText,
    FolderGit2,
    FolderTree,
    Image,
    LayoutDashboard,
    Menu,
    Search,
    Settings,
    Tags,
    Wallpaper,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavGroup, NavItem } from '@/types';

const navGroups: NavGroup[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Dashboard CMS',
                href: '/cms',
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: 'Konten',
        items: [
            {
                title: 'Artikel',
                href: '/cms/articles',
                icon: FileText,
            },
            {
                title: 'Kategori',
                href: '/cms/categories',
                icon: FolderTree,
            },
            {
                title: 'Tag',
                href: '/cms/tags',
                icon: Tags,
            },
            {
                title: 'Galeri',
                href: '/cms/gallery',
                icon: Image,
            },
        ],
    },
    {
        title: 'Struktur',
        items: [
            {
                title: 'Menu Navigasi',
                href: '/cms/navigation-menus',
                icon: Menu,
            },
            {
                title: 'Template',
                href: '/cms/templates',
                icon: Wallpaper,
            },
        ],
    },
    {
        title: 'Konfigurasi',
        items: [
            {
                title: 'SEO',
                href: '/cms/seo',
                icon: Search,
            },
            {
                title: 'Setting Website',
                href: '/cms/site-settings',
                icon: Settings,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={navGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
