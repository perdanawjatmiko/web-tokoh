<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\GalleryItemRequest;
use App\Models\GalleryItem;
use App\Services\Cms\GalleryItemService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryItemController extends Controller
{
    public function __construct(private readonly GalleryItemService $gallery) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/gallery/index', [
            'filters' => $request->only(['search', 'category']),
            'items' => GalleryItem::query()
                ->when($request->search, fn ($query, $search) => $query->where('title', 'like', "%{$search}%"))
                ->when($request->category, fn ($query, $category) => $query->where('category', $category))
                ->orderBy('sort_order')
                ->latest()
                ->paginate(16)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cms/gallery/form', ['item' => null]);
    }

    public function store(GalleryItemRequest $request): RedirectResponse
    {
        $this->gallery->create($request->validated(), $request->file('image'));

        return to_route('cms.gallery.index')->with('success', 'Galeri berhasil dibuat.');
    }

    public function edit(GalleryItem $galleryItem): Response
    {
        return Inertia::render('cms/gallery/form', ['item' => $galleryItem]);
    }

    public function update(GalleryItemRequest $request, GalleryItem $galleryItem): RedirectResponse
    {
        $this->gallery->update($galleryItem, $request->validated(), $request->file('image'));

        return to_route('cms.gallery.index')->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        $this->gallery->delete($galleryItem);

        return back()->with('success', 'Galeri berhasil dihapus.');
    }
}
