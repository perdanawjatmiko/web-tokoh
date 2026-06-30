import { CheckField, Field, TextInput, Textarea } from '@/components/cms/form-controls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SeoData = Record<string, unknown>;

export function SeoPanel({
    data,
    errors,
    setData,
    descriptionName = 'seo_description',
}: {
    data: SeoData;
    errors: Partial<Record<string, string>>;
    setData: (key: string, value: string | boolean) => void;
    descriptionName?: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>SEO</CardTitle>
                <p className="text-sm text-muted-foreground">Metadata untuk search engine dan social sharing.</p>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Field label="SEO title" error={errors.seo_title ?? errors.meta_title}>
                    <TextInput
                        value={(data.seo_title ?? data.meta_title ?? '') as string}
                        onChange={(event) => setData(data.meta_title !== undefined ? 'meta_title' : 'seo_title', event.target.value)}
                        maxLength={255}
                    />
                </Field>
                <Field label="SEO description" error={errors[descriptionName] ?? errors.meta_description}>
                    <Textarea
                        value={(data[descriptionName] ?? data.meta_description ?? '') as string}
                        onChange={(event) => setData(data.meta_description !== undefined ? 'meta_description' : descriptionName, event.target.value)}
                        maxLength={500}
                    />
                </Field>
                <Field label="Keywords" error={errors.seo_keywords ?? errors.meta_keywords}>
                    <TextInput
                        value={(data.seo_keywords ?? data.meta_keywords ?? '') as string}
                        onChange={(event) => setData(data.meta_keywords !== undefined ? 'meta_keywords' : 'seo_keywords', event.target.value)}
                    />
                </Field>
                {'canonical_url' in data ? (
                    <Field label="Canonical URL" error={errors.canonical_url}>
                        <TextInput value={(data.canonical_url ?? '') as string} onChange={(event) => setData('canonical_url', event.target.value)} />
                    </Field>
                ) : null}
                {'robots_index' in data ? (
                    <div className="flex flex-wrap gap-4">
                        <CheckField label="Index" checked={Boolean(data.robots_index)} onChange={(checked) => setData('robots_index', checked)} />
                        <CheckField label="Follow" checked={Boolean(data.robots_follow)} onChange={(checked) => setData('robots_follow', checked)} />
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}
