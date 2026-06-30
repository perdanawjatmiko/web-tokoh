<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\GalleryItem;
use App\Models\NavigationMenu;
use App\Models\SeoSetting;
use App\Models\SiteSetting;
use App\Models\Tag;
use App\Models\WebsiteTemplate;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('cms/dashboard', [
            'stats' => [
                'articles' => Article::count(),
                'categories' => Category::count(),
                'tags' => Tag::count(),
                'menus' => NavigationMenu::count(),
                'gallery' => GalleryItem::count(),
                'seo' => SeoSetting::count(),
                'settings' => SiteSetting::count(),
                'templates' => WebsiteTemplate::count(),
            ],
            'recentArticles' => Article::with('category:id,name')
                ->latest()
                ->limit(5)
                ->get(['id', 'category_id', 'title', 'status', 'published_at', 'updated_at']),
        ]);
    }
}
