<script lang="ts">
    import { GetMenuTreeStore } from '$houdini';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import SidebarItem from './sidebarItem.svelte';
    import type { MenuItem } from '$lib/types/menu';
    
    // 组件属性
    let { 
        themeColor = 'primary-400',
        textColor = 'white'
    }: {
        themeColor?: string;
        textColor?: string;
    } = $props();

    // 菜单数据
    let menuData = $state<MenuItem[]>([]);
    let loading = $state(true);
    let error = $state<string | null>(null);

    // 当前页面路径
    const currentPath = $derived($page.url.pathname);

    onMount(async () => {
        try {
            // 使用 Houdini Store 获取菜单数据
            const store = new GetMenuTreeStore();
            const result = await store.fetch();
            
            if (result.data?.menuTree) {
                menuData = result.data.menuTree;
                // 按 order 排序
                menuData.sort((a: MenuItem, b: MenuItem) => (a.order || 0) - (b.order || 0));
                menuData.forEach((menu: MenuItem) => {
                    if (menu.childMenus) {
                        menu.childMenus.sort((a: MenuItem, b: MenuItem) => (a.order || 0) - (b.order || 0));
                    }
                });
            } else {
                error = '未获取到菜单数据';
            }
        } catch (err) {
            error = '获取菜单数据失败';
            console.error('获取菜单数据失败:', err);
        } finally {
            loading = false;
        }
    });

    // 处理菜单点击
    const handleMenuClick = (path: string) => {
        if (path) {
            goto(path);
        }
    };

    // 检查是否为当前激活菜单
    const isActiveMenu = (menuPath: string) => {
        return currentPath === menuPath || currentPath.startsWith(menuPath + '/');
    };
</script>

<div class={`sidebar bg-${themeColor} text-${textColor} w-64 min-h-screen flex flex-col`}>
    <!-- 侧边栏标题 -->
    <div class="p-3">
        <h2 class="text-xl font-bold">管理系统</h2>
    </div>

    <!-- 菜单内容 -->
    <nav class="flex-1">
        {#if loading}
            <div class="flex justify-center py-4">
                <div class="animate-spin h-6 w-6 border-b-2 rounded-full border-white"></div>
            </div>
        {:else if error}
            <div class="text-red-400 text-center py-4">{error}</div>
        {:else}
            <ul class="space-y-2 w-full">
                {#each menuData as menu}
                    <SidebarItem 
                        menu={menu}
                        isActiveMenu={isActiveMenu} 
                        handleMenuClick={handleMenuClick}
                        themeColor={themeColor.split('-')[0]} // 提取主颜色名称
                    />
                {/each}
            </ul>
        {/if}
    </nav>
</div>

<style>
    .sidebar {
        box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    }
    
    details > summary {
        list-style: none;
    }
    
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>