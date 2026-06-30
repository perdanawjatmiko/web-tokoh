import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, FileText, Images, LayoutDashboard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';

const features = [
    {
        title: 'Publikasi Artikel',
        description: 'Kelola tulisan, status publikasi, kategori, tag, dan SEO dari satu alur editorial.',
        icon: FileText,
    },
    {
        title: 'Galeri Tokoh',
        description: 'Simpan media penting dengan thumbnail dan metadata yang siap dipakai frontend.',
        icon: Images,
    },
    {
        title: 'SEO Terstruktur',
        description: 'Atur metadata global agar halaman tokoh lebih siap ditemukan dan dibagikan.',
        icon: Search,
    },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Website Tokoh" />
            <main className="min-h-screen bg-background text-foreground">
                <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <LayoutDashboard className="size-5" />
                        Web Tokoh
                    </Link>
                    <nav className="flex items-center gap-2">
                        {auth.user ? (
                            <Button asChild>
                                <Link href={dashboard()}>
                                    Dashboard
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href={login()}>Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={register()}>Register</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </header>

                <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">Personal publishing CMS</p>
                            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal md:text-5xl">
                                Backend rapi untuk publikasi tokoh penting.
                            </h1>
                            <p className="max-w-2xl text-base text-muted-foreground">
                                Kelola konten, media, navigasi, SEO, dan pengaturan website melalui dashboard admin yang konsisten.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild size="lg">
                                <Link href={auth.user ? dashboard() : login()}>
                                    Masuk Dashboard
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/cms">Lihat CMS</Link>
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Modul CMS</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex gap-3 rounded-md border p-3">
                                    <feature.icon className="mt-0.5 size-5 text-muted-foreground" />
                                    <div>
                                        <h2 className="font-medium">{feature.title}</h2>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    );
}
