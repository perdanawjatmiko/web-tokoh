import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Paginated, WebsiteTemplate } from '@/types';

export default function TemplatesIndex({ templates }: { templates: Paginated<WebsiteTemplate> }) {
    return (
        <>
            <Head title="Template Website" />
            <CmsPageHeader title="Template Website" description="Kelola pilihan template yang nanti bisa diganti sesuai kebutuhan." createHref="/cms/templates/create" />
            <div className="grid gap-4 p-4 md:grid-cols-3">
                {templates.data.map((template) => (
                    <Card key={template.id}>
                        <CardHeader className="grid-cols-[1fr_auto]">
                            <div>
                                <CardTitle>{template.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{template.slug}</p>
                            </div>
                            <Badge variant={template.is_active ? 'default' : 'secondary'}>{template.is_active ? 'Aktif' : 'Nonaktif'}</Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="min-h-10 text-sm text-muted-foreground">{template.description}</p>
                        </CardContent>
                        <CardFooter className="gap-1">
                            <Button asChild size="sm" variant="ghost"><Link href={`/cms/templates/${template.id}/edit`}><Edit className="size-4" /></Link></Button>
                            <Button size="sm" variant="ghost" onClick={() => confirm('Hapus template ini?') && router.delete(`/cms/templates/${template.id}`)}><Trash2 className="size-4" /></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Pagination page={templates} />
        </>
    );
}

TemplatesIndex.layout = { breadcrumbs: [{ title: 'Template', href: '/cms/templates' }] };
