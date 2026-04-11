<script lang="ts">
    import type { LayoutProps } from './$types';
    import { goto } from '$app/navigation';
    import HeaderNav from '$lib/components/pageHeaderNavs/headerNav.svelte';
    import { browser } from '$app/environment';
    import Sidebar from '$lib/components/sidebars/sidebar.svelte';
    let { data, children }: LayoutProps = $props();
    // 检查登录状态（示例）
  if (browser) {
    // const isAdmin = localStorage.getItem('isAdmin') === 'true';
    // if (!isAdmin) {
    //   goto('/login');
    // }
  }
</script>

<div class="admin-layout flex flex-col min-h-screen">
    <!-- 顶部导航菜单 -->
    <HeaderNav />

    <div class="flex flex-1">
        <!-- 左侧侧栏菜单 -->
        <aside class="w-64 flex-shrink-0">
            <Sidebar />
        </aside>
        
        <!-- 右侧内容显示区域 -->
        <main class="flex-1 bg-gray-50 p-6 overflow-auto">
            {@render children()}
        </main>
    </div>
</div>