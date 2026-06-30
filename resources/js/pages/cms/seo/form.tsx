import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { SeoPanel } from '@/components/cms/seo-panel';
import { Button } from '@/components/ui/button';
import type { SeoSetting } from '@/types';

export default function SeoForm({ setting }: { setting: SeoSetting | null }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: setting ? 'put' : 'post',
        page_key: setting?.page_key ?? '',
        page_name: setting?.page_name ?? '',
        meta_title: setting?.meta_title ?? '',
        meta_description: setting?.meta_description ?? '',
        meta_keywords: setting?.meta_keywords ?? '',
        canonical_url: setting?.canonical_url ?? '',
        og_title: setting?.og_title ?? '',
        og_description: setting?.og_description ?? '',
        og_image: setting?.og_image ?? '',
        twitter_title: setting?.twitter_title ?? '',
        twitter_description: setting?.twitter_description ?? '',
        twitter_image: setting?.twitter_image ?? '',
        schema_type: setting?.schema_type ?? 'WebPage',
        robots_index: setting?.robots_index ?? true,
        robots_follow: setting?.robots_follow ?? true,
        is_active: setting?.is_active ?? true,
    });
    const submit = (e: React.FormEvent) => {
 e.preventDefault(); post(setting ? `/cms/seo/${setting.id}` : '/cms/seo'); 
};

    return (
        <>
            <Head title={setting ? 'Edit SEO' : 'Tambah SEO'} />
            <CmsPageHeader title={setting ? 'Edit SEO Optimization' : 'Tambah SEO Optimization'} description="Atur metadata halaman, OpenGraph, Twitter card, dan robots." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-2">
                <div className="space-y-4">
                    <CmsFormSection>
                    <Field label="Page name" error={errors.page_name}><TextInput value={data.page_name} onChange={(e) => setData('page_name', e.target.value)} /></Field>
                    <Field label="Page key" error={errors.page_key}><TextInput value={data.page_key} onChange={(e) => setData('page_key', e.target.value)} placeholder="home_page" /></Field>
                    <CheckField label="Aktif" checked={data.is_active} onChange={(checked) => setData('is_active', checked)} />
                    </CmsFormSection>
                    <SeoPanel data={data} errors={errors} setData={(key, value) => setData(key as keyof typeof data, value as never)} descriptionName="meta_description" />
                </div>
                <CmsFormSection>
                    <Field label="OG title" error={errors.og_title}><TextInput value={data.og_title} onChange={(e) => setData('og_title', e.target.value)} /></Field>
                    <Field label="OG description" error={errors.og_description}><Textarea value={data.og_description} onChange={(e) => setData('og_description', e.target.value)} /></Field>
                    <Field label="OG image URL" error={errors.og_image}><TextInput value={data.og_image} onChange={(e) => setData('og_image', e.target.value)} /></Field>
                    <Field label="Twitter title" error={errors.twitter_title}><TextInput value={data.twitter_title} onChange={(e) => setData('twitter_title', e.target.value)} /></Field>
                    <Field label="Twitter description" error={errors.twitter_description}><Textarea value={data.twitter_description} onChange={(e) => setData('twitter_description', e.target.value)} /></Field>
                    <Field label="Twitter image URL" error={errors.twitter_image}><TextInput value={data.twitter_image} onChange={(e) => setData('twitter_image', e.target.value)} /></Field>
                    <Field label="Schema type" error={errors.schema_type}><TextInput value={data.schema_type} onChange={(e) => setData('schema_type', e.target.value)} /></Field>
                    <div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/seo">Batal</Link></Button></div>
                </CmsFormSection>
            </form>
        </>
    );
}

SeoForm.layout = { breadcrumbs: [{ title: 'SEO', href: '/cms/seo' }] };
