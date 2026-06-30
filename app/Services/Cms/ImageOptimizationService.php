<?php

namespace App\Services\Cms;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageOptimizationService
{
    public function store(UploadedFile $file, string $directory, string $name): array
    {
        $baseName = Str::slug($name).'-'.Str::random(8);
        $image = $this->makeImage($file->getRealPath(), $file->getMimeType());

        if (! $image || ! function_exists('imagewebp')) {
            $path = $file->storeAs($directory, $baseName.'.'.$file->extension(), 'public');

            [$width, $height] = getimagesize($file->getRealPath()) ?: [null, null];

            return [
                'path' => $path,
                'thumbnail_path' => $path,
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'width' => $width,
                'height' => $height,
            ];
        }

        $main = $this->resize($image, 1600);
        $thumb = $this->resize($image, 480);

        $path = "{$directory}/{$baseName}.webp";
        $thumbnailPath = "{$directory}/thumbs/{$baseName}.webp";

        $this->putWebp($main, $path, 82);
        $this->putWebp($thumb, $thumbnailPath, 76);

        [$width, $height] = getimagesize($file->getRealPath()) ?: [null, null];

        imagedestroy($image);
        imagedestroy($main);
        imagedestroy($thumb);

        return [
            'path' => $path,
            'thumbnail_path' => $thumbnailPath,
            'mime_type' => 'image/webp',
            'file_size' => Storage::disk('public')->size($path),
            'width' => $width,
            'height' => $height,
        ];
    }

    public function delete(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }

    private function makeImage(string $path, string $mimeType): mixed
    {
        return match ($mimeType) {
            'image/jpeg' => function_exists('imagecreatefromjpeg') ? imagecreatefromjpeg($path) : null,
            'image/png' => function_exists('imagecreatefrompng') ? imagecreatefrompng($path) : null,
            'image/webp' => function_exists('imagecreatefromwebp') ? imagecreatefromwebp($path) : null,
            default => null,
        };
    }

    private function resize(mixed $source, int $maxWidth): mixed
    {
        $width = imagesx($source);
        $height = imagesy($source);

        if ($width <= $maxWidth) {
            $copy = imagecreatetruecolor($width, $height);
            imagecopy($copy, $source, 0, 0, 0, 0, $width, $height);

            return $copy;
        }

        $newWidth = $maxWidth;
        $newHeight = (int) round($height * ($newWidth / $width));
        $resized = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($resized, $source, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        return $resized;
    }

    private function putWebp(mixed $image, string $path, int $quality): void
    {
        ob_start();
        imagewebp($image, null, $quality);
        Storage::disk('public')->put($path, ob_get_clean());
    }
}
