<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\CategoryRequest;
use App\Models\Category;
use App\Services\Cms\CategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(private readonly CategoryService $categories) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/categories/index', [
            'filters' => $request->only('search'),
            'categories' => Category::withCount('articles')
                ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
                ->orderBy('sort_order')
                ->orderBy('name')
                ->paginate(15)
                ->withQueryString(),
            'parents' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): RedirectResponse
    {
        return to_route('cms.categories.index');
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $this->categories->create($request->validated());

        return to_route('cms.categories.index')->with('success', 'Kategori berhasil dibuat.');
    }

    public function edit(Category $category): RedirectResponse
    {
        return to_route('cms.categories.index');
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $this->categories->update($category, $request->validated());

        return to_route('cms.categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->categories->delete($category);

        return back()->with('success', 'Kategori berhasil dihapus.');
    }
}
