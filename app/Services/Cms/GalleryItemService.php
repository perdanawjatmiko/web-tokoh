<?php

namespace App\Services\Cms;

use App\Models\GalleryItem;
use Illuminate\Http\UploadedFile;

class GalleryItemService
{
    public function __construct(private readonly ImageOptimizationService $images) {}

    public function create(array $data, UploadedFile $image): GalleryItem
    {
        $stored = $this->images->store($image, 'gallery', $data['title']);

        return GalleryItem::create([
            ...$data,
            'image_path' => $stored['path'],
            'thumbnail_path' => $stored['thumbnail_path'],
            'mime_type' => $stored['mime_type'],
            'file_size' => $stored['file_size'],
            'width' => $stored['width'],
            'height' => $stored['height'],
        ]);
    }

    public function update(GalleryItem $item, array $data, ?UploadedFile $image = null): GalleryItem
    {
        if ($image) {
            $this->images->delete($item->image_path);
            $this->images->delete($item->thumbnail_path);

            $stored = $this->images->store($image, 'gallery', $data['title']);
            $data = [
                ...$data,
                'image_path' => $stored['path'],
                'thumbnail_path' => $stored['thumbnail_path'],
                'mime_type' => $stored['mime_type'],
                'file_size' => $stored['file_size'],
                'width' => $stored['width'],
                'height' => $stored['height'],
            ];
        }

        $item->update($data);

        return $item;
    }

    public function delete(GalleryItem $item): void
    {
        $this->images->delete($item->image_path);
        $this->images->delete($item->thumbnail_path);
        $item->delete();
    }
}
