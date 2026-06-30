import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, NativeSelect, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { SeoPanel } from '@/components/cms/seo-panel';
import { TagsInput } from '@/components/cms/tags-input';
import { Button } from '@/components/ui/button';
import type { Article, Category, Tag } from '@/types';

export default function ArticleForm({ article, categories, tags }: { article: Article | null; categories: Category[]; tags: Tag[] }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        _method: article ? 'put' : 'post',
        title: article?.title ?? '',
        slug: article?.slug ?? '',
        excerpt: article?.excerpt ?? '',
        content: article?.content ?? '',
        category_id: article?.category_id?.toString() ?? '',
        tag_names: article?.tags?.map((tag) => tag.name) ?? [],
        status: article?.status ?? 'draft',
        featured_image: null as File | null,
        featured_image_alt: article?.featured_image_alt ?? '',
        is_featured: article?.is_featured ?? false,
        seo_title: article?.seo_title ?? '',
        seo_description: article?.seo_description ?? '',
        seo_keywords: article?.seo_keywords ?? '',
        canonical_url: article?.canonical_url ?? '',
        robots_index: article?.robots_index ?? true,
        robots_follow: article?.robots_follow ?? true,
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        transform((values) => ({ ...values, category_id: values.category_id || null }));
        post(article ? `/cms/articles/${article.id}` : '/cms/articles', { forceFormData: true });
    }

    return (
        <>
            <Head title={article ? 'Edit Artikel' : 'Tambah Artikel'} />
            <CmsPageHeader title={article ? 'Edit Artikel' : 'Tambah Artikel'} description="Tulis konten, atur publikasi, taxonomy, gambar utama, dan SEO." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-4">
                    <CmsFormSection>
                        <Field label="Judul" error={errors.title}><TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} /></Field>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <Field label="Slug" error={errors.slug}><TextInput value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="otomatis jika kosong" /></Field>
                            <Field label="Excerpt" error={errors.excerpt}><TextInput value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} /></Field>
                        </div>
                        <div className="mt-4"><Field label="Konten" error={errors.content}><Textarea className="min-h-[360px]" value={data.content} onChange={(e) => setData('content', e.target.value)} /></Field></div>
                    </CmsFormSection>
                    <SeoPanel data={data} errors={errors} setData={(key, value) => setData(key as keyof typeof data, value as never)} />
                </div>
                <div className="space-y-4">
                    <CmsFormSection title="Publish">
                        <Field label="Status" error={errors.status}><NativeSelect value={data.status} onChange={(e) => setData('status', e.target.value as Article['status'])}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option><option value="archived">Archived</option></NativeSelect></Field>
                        <div className="mt-4"><CheckField label="Artikel unggulan" checked={data.is_featured} onChange={(checked) => setData('is_featured', checked)} /></div>
                    </CmsFormSection>
                    <CmsFormSection>
                        <Field label="Kategori" error={errors.category_id}><NativeSelect value={data.category_id} onChange={(e) => setData('category_id', e.target.value)}><option value="">Tanpa kategori</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</NativeSelect></Field>
                        <div className="mt-4">
                            <Field label="Tag" error={errors.tag_names}>
                                <TagsInput availableTags={tags} value={data.tag_names} onChange={(nextTags) => setData('tag_names', nextTags)} />
                            </Field>
                        </div>
                    </CmsFormSection>
                    <CmsFormSection title="Featured image">
                        <Field label="Featured image" error={errors.featured_image}><TextInput type="file" accept="image/*" onChange={(e) => setData('featured_image', e.target.files?.[0] ?? null)} /></Field>
                        {article?.featured_image_thumb ? <img src={`/storage/${article.featured_image_thumb}`} className="mt-3 aspect-video w-full rounded-md object-cover" /> : null}
                        <div className="mt-4"><Field label="Alt text" error={errors.featured_image_alt}><TextInput value={data.featured_image_alt} onChange={(e) => setData('featured_image_alt', e.target.value)} /></Field></div>
                    </CmsFormSection>
                    <div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/articles">Batal</Link></Button></div>
                </div>
            </form>
        </>
    );
}

ArticleForm.layout = { breadcrumbs: [{ title: 'Artikel', href: '/cms/articles' }] };
