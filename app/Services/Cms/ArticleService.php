<?php

namespace App\Services\Cms;

use App\Models\Article;
use App\Models\Tag;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArticleService
{
    public function __construct(private readonly ImageOptimizationService $images) {}

    public function create(array $data, ?UploadedFile $image = null): Article
    {
        return DB::transaction(function () use ($data, $image): Article {
            $tagIds = $data['tag_ids'] ?? [];
            $tagNames = $data['tag_names'] ?? [];
            unset($data['tag_ids'], $data['tag_names']);

            if ($image) {
                $stored = $this->images->store($image, 'articles', $data['title']);
                $data['featured_image'] = $stored['path'];
                $data['featured_image_thumb'] = $stored['thumbnail_path'];
            }

            if (($data['status'] ?? null) === 'published' && empty($data['published_at'])) {
                $data['published_at'] = now();
            }

            $article = Article::create($data);
            $article->tags()->sync($this->resolveTagIds($tagIds, $tagNames));

            return $article;
        });
    }

    public function update(Article $article, array $data, ?UploadedFile $image = null): Article
    {
        return DB::transaction(function () use ($article, $data, $image): Article {
            $tagIds = $data['tag_ids'] ?? [];
            $tagNames = $data['tag_names'] ?? [];
            unset($data['tag_ids'], $data['tag_names']);

            if ($image) {
                $this->images->delete($article->featured_image);
                $this->images->delete($article->featured_image_thumb);

                $stored = $this->images->store($image, 'articles', $data['title']);
                $data['featured_image'] = $stored['path'];
                $data['featured_image_thumb'] = $stored['thumbnail_path'];
            }

            if (($data['status'] ?? null) === 'published' && empty($data['published_at']) && ! $article->published_at) {
                $data['published_at'] = now();
            }

            $article->update($data);
            $article->tags()->sync($this->resolveTagIds($tagIds, $tagNames));

            return $article;
        });
    }

    public function delete(Article $article): void
    {
        $this->images->delete($article->featured_image);
        $this->images->delete($article->featured_image_thumb);
        $article->delete();
    }

    private function resolveTagIds(array $tagIds, array $tagNames): array
    {
        $ids = collect($tagIds)
            ->filter()
            ->map(fn ($id): int => (int) $id);

        $nameIds = collect($tagNames)
            ->map(fn ($name): string => trim((string) $name))
            ->filter()
            ->unique(fn (string $name): string => Str::lower($name))
            ->map(function (string $name): int {
                return Tag::firstOrCreate(
                    ['slug' => Str::slug($name)],
                    ['name' => $name, 'is_active' => true],
                )->id;
            });

        return $ids->merge($nameIds)->unique()->values()->all();
    }
}
