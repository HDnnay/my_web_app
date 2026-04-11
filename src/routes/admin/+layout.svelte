<script lang="ts">
    import type { LayoutProps } from './$types';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    let { data, children }: LayoutProps = $props();
    // 检查登录状态（示例）
  if (browser) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      goto('/login');
    }
  }
</script>

<div class="admin-layout">
    <!-- 侧边栏或顶部导航 -->
    <nav class="bg-gray-800 text-white p-4">
        <div class="container mx-auto">
            <a href="/admin" class="mr-4">仪表盘</a>
            <a href="/admin/users" class="mr-4">用户管理</a>
            <a href="/admin/posts" class="mr-4">文章管理</a>
        </div>
    </nav>
    
    <!-- 主内容区 -->
    <main class="container mx-auto p-6">
        {@render children()}
    </main>
</div>