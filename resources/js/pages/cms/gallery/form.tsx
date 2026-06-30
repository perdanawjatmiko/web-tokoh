import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Button } from '@/components/ui/button';
import type { GalleryItem } from '@/types';

export default function GalleryForm({ item }: { item: GalleryItem | null }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: item ? 'put' : 'post',
        title: item?.title ?? '',
        slug: item?.slug ?? '',
        description: item?.description ?? '',
        image: null as File | null,
        alt_text: item?.alt_text ?? '',
        caption: item?.caption ?? '',
        credit: item?.credit ?? '',
        category: item?.category ?? '',
        seo_title: item?.seo_title ?? '',
        seo_description: item?.seo_description ?? '',
        is_featured: item?.is_featured ?? false,
        is_active: item?.is_active ?? true,
        sort_order: item?.sort_order ?? 0,
    });
    const submit = (e: React.FormEvent) => {
 e.preventDefault(); post(item ? `/cms/gallery/${item.id}` : '/cms/gallery', { forceFormData: true }); 
};

    return (
        <>
            <Head title={item ? 'Edit Galeri' : 'Tambah Galeri'} />
            <CmsPageHeader title={item ? 'Edit Galeri' : 'Tambah Galeri'} description="Upload gambar akan dibuat versi webp dan thumbnail." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-2">
                <CmsFormSection>
                    <Field label="Judul" error={errors.title}><TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} /></Field>
                    <Field label="Slug" error={errors.slug}><TextInput value={data.slug} onChange={(e) => setData('slug', e.target.value)} /></Field>
                    <Field label="Gambar" error={errors.image}><TextInput type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] ?? null)} /></Field>
                    {item?.thumbnail_path ? <img src={`/storage/${item.thumbnail_path}`} className="aspect-video w-full rounded-md object-cover" /> : null}
                    <Field label="Deskripsi" error={errors.description}><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} /></Field>
                </CmsFormSection>
                <CmsFormSection>
                    <div className="grid gap-4 md:grid-cols-2"><Field label="Alt text" error={errors.alt_text}><TextInput value={data.alt_text} onChange={(e) => setData('alt_text', e.target.value)} /></Field><Field label="Kategori" error={errors.category}><TextInput value={data.category} onChange={(e) => setData('category', e.target.value)} /></Field></div>
                    <Field label="Caption" error={errors.caption}><TextInput value={data.caption} onChange={(e) => setData('caption', e.target.value)} /></Field>
                    <Field label="Credit" error={errors.credit}><TextInput value={data.credit} onChange={(e) => setData('credit', e.target.value)} /></Field>
                    <Field label="SEO title" error={errors.seo_title}><TextInput value={data.seo_title} onChange={(e) => setData('seo_title', e.target.value)} /></Field>
                    <Field label="SEO description" error={errors.seo_description}><Textarea value={data.seo_description} onChange={(e) => setData('seo_description', e.target.value)} /></Field>
                    <CheckField label="Featured" checked={data.is_featured} onChange={(checked) => setData('is_featured', checked)} /><CheckField label="Aktif" checked={data.is_active} onChange={(checked) => setData('is_active', checked)} />
                    <div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/gallery">Batal</Link></Button></div>
                </CmsFormSection>
            </form>
        </>
    );
}

GalleryForm.layout = { breadcrumbs: [{ title: 'Galeri', href: '/cms/gallery' }] };
