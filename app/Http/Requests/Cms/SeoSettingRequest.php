<?php

namespace App\Http\Requests\Cms;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SeoSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'page_key' => $this->filled('page_key') ? Str::slug($this->string('page_key'), '_') : null,
            'robots_index' => $this->boolean('robots_index', true),
            'robots_follow' => $this->boolean('robots_follow', true),
            'is_active' => $this->boolean('is_active'),
        ]);
    }

    public function rules(): array
    {
        $seoSetting = $this->route('seo');

        return [
            'page_key' => ['required', 'string', 'max:100', Rule::unique('seo_settings', 'page_key')->ignore($seoSetting)],
            'page_name' => ['required', 'string', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'meta_keywords' => ['nullable', 'string', 'max:255'],
            'canonical_url' => ['nullable', 'url', 'max:255'],
            'og_title' => ['nullable', 'string', 'max:255'],
            'og_description' => ['nullable', 'string', 'max:500'],
            'og_image' => ['nullable', 'url', 'max:255'],
            'twitter_title' => ['nullable', 'string', 'max:255'],
            'twitter_description' => ['nullable', 'string', 'max:500'],
            'twitter_image' => ['nullable', 'url', 'max:255'],
            'schema_type' => ['required', 'string', 'max:100'],
            'schema_markup' => ['nullable', 'array'],
            'robots_index' => ['boolean'],
            'robots_follow' => ['boolean'],
            'is_active' => ['boolean'],
        ];
    }
}
