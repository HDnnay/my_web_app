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
        activeClass = 'bg-primary-700',
        // 主题色属性
        themeColor = 'primary'
    }: {
        menu: MenuItem;
        isActiveMenu: (path: string) => boolean;
        handleMenuClick: (path: string) => void;
        liHoverClass?: string;
        activeClass?: string;
        themeColor?: string;
    } = $props();
    
    // 使用菜单数据中的 level 字段计算缩进距离
    const indent = (menu.level - 1) * 16; // 16px 是 1rem 的基础单位
    const indentStyle = `margin-left: ${indent}px;`;
    
    // 判断是否有子菜单
    const hasChildren = menu.childMenus && menu.childMenus.length > 0;
</script>

<li class="w-full">
    {#if hasChildren}
        <!-- 有子菜单的菜单项 -->
        <details class="w-full">
            <summary class="flex items-center px-3 py-2 w-full cursor-pointer transition-colors {liHoverClass} {isActiveMenu(menu.path) ? activeClass : ''} group">
                <div class="flex-1" style={indentStyle}>
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
                        themeColor={themeColor}
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
            <div class="flex-1" style={indentStyle}>
                <!-- {#if menu.icon}
                    <span class="mr-3">{menu.icon}</span>
                {/if} -->
                <span>{menu.name}</span>
            </div>
        </a>
    {/if}
</li>