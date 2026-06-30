import { X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Tag } from '@/types';

export function TagsInput({
    availableTags,
    value,
    onChange,
}: {
    availableTags: Tag[];
    value: string[];
    onChange: (tags: string[]) => void;
}) {
    const [input, setInput] = useState('');
    const normalizedValue = useMemo(
        () => value.map((tag) => tag.toLowerCase()),
        [value],
    );
    const suggestions = availableTags
        .filter((tag) => !normalizedValue.includes(tag.name.toLowerCase()))
        .filter((tag) =>
            input.trim()
                ? tag.name.toLowerCase().includes(input.trim().toLowerCase())
                : true,
        )
        .slice(0, 8);

    function addTags(rawValue: string) {
        const nextTags = rawValue
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        if (!nextTags.length) {
            return;
        }

        const merged = [...value];

        nextTags.forEach((tag) => {
            if (!merged.some((item) => item.toLowerCase() === tag.toLowerCase())) {
                merged.push(tag);
            }
        });

        onChange(merged);
        setInput('');
    }

    function removeTag(tag: string) {
        onChange(value.filter((item) => item !== tag));
    }

    return (
        <div className="space-y-2">
            <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-md border bg-background px-2 py-1.5 shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                {value.map((tag) => (
                    <Badge key={tag} variant="secondary" className="h-7 rounded-md pr-1">
                        {tag}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="size-5"
                            onClick={() => removeTag(tag)}
                        >
                            <X className="size-3" />
                            <span className="sr-only">Hapus {tag}</span>
                        </Button>
                    </Badge>
                ))}
                <Input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onBlur={() => addTags(input)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ',') {
                            event.preventDefault();
                            addTags(input);
                        }

                        if (event.key === 'Backspace' && !input && value.length) {
                            removeTag(value[value.length - 1]);
                        }
                    }}
                    placeholder="Tambah tag..."
                    className="h-7 min-w-32 flex-1 border-0 px-1 shadow-none focus-visible:ring-0"
                />
            </div>
            {suggestions.length ? (
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((tag) => (
                        <Button
                            key={tag.id}
                            type="button"
                            variant="outline"
                            size="sm"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => addTags(tag.name)}
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
