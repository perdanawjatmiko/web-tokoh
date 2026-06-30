<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\SeoSettingRequest;
use App\Models\SeoSetting;
use App\Services\Cms\SeoSettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SeoSettingController extends Controller
{
    public function __construct(private readonly SeoSettingService $seo) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/seo/index', [
            'filters' => $request->only('search'),
            'settings' => SeoSetting::query()
                ->when($request->search, fn ($query, $search) => $query->where('page_name', 'like', "%{$search}%")->orWhere('page_key', 'like', "%{$search}%"))
                ->orderBy('page_name')
                ->paginate(15)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cms/seo/form', ['setting' => null]);
    }

    public function store(SeoSettingRequest $request): RedirectResponse
    {
        $this->seo->create($request->validated());

        return to_route('cms.seo.index')->with('success', 'SEO setting berhasil dibuat.');
    }

    public function edit(SeoSetting $seo): Response
    {
        return Inertia::render('cms/seo/form', ['setting' => $seo]);
    }

    public function update(SeoSettingRequest $request, SeoSetting $seo): RedirectResponse
    {
        $this->seo->update($seo, $request->validated());

        return to_route('cms.seo.index')->with('success', 'SEO setting berhasil diperbarui.');
    }

    public function destroy(SeoSetting $seo): RedirectResponse
    {
        $this->seo->delete($seo);

        return back()->with('success', 'SEO setting berhasil dihapus.');
    }
}
