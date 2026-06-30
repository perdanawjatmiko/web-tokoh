<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\TagRequest;
use App\Models\Tag;
use App\Services\Cms\TagService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function __construct(private readonly TagService $tags) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/tags/index', [
            'filters' => $request->only('search'),
            'tags' => Tag::withCount('articles')
                ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
                ->orderBy('name')
                ->paginate(15)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cms/tags/form', ['tag' => null]);
    }

    public function store(TagRequest $request): RedirectResponse
    {
        $this->tags->create($request->validated());

        return to_route('cms.tags.index')->with('success', 'Tag berhasil dibuat.');
    }

    public function edit(Tag $tag): Response
    {
        return Inertia::render('cms/tags/form', ['tag' => $tag]);
    }

    public function update(TagRequest $request, Tag $tag): RedirectResponse
    {
        $this->tags->update($tag, $request->validated());

        return to_route('cms.tags.index')->with('success', 'Tag berhasil diperbarui.');
    }

    public function destroy(Tag $tag): RedirectResponse
    {
        $this->tags->delete($tag);

        return back()->with('success', 'Tag berhasil dihapus.');
    }
}
