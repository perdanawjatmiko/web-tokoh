import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Button } from '@/components/ui/button';
import type { WebsiteTemplate } from '@/types';

export default function TemplateForm({ template }: { template: WebsiteTemplate | null }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: template ? 'put' : 'post',
        name: template?.name ?? '',
        slug: template?.slug ?? '',
        description: template?.description ?? '',
        preview_image: template?.preview_image ?? '',
        layout_path: template?.layout_path ?? '',
        is_active: template?.is_active ?? false,
        is_available: template?.is_available ?? true,
    });
    const submit = (e: React.FormEvent) => {
 e.preventDefault(); post(template ? `/cms/templates/${template.id}` : '/cms/templates'); 
};

    return (
        <>
            <Head title={template ? 'Edit Template' : 'Tambah Template'} />
            <CmsPageHeader title={template ? 'Edit Template Website' : 'Tambah Template Website'} description="Siapkan template yang bisa diaktifkan untuk tampilan frontend." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-2">
                <CmsFormSection>
                    <Field label="Nama" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} /></Field>
                    <Field label="Slug" error={errors.slug}><TextInput value={data.slug} onChange={(e) => setData('slug', e.target.value)} /></Field>
                    <Field label="Deskripsi" error={errors.description}><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} /></Field>
                </CmsFormSection>
                <CmsFormSection>
                    <Field label="Preview image URL" error={errors.preview_image}><TextInput value={data.preview_image} onChange={(e) => setData('preview_image', e.target.value)} /></Field>
                    <Field label="Layout path" error={errors.layout_path}><TextInput value={data.layout_path} onChange={(e) => setData('layout_path', e.target.value)} placeholder="templates/classic" /></Field>
                    <CheckField label="Aktifkan template ini" checked={data.is_active} onChange={(checked) => setData('is_active', checked)} />
                    <CheckField label="Tersedia untuk dipilih" checked={data.is_available} onChange={(checked) => setData('is_available', checked)} />
                    <div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/templates">Batal</Link></Button></div>
                </CmsFormSection>
            </form>
        </>
    );
}

TemplateForm.layout = { breadcrumbs: [{ title: 'Template', href: '/cms/templates' }] };
