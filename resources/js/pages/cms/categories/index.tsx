import { Head, router, useForm } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CmsDataTable } from '@/components/cms/data-table';
import { CheckField, Field, NativeSelect, TextInput, Textarea } from '@/components/cms/form-controls';
import { CmsPageHeader } from '@/components/cms/page-header';
import { Pagination } from '@/components/cms/pagination';
import { SeoPanel } from '@/components/cms/seo-panel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { Category, Option, Paginated } from '@/types';

type CategoryFormValues = {
    _method: 'post' | 'put';
    parent_id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    canonical_url: string;
    is_active: boolean;
    sort_order: number;
};

const emptyForm: CategoryFormValues = {
    _method: 'post',
    parent_id: '',
    name: '',
    slug: '',
    description: '',
    color: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    canonical_url: '',
    is_active: true,
    sort_order: 0,
};

export default function CategoriesIndex({
    categories,
    parents,
}: {
    categories: Paginated<Category>;
    parents: Option[];
}) {
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const { data, setData, post, processing, errors, transform, reset, clearErrors } = useForm<CategoryFormValues>(emptyForm);
    const parentOptions = useMemo(
        () => parents.filter((parent) => parent.id !== editingCategory?.id),
        [parents, editingCategory],
    );

    function openCreateDialog() {
        setEditingCategory(null);
        clearErrors();
        reset();
        setData(emptyForm);
        setOpen(true);
    }

    function openEditDialog(category: Category) {
        setEditingCategory(category);
        clearErrors();
        setData({
            _method: 'put',
            parent_id: category.parent_id?.toString() ?? '',
            name: category.name,
            slug: category.slug ?? '',
            description: category.description ?? '',
            color: category.color ?? '',
            seo_title: category.seo_title ?? '',
            seo_description: category.seo_description ?? '',
            seo_keywords: category.seo_keywords ?? '',
            canonical_url: category.canonical_url ?? '',
            is_active: category.is_active,
            sort_order: category.sort_order ?? 0,
        });
        setOpen(true);
    }

    function submit(event: React.FormEvent) {
        event.preventDefault();
        transform((values) => ({ ...values, parent_id: values.parent_id || null }));
        post(editingCategory ? `/cms/categories/${editingCategory.id}` : '/cms/categories', {
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <>
            <Head title="Kategori" />
            <CmsPageHeader title="Kategori" description="Kelola struktur kategori artikel beserta metadata SEO." />
            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Button onClick={openCreateDialog}>
                        <Plus className="size-4" />
                        Tambah
                    </Button>
                </div>
                <CmsDataTable
                    data={categories.data}
                    footer={<Pagination page={categories} />}
                    columns={[
                        { header: 'Nama', cell: (category) => <span className="font-medium">{category.name}</span> },
                        { header: 'Slug', cell: (category) => category.slug },
                        { header: 'Artikel', cell: (category) => category.articles_count ?? 0 },
                        { header: 'Status', cell: (category) => <Badge variant={category.is_active ? 'default' : 'secondary'}>{category.is_active ? 'Aktif' : 'Nonaktif'}</Badge> },
                        {
                            header: 'Aksi',
                            className: 'w-28',
                            cell: (category) => (
                                <div className="flex gap-1">
                                    <Button size="sm" variant="ghost" onClick={() => openEditDialog(category)}><Edit className="size-4" /></Button>
                                    <Button size="sm" variant="ghost" onClick={() => confirm('Hapus kategori ini?') && router.delete(`/cms/categories/${category.id}`)}><Trash2 className="size-4" /></Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-md sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}</DialogTitle>
                        <DialogDescription>Atur kategori artikel dan metadata SEO.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="grid gap-4 lg:grid-cols-2">
                        <div className="space-y-4">
                            <Field label="Nama" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} /></Field>
                            <Field label="Slug" error={errors.slug}><TextInput value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="otomatis jika kosong" /></Field>
                            <Field label="Parent" error={errors.parent_id}><NativeSelect value={data.parent_id} onChange={(e) => setData('parent_id', e.target.value)}><option value="">Tidak ada</option>{parentOptions.map((parent) => <option key={parent.id} value={parent.id}>{parent.name}</option>)}</NativeSelect></Field>
                            <Field label="Deskripsi" error={errors.description}><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} /></Field>
                            <div className="grid gap-4 md:grid-cols-2"><Field label="Warna" error={errors.color}><TextInput value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="#0f766e" /></Field><Field label="Urutan" error={errors.sort_order}><TextInput type="number" value={data.sort_order} onChange={(e) => setData('sort_order', Number(e.target.value))} /></Field></div>
                            <CheckField label="Aktif" checked={data.is_active} onChange={(checked) => setData('is_active', checked)} />
                        </div>
                        <SeoPanel data={data} errors={errors} setData={(key, value) => setData(key as keyof typeof data, value as never)} />
                        <DialogFooter className="lg:col-span-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                            <Button disabled={processing}>Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

CategoriesIndex.layout = { breadcrumbs: [{ title: 'Kategori', href: '/cms/categories' }] };
