<script lang="ts">
    import UserMenu from './userMenu.svelte';
</script>

<nav class="bg-primary-400 text-white p-4 shadow-md relative z-40">
    <div class="container mx-auto flex justify-between items-center">
        <div class="flex space-x-6">
            <a href="/admin" class="transition-colors hover:text-white/80">仪表盘</a>
            <a href="/admin/users" class="transition-colors hover:text-white/80">用户管理</a>
            <a href="/admin/articles" class="transition-colors hover:text-white/80">文章管理</a>
            <a href="/admin/menus" class="transition-colors hover:text-white/80">菜单管理</a>
            <a href="/admin/roles" class="transition-colors hover:text-white/80">角色管理</a>
            <a href="/admin/permissions" class="transition-colors hover:text-white/80">权限管理</a>
        </div>
        
    </div>
</nav>