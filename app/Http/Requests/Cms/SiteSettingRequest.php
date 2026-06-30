<?php

namespace App\Http\Requests\Cms;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SiteSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'key' => $this->filled('key') ? Str::slug($this->string('key'), '_') : null,
            'is_public' => $this->boolean('is_public'),
        ]);
    }

    public function rules(): array
    {
        $siteSetting = $this->route('site_setting');

        return [
            'group' => ['required', 'string', 'max:100'],
            'key' => ['required', 'string', 'max:150', Rule::unique('site_settings', 'key')->ignore($siteSetting)],
            'label' => ['required', 'string', 'max:255'],
            'value' => ['nullable', 'string'],
            'type' => ['required', Rule::in(['text', 'textarea', 'image', 'number', 'email', 'url', 'json', 'boolean'])],
            'options' => ['nullable', 'array'],
            'description' => ['nullable', 'string'],
            'is_public' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
