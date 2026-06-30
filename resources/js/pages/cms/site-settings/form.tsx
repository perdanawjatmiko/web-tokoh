import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, NativeSelect, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Button } from '@/components/ui/button';
import type { SiteSetting } from '@/types';

export default function SiteSettingForm({ setting }: { setting: SiteSetting | null }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: setting ? 'put' : 'post',
        group: setting?.group ?? 'general',
        key: setting?.key ?? '',
        label: setting?.label ?? '',
        value: setting?.value ?? '',
        type: setting?.type ?? 'text',
        description: setting?.description ?? '',
        is_public: setting?.is_public ?? false,
        sort_order: setting?.sort_order ?? 0,
    });
    const submit = (e: React.FormEvent) => {
 e.preventDefault(); post(setting ? `/cms/site-settings/${setting.id}` : '/cms/site-settings'); 
};

    return (
        <>
            <Head title={setting ? 'Edit Setting' : 'Tambah Setting'} />
            <CmsPageHeader title={setting ? 'Edit Setting Website' : 'Tambah Setting Website'} description="Atur konfigurasi website yang bisa dipakai frontend." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-2">
                <CmsFormSection>
                    <div className="grid gap-4 md:grid-cols-2"><Field label="Group" error={errors.group}><TextInput value={data.group} onChange={(e) => setData('group', e.target.value)} /></Field><Field label="Key" error={errors.key}><TextInput value={data.key} onChange={(e) => setData('key', e.target.value)} /></Field></div>
                    <Field label="Label" error={errors.label}><TextInput value={data.label} onChange={(e) => setData('label', e.target.value)} /></Field>
                    <Field label="Type" error={errors.type}><NativeSelect value={data.type} onChange={(e) => setData('type', e.target.value)}><option value="text">Text</option><option value="textarea">Textarea</option><option value="image">Image</option><option value="number">Number</option><option value="email">Email</option><option value="url">URL</option><option value="json">JSON</option><option value="boolean">Boolean</option></NativeSelect></Field>
                    <Field label="Value" error={errors.value}><Textarea value={data.value} onChange={(e) => setData('value', e.target.value)} /></Field>
                </CmsFormSection>
                <CmsFormSection>
                    <Field label="Deskripsi" error={errors.description}><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} /></Field>
                    <Field label="Urutan" error={errors.sort_order}><TextInput type="number" value={data.sort_order} onChange={(e) => setData('sort_order', Number(e.target.value))} /></Field>
                    <CheckField label="Public" checked={data.is_public} onChange={(checked) => setData('is_public', checked)} />
                    <div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/site-settings">Batal</Link></Button></div>
                </CmsFormSection>
            </form>
        </>
    );
}

SiteSettingForm.layout = { breadcrumbs: [{ title: 'Setting Website', href: '/cms/site-settings' }] };
