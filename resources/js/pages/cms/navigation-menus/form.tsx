import { Head, Link, useForm } from '@inertiajs/react';
import { CheckField, Field, NativeSelect, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsFormSection } from '@/components/cms/form-section';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Button } from '@/components/ui/button';
import type { NavigationMenu } from '@/types';

type Parent = { id: number; label: string };

export default function NavigationMenuForm({ menu, parents }: { menu: NavigationMenu | null; parents: Parent[] }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        _method: menu ? 'put' : 'post',
        parent_id: menu?.parent_id?.toString() ?? '',
        label: menu?.label ?? '',
        slug: menu?.slug ?? '',
        url: menu?.url ?? '',
        type: menu?.type ?? 'custom',
        location: menu?.location ?? 'header',
        target: menu?.target ?? '_self',
        icon: menu?.icon ?? '',
        css_class: menu?.css_class ?? '',
        seo_title: menu?.seo_title ?? '',
        seo_description: menu?.seo_description ?? '',
        rel_attribute: menu?.rel_attribute ?? '',
        is_active: menu?.is_active ?? true,
        sort_order: menu?.sort_order ?? 0,
    });
    const submit = (e: React.FormEvent) => {
 e.preventDefault(); transform((v) => ({ ...v, parent_id: v.parent_id || null })); post(menu ? `/cms/navigation-menus/${menu.id}` : '/cms/navigation-menus'); 
};

    return (
        <>
            <Head title={menu ? 'Edit Menu' : 'Tambah Menu'} />
            <CmsPageHeader title={menu ? 'Edit Menu Navigasi' : 'Tambah Menu Navigasi'} description="Atur menu header, footer, sidebar, atau mobile." />
            <form onSubmit={submit} className="grid gap-4 p-4 lg:grid-cols-2">
                <CmsFormSection>
                    <Field label="Label" error={errors.label}><TextInput value={data.label} onChange={(e) => setData('label', e.target.value)} /></Field>
                    <Field label="URL" error={errors.url}><TextInput value={data.url} onChange={(e) => setData('url', e.target.value)} /></Field>
                    <div className="grid gap-4 md:grid-cols-2"><Field label="Type" error={errors.type}><NativeSelect value={data.type} onChange={(e) => setData('type', e.target.value)}><option value="custom">Custom</option><option value="page">Page</option><option value="article">Article</option><option value="category">Category</option><option value="external">External</option></NativeSelect></Field><Field label="Location" error={errors.location}><NativeSelect value={data.location} onChange={(e) => setData('location', e.target.value)}><option value="header">Header</option><option value="footer">Footer</option><option value="sidebar">Sidebar</option><option value="mobile">Mobile</option></NativeSelect></Field></div>
                    <div className="grid gap-4 md:grid-cols-2"><Field label="Target" error={errors.target}><NativeSelect value={data.target} onChange={(e) => setData('target', e.target.value)}><option value="_self">Same tab</option><option value="_blank">New tab</option></NativeSelect></Field><Field label="Parent" error={errors.parent_id}><NativeSelect value={data.parent_id} onChange={(e) => setData('parent_id', e.target.value)}><option value="">Tidak ada</option>{parents.map((parent) => <option key={parent.id} value={parent.id}>{parent.label}</option>)}</NativeSelect></Field></div>
                    <div className="grid gap-4 md:grid-cols-2"><Field label="Icon" error={errors.icon}><TextInput value={data.icon} onChange={(e) => setData('icon', e.target.value)} /></Field><Field label="CSS class" error={errors.css_class}><TextInput value={data.css_class} onChange={(e) => setData('css_class', e.target.value)} /></Field></div>
                    <Field label="Urutan" error={errors.sort_order}><TextInput type="number" value={data.sort_order} onChange={(e) => setData('sort_order', Number(e.target.value))} /></Field>
                    <CheckField label="Aktif" checked={data.is_active} onChange={(checked) => setData('is_active', checked)} />
                </CmsFormSection>
                <CmsFormSection>
                    <Field label="SEO title" error={errors.seo_title}><TextInput value={data.seo_title} onChange={(e) => setData('seo_title', e.target.value)} /></Field>
                    <Field label="SEO description" error={errors.seo_description}><Textarea value={data.seo_description} onChange={(e) => setData('seo_description', e.target.value)} /></Field>
                    <Field label="Rel attribute" error={errors.rel_attribute}><TextInput value={data.rel_attribute} onChange={(e) => setData('rel_attribute', e.target.value)} placeholder="nofollow noopener" /></Field>
                    <div className="flex gap-2"><Button disabled={processing}>Simpan</Button><Button asChild variant="outline"><Link href="/cms/navigation-menus">Batal</Link></Button></div>
                </CmsFormSection>
            </form>
        </>
    );
}

NavigationMenuForm.layout = { breadcrumbs: [{ title: 'Menu Navigasi', href: '/cms/navigation-menus' }] };
