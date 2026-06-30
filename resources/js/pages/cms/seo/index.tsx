import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { CmsDataTable } from '@/components/cms/data-table';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Paginated, SeoSetting } from '@/types';

export default function SeoIndex({ settings }: { settings: Paginated<SeoSetting> }) {
    return (
        <>
            <Head title="SEO Optimization" />
            <CmsPageHeader title="SEO Optimization" description="Kelola metadata global untuk halaman penting website." createHref="/cms/seo/create" />
            <div className="p-4">
                <CmsDataTable
                    data={settings.data}
                    footer={<Pagination page={settings} />}
                    columns={[
                        { header: 'Halaman', cell: (setting) => <span className="font-medium">{setting.page_name}</span> },
                        { header: 'Key', cell: (setting) => setting.page_key },
                        { header: 'Title', cell: (setting) => setting.meta_title ?? '-' },
                        { header: 'Robots', cell: (setting) => <Badge variant="outline">{setting.robots_index ? 'index' : 'noindex'}, {setting.robots_follow ? 'follow' : 'nofollow'}</Badge> },
                        {
                            header: 'Aksi',
                            className: 'w-28',
                            cell: (setting) => (
                                <div className="flex gap-1">
                                    <Button asChild size="sm" variant="ghost"><Link href={`/cms/seo/${setting.id}/edit`}><Edit className="size-4" /></Link></Button>
                                    <Button size="sm" variant="ghost" onClick={() => confirm('Hapus setting SEO ini?') && router.delete(`/cms/seo/${setting.id}`)}><Trash2 className="size-4" /></Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
}

SeoIndex.layout = { breadcrumbs: [{ title: 'SEO', href: '/cms/seo' }] };
