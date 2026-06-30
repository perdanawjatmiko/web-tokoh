<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\NavigationMenuRequest;
use App\Models\NavigationMenu;
use App\Services\Cms\NavigationMenuService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NavigationMenuController extends Controller
{
    public function __construct(private readonly NavigationMenuService $menus) {}

    public function index(Request $request): Response
    {
        return Inertia::render('cms/navigation-menus/index', [
            'filters' => $request->only(['search', 'location']),
            'menus' => NavigationMenu::with('parent:id,label')
                ->when($request->search, fn ($query, $search) => $query->where('label', 'like', "%{$search}%"))
                ->when($request->location, fn ($query, $location) => $query->where('location', $location))
                ->orderBy('location')
                ->orderBy('sort_order')
                ->paginate(15)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cms/navigation-menus/form', [
            'menu' => null,
            'parents' => NavigationMenu::orderBy('label')->get(['id', 'label']),
        ]);
    }

    public function store(NavigationMenuRequest $request): RedirectResponse
    {
        $this->menus->create($request->validated());

        return to_route('cms.navigation-menus.index')->with('success', 'Menu navigasi berhasil dibuat.');
    }

    public function edit(NavigationMenu $navigationMenu): Response
    {
        return Inertia::render('cms/navigation-menus/form', [
            'menu' => $navigationMenu,
            'parents' => NavigationMenu::whereKeyNot($navigationMenu->id)->orderBy('label')->get(['id', 'label']),
        ]);
    }

    public function update(NavigationMenuRequest $request, NavigationMenu $navigationMenu): RedirectResponse
    {
        $this->menus->update($navigationMenu, $request->validated());

        return to_route('cms.navigation-menus.index')->with('success', 'Menu navigasi berhasil diperbarui.');
    }

    public function destroy(NavigationMenu $navigationMenu): RedirectResponse
    {
        $this->menus->delete($navigationMenu);

        return back()->with('success', 'Menu navigasi berhasil dihapus.');
    }
}
