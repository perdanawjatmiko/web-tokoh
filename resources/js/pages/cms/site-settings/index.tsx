import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { CmsDataTable } from '@/components/cms/data-table';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Paginated, SiteSetting } from '@/types';

export default function SiteSettingsIndex({ settings }: { settings: Paginated<SiteSetting> }) {
    return (
        <>
            <Head title="Setting Website" />
            <CmsPageHeader title="Setting Website" description="Kelola konfigurasi umum website yang bisa dipakai frontend." createHref="/cms/site-settings/create" />
            <div className="p-4">
                <CmsDataTable
                    data={settings.data}
                    footer={<Pagination page={settings} />}
                    columns={[
                        { header: 'Label', cell: (setting) => <span className="font-medium">{setting.label}</span> },
                        { header: 'Key', cell: (setting) => setting.key },
                        { header: 'Group', cell: (setting) => <Badge variant="outline">{setting.group}</Badge> },
                        { header: 'Type', cell: (setting) => setting.type },
                        { header: 'Public', cell: (setting) => <Badge variant={setting.is_public ? 'default' : 'secondary'}>{setting.is_public ? 'Ya' : 'Tidak'}</Badge> },
                        {
                            header: 'Aksi',
                            className: 'w-28',
                            cell: (setting) => (
                                <div className="flex gap-1">
                                    <Button asChild size="sm" variant="ghost"><Link href={`/cms/site-settings/${setting.id}/edit`}><Edit className="size-4" /></Link></Button>
                                    <Button size="sm" variant="ghost" onClick={() => confirm('Hapus setting ini?') && router.delete(`/cms/site-settings/${setting.id}`)}><Trash2 className="size-4" /></Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
}

SiteSettingsIndex.layout = { breadcrumbs: [{ title: 'Setting Website', href: '/cms/site-settings' }] };
