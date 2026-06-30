import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CmsPageHeader({
    title,
    description,
    createHref,
}: {
    title: string;
    description: string;
    createHref?: string;
}) {
    return (
        <div className="flex flex-col gap-3 border-b px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-normal">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {createHref ? (
                <Button asChild>
                    <Link href={createHref}>
                        <Plus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            ) : null}
        </div>
    );
}
