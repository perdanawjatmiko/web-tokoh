export type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

export type Option = {
    id: number;
    name?: string;
    label?: string;
};

export type Category = {
    id: number;
    parent_id?: number | null;
    name: string;
    slug: string;
    description?: string | null;
    color?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    seo_keywords?: string | null;
    canonical_url?: string | null;
    is_active: boolean;
    sort_order: number;
    articles_count?: number;
};

export type Tag = {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    seo_keywords?: string | null;
    is_active: boolean;
    articles_count?: number;
};

export type Article = {
    id: number;
    category_id?: number | null;
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    featured_image?: string | null;
    featured_image_thumb?: string | null;
    featured_image_alt?: string | null;
    status: 'draft' | 'review' | 'published' | 'archived';
    is_featured: boolean;
    published_at?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    seo_keywords?: string | null;
    canonical_url?: string | null;
    og_title?: string | null;
    og_description?: string | null;
    og_image?: string | null;
    twitter_title?: string | null;
    twitter_description?: string | null;
    twitter_image?: string | null;
    robots_index: boolean;
    robots_follow: boolean;
    reading_time?: number;
    category?: Category | null;
    tags?: Tag[];
    tag_ids?: number[];
};

export type NavigationMenu = {
    id: number;
    parent_id?: number | null;
    label: string;
    slug?: string | null;
    url: string;
    type: string;
    location: string;
    target: string;
    icon?: string | null;
    css_class?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    rel_attribute?: string | null;
    is_active: boolean;
    sort_order: number;
    parent?: { id: number; label: string } | null;
};

export type GalleryItem = {
    id: number;
    title: string;
    slug: string;
    description?: string | null;
    image_path: string;
    thumbnail_path?: string | null;
    alt_text?: string | null;
    caption?: string | null;
    credit?: string | null;
    file_size?: number;
    width?: number | null;
    height?: number | null;
    category?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
};

export type SeoSetting = {
    id: number;
    page_key: string;
    page_name: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    canonical_url?: string | null;
    og_title?: string | null;
    og_description?: string | null;
    og_image?: string | null;
    twitter_title?: string | null;
    twitter_description?: string | null;
    twitter_image?: string | null;
    schema_type: string;
    schema_markup?: Record<string, unknown> | null;
    robots_index: boolean;
    robots_follow: boolean;
    is_active: boolean;
};

export type SiteSetting = {
    id: number;
    group: string;
    key: string;
    label: string;
    value?: string | null;
    type: string;
    description?: string | null;
    is_public: boolean;
    sort_order: number;
};

export type WebsiteTemplate = {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    preview_image?: string | null;
    layout_path?: string | null;
    config?: Record<string, unknown> | null;
    is_active: boolean;
    is_available: boolean;
};
