import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { CmsDataTable } from '@/components/cms/data-table';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Paginated, Tag } from '@/types';

export default function TagsIndex({ tags }: { tags: Paginated<Tag> }) {
    return (
        <>
            <Head title="Tag" />
            <CmsPageHeader title="Tag" description="Kelola label topik artikel dan metadata SEO." createHref="/cms/tags/create" />
            <div className="p-4">
                <CmsDataTable
                    data={tags.data}
                    footer={<Pagination page={tags} />}
                    columns={[
                        { header: 'Nama', cell: (tag) => <span className="font-medium">{tag.name}</span> },
                        { header: 'Slug', cell: (tag) => tag.slug },
                        { header: 'Artikel', cell: (tag) => tag.articles_count ?? 0 },
                        { header: 'Status', cell: (tag) => <Badge variant={tag.is_active ? 'default' : 'secondary'}>{tag.is_active ? 'Aktif' : 'Nonaktif'}</Badge> },
                        {
                            header: 'Aksi',
                            className: 'w-28',
                            cell: (tag) => (
                                <div className="flex gap-1">
                                    <Button asChild size="sm" variant="ghost"><Link href={`/cms/tags/${tag.id}/edit`}><Edit className="size-4" /></Link></Button>
                                    <Button size="sm" variant="ghost" onClick={() => confirm('Hapus tag ini?') && router.delete(`/cms/tags/${tag.id}`)}><Trash2 className="size-4" /></Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
}

TagsIndex.layout = { breadcrumbs: [{ title: 'Tag', href: '/cms/tags' }] };
