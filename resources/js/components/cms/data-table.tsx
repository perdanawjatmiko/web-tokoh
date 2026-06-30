import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export type CmsDataTableColumn<T> = {
    header: ReactNode;
    cell: (item: T) => ReactNode;
    className?: string;
};

export function CmsDataTable<T extends { id: number }>({
    columns,
    data,
    footer,
}: {
    columns: CmsDataTableColumn<T>[];
    data: T[];
    footer?: ReactNode;
}) {
    return (
        <Card className="py-0">
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={column.className}>
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column, index) => (
                                    <TableCell key={index} className={column.className}>
                                        {column.cell(item)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {footer}
            </CardContent>
        </Card>
    );
}
