<?php

namespace App\Services\Cms;

use App\Models\SiteSetting;

class SiteSettingService
{
    public function create(array $data): SiteSetting
    {
        return SiteSetting::create($data);
    }

    public function update(SiteSetting $setting, array $data): SiteSetting
    {
        $setting->update($data);

        return $setting;
    }

    public function delete(SiteSetting $setting): void
    {
        $setting->delete();
    }
}
