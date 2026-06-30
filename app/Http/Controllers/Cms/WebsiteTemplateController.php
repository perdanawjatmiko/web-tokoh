<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\WebsiteTemplateRequest;
use App\Models\WebsiteTemplate;
use App\Services\Cms\WebsiteTemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteTemplateController extends Controller
{
    public function __construct(private readonly WebsiteTemplateService $templates) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/templates/index', [
            'filters' => $request->only('search'),
            'templates' => WebsiteTemplate::query()
                ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
                ->latest()
                ->paginate(12)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cms/templates/form', ['template' => null]);
    }

    public function store(WebsiteTemplateRequest $request): RedirectResponse
    {
        $this->templates->create($request->validated());

        return to_route('cms.templates.index')->with('success', 'Template berhasil dibuat.');
    }

    public function edit(WebsiteTemplate $template): Response
    {
        return Inertia::render('cms/templates/form', ['template' => $template]);
    }

    public function update(WebsiteTemplateRequest $request, WebsiteTemplate $template): RedirectResponse
    {
        $this->templates->update($template, $request->validated());

        return to_route('cms.templates.index')->with('success', 'Template berhasil diperbarui.');
    }

    public function destroy(WebsiteTemplate $template): RedirectResponse
    {
        $this->templates->delete($template);

        return back()->with('success', 'Template berhasil dihapus.');
    }
}
