<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\ArticleRequest;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Services\Cms\ArticleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function __construct(private readonly ArticleService $articles) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/articles/index', [
            'filters' => $request->only(['search', 'status', 'category_id']),
            'articles' => Article::with(['category:id,name', 'tags:id,name'])
                ->when($request->search, fn ($query, $search) => $query->where('title', 'like', "%{$search}%"))
                ->when($request->status, fn ($query, $status) => $query->where('status', $status))
                ->when($request->category_id, fn ($query, $categoryId) => $query->where('category_id', $categoryId))
                ->latest()
                ->paginate(12)
                ->withQueryString(),
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cms/articles/form', [
            'article' => null,
            ...$this->formOptions(),
        ]);
    }

    public function store(ArticleRequest $request): RedirectResponse
    {
        $this->articles->create([
            ...$request->validated(),
            'user_id' => $request->user()?->id,
        ], $request->file('featured_image'));

        return to_route('cms.articles.index')->with('success', 'Artikel berhasil dibuat.');
    }

    public function edit(Article $article): Response
    {
        $article->load('tags:id,name');

        return Inertia::render('cms/articles/form', [
            'article' => [
                ...$article->toArray(),
                'tag_ids' => $article->tags->pluck('id')->all(),
            ],
            ...$this->formOptions(),
        ]);
    }

    public function update(ArticleRequest $request, Article $article): RedirectResponse
    {
        $this->articles->update($article, $request->validated(), $request->file('featured_image'));

        return to_route('cms.articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $this->articles->delete($article);

        return back()->with('success', 'Artikel berhasil dihapus.');
    }

    private function formOptions(): array
    {
        return [
            'categories' => Category::active()->orderBy('name')->get(['id', 'name']),
            'tags' => Tag::active()->orderBy('name')->get(['id', 'name']),
        ];
    }
}
