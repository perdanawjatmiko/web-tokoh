import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { SeoPanel } from '@/components/cms/seo-panel';
import { Button } from '@/components/ui/button';
import type { Tag } from '@/types';

export default function TagForm({ tag }: { tag: Tag | null }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: tag ? 'put' : 'post',
        name: tag?.name ?? '',
        slug: tag?.slug ?? '',
        description: tag?.description ?? '',
        seo_title: tag?.seo_title ?? '',
        seo_description: tag?.seo_description ?? '',
        seo_keywords: tag?.seo_keywords ?? '',
        is_active: tag?.is_active ?? true,
    });
    const submit = (e: React.FormEvent) => {
 e.preventDefault(); post(tag ? `/cms/tags/${tag.id}` : '/cms/tags'); 
};

    return (
        <>
            <Head title={tag ? 'Edit Tag' : 'Tambah Tag'} />
            <CmsPageHeader title={tag ? 'Edit Tag' : 'Tambah Tag'} description="Atur tag/topik artikel." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-2">
                <CmsFormSection>
                    <Field label="Nama" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} /></Field>
                    <Field label="Slug" error={errors.slug}><TextInput value={data.slug} onChange={(e) => setData('slug', e.target.value)} /></Field>
                    <Field label="Deskripsi" error={errors.description}><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} /></Field>
                    <CheckField label="Aktif" checked={data.is_active} onChange={(checked) => setData('is_active', checked)} />
                </CmsFormSection>
                <div className="space-y-4"><SeoPanel data={data} errors={errors} setData={(key, value) => setData(key as keyof typeof data, value as never)} /><div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/tags">Batal</Link></Button></div></div>
            </form>
        </>
    );
}

TagForm.layout = { breadcrumbs: [{ title: 'Tag', href: '/cms/tags' }] };
