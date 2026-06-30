import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { CmsDataTable } from '@/components/cms/data-table';
import { NativeSelect } from '@/components/cms/form-controls';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Article, Category, Paginated } from '@/types';

export default function ArticlesIndex({ articles, categories }: { articles: Paginated<Article>; categories: Category[] }) {
    return (
        <>
            <Head title="Artikel" />
            <CmsPageHeader title="Artikel" description="Kelola tulisan utama dengan layout editorial ala WordPress." createHref="/cms/articles/create" />
            <div className="p-4">
                <div className="mb-4 flex gap-2">
                    <Input className="max-w-sm" placeholder="Cari artikel..." onChange={(e) => router.get('/cms/articles', { search: e.target.value }, { preserveState: true, replace: true })} />
                    <NativeSelect className="max-w-48" onChange={(e) => router.get('/cms/articles', { category_id: e.target.value }, { preserveState: true, replace: true })}>
                        <option value="">Semua kategori</option>
                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </NativeSelect>
                </div>
                <CmsDataTable
                    data={articles.data}
                    footer={<Pagination page={articles} />}
                    columns={[
                        { header: 'Judul', cell: (article) => <span className="font-medium">{article.title}</span> },
                        { header: 'Kategori', cell: (article) => article.category?.name ?? '-' },
                        { header: 'Status', cell: (article) => <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>{article.status}</Badge> },
                        { header: 'SEO', cell: (article) => <Badge variant={article.seo_title ? 'default' : 'outline'}>{article.seo_title ? 'Siap' : 'Belum'}</Badge> },
                        {
                            header: 'Aksi',
                            className: 'w-28',
                            cell: (article) => (
                                <div className="flex gap-1">
                                    <Button asChild size="sm" variant="ghost"><Link href={`/cms/articles/${article.id}/edit`}><Edit className="size-4" /></Link></Button>
                                    <Button size="sm" variant="ghost" onClick={() => confirm('Hapus artikel ini?') && router.delete(`/cms/articles/${article.id}`)}><Trash2 className="size-4" /></Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
}

ArticlesIndex.layout = { breadcrumbs: [{ title: 'Artikel', href: '/cms/articles' }] };
