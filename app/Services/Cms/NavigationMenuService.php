<?php

namespace App\Services\Cms;

use App\Models\NavigationMenu;

class NavigationMenuService
{
    public function create(array $data): NavigationMenu
    {
        return NavigationMenu::create($data);
    }

    public function update(NavigationMenu $menu, array $data): NavigationMenu
    {
        $menu->update($data);

        return $menu;
    }

    public function delete(NavigationMenu $menu): void
    {
        $menu->delete();
    }
}
