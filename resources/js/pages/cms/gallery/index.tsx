import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { GalleryItem, Paginated } from '@/types';

export default function GalleryIndex({ items }: { items: Paginated<GalleryItem> }) {
    return (
        <>
            <Head title="Galeri" />
            <CmsPageHeader title="Galeri" description="Kelola gambar yang otomatis dikompresi dan dibuatkan thumbnail." createHref="/cms/gallery/create" />
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.data.map((item) => (
                    <Card key={item.id} className="py-0">
                        <img src={`/storage/${item.thumbnail_path ?? item.image_path}`} alt={item.alt_text ?? item.title} className="aspect-video w-full object-cover" />
                        <CardHeader className="pt-3">
                            <CardTitle>{item.title}</CardTitle>
                            <div className="text-xs text-muted-foreground">{item.width ?? '-'} x {item.height ?? '-'}</div>
                        </CardHeader>
                        <CardContent className="min-h-0" />
                        <CardFooter className="gap-1">
                            <Button asChild size="sm" variant="ghost"><Link href={`/cms/gallery/${item.id}/edit`}><Edit className="size-4" /></Link></Button>
                            <Button size="sm" variant="ghost" onClick={() => confirm('Hapus gambar ini?') && router.delete(`/cms/gallery/${item.id}`)}><Trash2 className="size-4" /></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Pagination page={items} />
        </>
    );
}

GalleryIndex.layout = { breadcrumbs: [{ title: 'Galeri', href: '/cms/gallery' }] };
