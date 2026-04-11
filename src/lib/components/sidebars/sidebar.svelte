<script lang="ts">
    import { GetMenuTreeStore } from '$houdini';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    // 菜单数据
    let menuData = $state<any[]>([]);
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
                menuData.sort((a, b) => (a.order || 0) - (b.order || 0));
                menuData.forEach(menu => {
                    if (menu.childMenus) {
                        menu.childMenus.sort((a, b) => (a.order || 0) - (b.order || 0));
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

<div class="sidebar bg-primary-400 text-white w-64 min-h-screen">
    <!-- 侧边栏标题 -->
    <div class="p-3">
        <h2 class="text-xl font-bold">管理系统</h2>
    </div>

    <!-- 菜单内容 -->
    <nav class="">
        {#if loading}
            <div class="flex justify-center py-4">
                <div class="animate-spin h-6 w-6 border-b-2 rounded-full border-white"></div>
            </div>
        {:else if error}
            <div class="text-red-400 text-center py-4">{error}</div>
        {:else}
            <ul class="space-y-2">
                {#each menuData as menu}
                    <li>
                        {#if menu.childMenus && menu.childMenus.length > 0}
                            <!-- 有子菜单的菜单项 -->
                            <details class="group">
                                <summary class="flex items-center px-3 py-2 cursor-pointer hover:bg-primary-300 transition-colors {isActiveMenu(menu.path) ? 'bg-gray-700' : ''}">
                                    <!-- {#if menu.icon}
                                        <span class="mr-3">{menu.icon}</span>
                                    {/if} -->
                                    <span class="flex-1">{menu.name}</span>
                                    <span class="transform transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <ul class="ml-4 mt-1 space-y-1">
                                    {#each menu.childMenus as childMenu}
                                        <li>
                                            <a 
                                                href="{childMenu.path}" 
                                                class="flex items-center px-3 py-2 rounded-lg hover:bg-primary-300 transition-colors {isActiveMenu(childMenu.path) ? 'bg-gray-700' : ''}"
                                                onclick={() => handleMenuClick(childMenu.path)}
                                            >
                                                <!-- {#if childMenu.icon}
                                                    <span class="mr-3">{childMenu.icon}</span>
                                                {/if} -->
                                                <span>{childMenu.name}</span>
                                            </a>
                                        </li>
                                    {/each}
                                </ul>
                            </details>
                        {:else}
                            <!-- 没有子菜单的菜单项 -->
                            <a 
                                href="{menu.path}" 
                                class="flex items-center px-3 py-2 rounded-lg hover:bg-primary-300 transition-colors {isActiveMenu(menu.path) ? 'bg-gray-700' : ''}"
                                onclick={() => handleMenuClick(menu.path)}
                            >
                                <!-- {#if menu.icon}
                                    <span class="mr-3">{menu.icon}</span>
                                {/if} -->
                                <span>{menu.name}</span>
                            </a>
                        {/if}
                    </li>
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