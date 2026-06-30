import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

export function useFlashToast(): void {
    const { flash } = usePage<{ flash?: { toast?: FlashToast } }>().props;
    const data = flash?.toast;

    useEffect(() => {
        if (!data) {
            return;
        }

        toast[data.type](data.message);
    }, [data]);

    useEffect(() => {
        const cleanupError = router.on('error', () => {
            toast.error('Operasi gagal. Periksa kembali data yang diisi.');
        });

        return () => {
            cleanupError();
        };
    }, []);
}
