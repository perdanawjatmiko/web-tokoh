import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { CmsDataTable } from '@/components/cms/data-table';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { NavigationMenu, Paginated } from '@/types';

export default function NavigationMenusIndex({ menus }: { menus: Paginated<NavigationMenu> }) {
    return (
        <>
            <Head title="Menu Navigasi" />
            <CmsPageHeader title="Menu Navigasi" description="Kelola struktur menu dinamis per lokasi beserta atribut SEO." createHref="/cms/navigation-menus/create" />
            <div className="p-4">
                <CmsDataTable
                    data={menus.data}
                    footer={<Pagination page={menus} />}
                    columns={[
                        { header: 'Label', cell: (menu) => <span className="font-medium">{menu.label}</span> },
                        { header: 'Lokasi', cell: (menu) => <Badge variant="outline">{menu.location}</Badge> },
                        { header: 'URL', cell: (menu) => menu.url },
                        { header: 'Parent', cell: (menu) => menu.parent?.label ?? '-' },
                        { header: 'Status', cell: (menu) => <Badge variant={menu.is_active ? 'default' : 'secondary'}>{menu.is_active ? 'Aktif' : 'Nonaktif'}</Badge> },
                        {
                            header: 'Aksi',
                            className: 'w-28',
                            cell: (menu) => (
                                <div className="flex gap-1">
                                    <Button asChild size="sm" variant="ghost"><Link href={`/cms/navigation-menus/${menu.id}/edit`}><Edit className="size-4" /></Link></Button>
                                    <Button size="sm" variant="ghost" onClick={() => confirm('Hapus menu ini?') && router.delete(`/cms/navigation-menus/${menu.id}`)}><Trash2 className="size-4" /></Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
}

NavigationMenusIndex.layout = { breadcrumbs: [{ title: 'Menu Navigasi', href: '/cms/navigation-menus' }] };
