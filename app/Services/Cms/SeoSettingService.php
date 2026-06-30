<?php

namespace App\Services\Cms;

use App\Models\SeoSetting;

class SeoSettingService
{
    public function create(array $data): SeoSetting
    {
        return SeoSetting::create($data);
    }

    public function update(SeoSetting $setting, array $data): SeoSetting
    {
        $setting->update($data);

        return $setting;
    }

    public function delete(SeoSetting $setting): void
    {
        $setting->delete();
    }
}
