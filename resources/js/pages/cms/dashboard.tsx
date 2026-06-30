import { Head, Link } from '@inertiajs/react';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Article } from '@/types';

export default function CmsDashboard({ stats, recentArticles }: { stats: Record<string, number>; recentArticles: Article[] }) {
    const cards = [
        ['Artikel', stats.articles, '/cms/articles'],
        ['Kategori', stats.categories, '/cms/categories'],
        ['Tag', stats.tags, '/cms/tags'],
        ['Menu', stats.menus, '/cms/navigation-menus'],
        ['Galeri', stats.gallery, '/cms/gallery'],
        ['SEO', stats.seo, '/cms/seo'],
        ['Setting', stats.settings, '/cms/site-settings'],
        ['Template', stats.templates, '/cms/templates'],
    ];

    return (
        <>
            <Head title="CMS" />
            <CmsPageHeader title="CMS" description="Panel pengelolaan konten, navigasi, media, SEO, setting, dan template website." />
            <div className="grid gap-4 p-4 md:grid-cols-4">
                {cards.map(([label, value, href]) => (
                    <Link key={label} href={href as string}>
                        <Card className="transition-colors hover:bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-muted-foreground">{label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-semibold">{value}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            <div className="p-4">
                <Card className="py-0">
                    <CardHeader className="border-b py-4">
                        <CardTitle>Artikel Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {recentArticles.map((article) => (
                            <Link key={article.id} href={`/cms/articles/${article.id}/edit`} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/50">
                                <span>{article.title}</span>
                                <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>{article.status}</Badge>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CmsDashboard.layout = { breadcrumbs: [{ title: 'CMS', href: '/cms' }] };
