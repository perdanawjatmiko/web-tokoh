<?php

namespace App\Services\Cms;

use App\Models\WebsiteTemplate;
use Illuminate\Support\Facades\DB;

class WebsiteTemplateService
{
    public function create(array $data): WebsiteTemplate
    {
        return DB::transaction(function () use ($data): WebsiteTemplate {
            if ($data['is_active'] ?? false) {
                WebsiteTemplate::query()->update(['is_active' => false]);
            }

            return WebsiteTemplate::create($data);
        });
    }

    public function update(WebsiteTemplate $template, array $data): WebsiteTemplate
    {
        return DB::transaction(function () use ($template, $data): WebsiteTemplate {
            if ($data['is_active'] ?? false) {
                WebsiteTemplate::query()->whereKeyNot($template->id)->update(['is_active' => false]);
            }

            $template->update($data);

            return $template;
        });
    }

    public function delete(WebsiteTemplate $template): void
    {
        $template->delete();
    }
}
