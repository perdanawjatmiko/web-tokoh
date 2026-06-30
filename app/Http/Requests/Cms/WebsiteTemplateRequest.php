<?php

namespace App\Http\Requests\Cms;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class WebsiteTemplateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => $this->filled('slug') ? Str::slug($this->string('slug')) : null,
            'is_active' => $this->boolean('is_active'),
            'is_available' => $this->boolean('is_available'),
        ]);
    }

    public function rules(): array
    {
        $websiteTemplate = $this->route('website_template');

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('website_templates', 'slug')->ignore($websiteTemplate)],
            'description' => ['nullable', 'string'],
            'preview_image' => ['nullable', 'url', 'max:255'],
            'layout_path' => ['nullable', 'string', 'max:255'],
            'config' => ['nullable', 'array'],
            'is_active' => ['boolean'],
            'is_available' => ['boolean'],
        ];
    }
}
