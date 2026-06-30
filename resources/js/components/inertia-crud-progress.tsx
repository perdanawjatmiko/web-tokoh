import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export function InertiaCrudProgress() {
    const [active, setActive] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const cleanupStart = router.on('start', (event) => {
            const method = ((event as CustomEvent).detail?.visit?.method ?? 'get').toLowerCase();

            if (method === 'get') {
                return;
            }

            setValue(18);
            setActive(true);
        });

        const cleanupProgress = router.on('progress', (event) => {
            const percentage = (event as CustomEvent).detail?.progress?.percentage;

            if (typeof percentage === 'number') {
                setValue(Math.max(18, Math.min(percentage, 96)));
            }
        });

        const cleanupFinish = router.on('finish', () => {
            setValue(100);
            window.setTimeout(() => {
                setActive(false);
                setValue(0);
            }, 350);
        });

        return () => {
            cleanupStart();
            cleanupProgress();
            cleanupFinish();
        };
    }, []);

    if (!active) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed top-4 left-1/2 z-[60] w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 rounded-md border bg-background/95 p-2 shadow-lg backdrop-blur">
            <Progress value={value} className="h-2" />
        </div>
    );
}
