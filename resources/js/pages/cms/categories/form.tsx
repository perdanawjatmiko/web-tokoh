import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, NativeSelect, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { SeoPanel } from '@/components/cms/seo-panel';
import { Button } from '@/components/ui/button';
import type { Category, Option } from '@/types';

export default function CategoryForm({ category, parents }: { category: Category | null; parents: Option[] }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        _method: category ? 'put' : 'post',
        parent_id: category?.parent_id?.toString() ?? '',
        name: category?.name ?? '',
        slug: category?.slug ?? '',
        description: category?.description ?? '',
        color: category?.color ?? '',
        seo_title: category?.seo_title ?? '',
        seo_description: category?.seo_description ?? '',
        seo_keywords: category?.seo_keywords ?? '',
        canonical_url: category?.canonical_url ?? '',
        is_active: category?.is_active ?? true,
        sort_order: category?.sort_order ?? 0,
    });
    const submit = (e: React.FormEvent) => {
 e.preventDefault(); transform((v) => ({ ...v, parent_id: v.parent_id || null })); post(category ? `/cms/categories/${category.id}` : '/cms/categories'); 
};

    return (
        <>
            <Head title={category ? 'Edit Kategori' : 'Tambah Kategori'} />
            <CmsPageHeader title={category ? 'Edit Kategori' : 'Tambah Kategori'} description="Atur kategori artikel dan metadata SEO." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-2">
                <CmsFormSection>
                    <Field label="Nama" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} /></Field>
                    <Field label="Slug" error={errors.slug}><TextInput value={data.slug} onChange={(e) => setData('slug', e.target.value)} /></Field>
                    <Field label="Parent" error={errors.parent_id}><NativeSelect value={data.parent_id} onChange={(e) => setData('parent_id', e.target.value)}><option value="">Tidak ada</option>{parents.map((parent) => <option key={parent.id} value={parent.id}>{parent.name}</option>)}</NativeSelect></Field>
                    <Field label="Deskripsi" error={errors.description}><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} /></Field>
                    <div className="grid gap-4 md:grid-cols-2"><Field label="Warna" error={errors.color}><TextInput value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="#0f766e" /></Field><Field label="Urutan" error={errors.sort_order}><TextInput type="number" value={data.sort_order} onChange={(e) => setData('sort_order', Number(e.target.value))} /></Field></div>
                    <CheckField label="Aktif" checked={data.is_active} onChange={(checked) => setData('is_active', checked)} />
                </CmsFormSection>
                <div className="space-y-4"><SeoPanel data={data} errors={errors} setData={(key, value) => setData(key as keyof typeof data, value as never)} /><div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/categories">Batal</Link></Button></div></div>
            </form>
        </>
    );
}

CategoryForm.layout = { breadcrumbs: [{ title: 'Kategori', href: '/cms/categories' }] };
