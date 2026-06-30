import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CmsFormSection({
    title,
    children,
}: {
    title?: string;
    children: ReactNode;
}) {
    return (
        <Card>
            {title ? (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            ) : null}
            <CardContent className="space-y-4">{children}</CardContent>
        </Card>
    );
}
