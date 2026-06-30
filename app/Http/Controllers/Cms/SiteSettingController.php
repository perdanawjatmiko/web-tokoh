<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\SiteSettingRequest;
use App\Models\SiteSetting;
use App\Services\Cms\SiteSettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function __construct(private readonly SiteSettingService $settings) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/site-settings/index', [
            'filters' => $request->only(['search', 'group']),
            'settings' => SiteSetting::query()
                ->when($request->search, fn ($query, $search) => $query->where('label', 'like', "%{$search}%")->orWhere('key', 'like', "%{$search}%"))
                ->when($request->group, fn ($query, $group) => $query->where('group', $group))
                ->orderBy('group')
                ->orderBy('sort_order')
                ->paginate(15)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cms/site-settings/form', ['setting' => null]);
    }

    public function store(SiteSettingRequest $request): RedirectResponse
    {
        $this->settings->create($request->validated());

        return to_route('cms.site-settings.index')->with('success', 'Setting website berhasil dibuat.');
    }

    public function edit(SiteSetting $siteSetting): Response
    {
        return Inertia::render('cms/site-settings/form', ['setting' => $siteSetting]);
    }

    public function update(SiteSettingRequest $request, SiteSetting $siteSetting): RedirectResponse
    {
        $this->settings->update($siteSetting, $request->validated());

        return to_route('cms.site-settings.index')->with('success', 'Setting website berhasil diperbarui.');
    }

    public function destroy(SiteSetting $siteSetting): RedirectResponse
    {
        $this->settings->delete($siteSetting);

        return back()->with('success', 'Setting website berhasil dihapus.');
    }
}
