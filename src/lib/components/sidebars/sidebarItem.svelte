<script lang="ts">
    // 导入自身用于递归
    import SidebarItem from './sidebarItem.svelte';
    
    // 导入菜单项类型
    import type { MenuItem } from '$lib/types/menu';
    
    // 组件属性
    let { 
        menu, 
        isActiveMenu, 
        handleMenuClick,
        // 样式属性
        liHoverClass = 'hover:bg-primary-600',
        activeClass = 'bg-primary-700'
    }: {
        menu: MenuItem;
        isActiveMenu: (path: string) => boolean;
        handleMenuClick: (path: string) => void;
        liHoverClass?: string;
        activeClass?: string;
    } = $props();
    
    // 使用菜单数据中的 level 字段计算缩进距离
    const indentClass = `ml-${(menu.level - 1) * 4}`;
    
    // 判断是否有子菜单
    const hasChildren = menu.childMenus && menu.childMenus.length > 0;
</script>

<li class="w-full">
    {#if hasChildren}
        <!-- 有子菜单的菜单项 -->
        <details class="group w-full">
            <summary class="flex items-center px-3 py-2 w-full cursor-pointer transition-colors {liHoverClass} {isActiveMenu(menu.path) ? activeClass : ''}">
                <div class="{indentClass} flex-1">
                    <!-- {#if menu.icon}
                        <span class="mr-3">{menu.icon}</span>
                    {/if} -->
                    <span>{menu.name}</span>
                </div>
                <span class="transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <ul class="mt-1 space-y-1 w-full">
                {#each menu.childMenus as childMenu}
                    <SidebarItem 
                        menu={childMenu}
                        isActiveMenu={isActiveMenu} 
                        handleMenuClick={handleMenuClick}
                        liHoverClass={liHoverClass}
                    />
                {/each}
            </ul>
        </details>
    {:else}
        <!-- 没有子菜单的菜单项 -->
        <a 
            href="{menu.path}" 
            class="flex items-center px-3 py-2 w-full transition-colors {liHoverClass} {isActiveMenu(menu.path) ? activeClass : ''}"
            onclick={() => handleMenuClick(menu.path)}
        >
            <div class="{indentClass} flex-1">
                <!-- {#if menu.icon}
                    <span class="mr-3">{menu.icon}</span>
                {/if} -->
                <span>{menu.name}</span>
            </div>
        </a>
    {/if}
</li>