<?php

use App\Http\Controllers\Cms\ArticleController;
use App\Http\Controllers\Cms\CategoryController;
use App\Http\Controllers\Cms\DashboardController as CmsDashboardController;
use App\Http\Controllers\Cms\GalleryItemController;
use App\Http\Controllers\Cms\NavigationMenuController;
use App\Http\Controllers\Cms\SeoSettingController;
use App\Http\Controllers\Cms\SiteSettingController;
use App\Http\Controllers\Cms\TagController;
use App\Http\Controllers\Cms\WebsiteTemplateController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('cms')->name('cms.')->group(function () {
        Route::get('/', CmsDashboardController::class)->name('dashboard');
        Route::resource('articles', ArticleController::class)->except('show');
        Route::resource('categories', CategoryController::class)->except('show');
        Route::resource('tags', TagController::class)->except('show');
        Route::resource('navigation-menus', NavigationMenuController::class)->except('show');
        Route::resource('gallery', GalleryItemController::class)->except('show')->parameters(['gallery' => 'gallery_item']);
        Route::resource('seo', SeoSettingController::class)->except('show')->parameters(['seo' => 'seo']);
        Route::resource('site-settings', SiteSettingController::class)->except('show');
        Route::resource('templates', WebsiteTemplateController::class)->except('show')->parameters(['templates' => 'template']);
    });
});

require __DIR__.'/settings.php';
