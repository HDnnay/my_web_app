<nav class="bg-primary-400 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
        <div class="flex space-x-6">
            <a href="/admin" class="transition-colors hover:text-white/80">仪表盘</a>
            <a href="/admin/users" class="transition-colors hover:text-white/80">用户管理</a>
            <a href="/admin/articles" class="transition-colors hover:text-white/80">文章管理</a>
            <a href="/admin/menus" class="transition-colors hover:text-white/80">菜单管理</a>
            <a href="/admin/roles" class="transition-colors hover:text-white/80">角色管理</a>
            <a href="/admin/permissions" class="transition-colors hover:text-white/80">权限管理</a>
        </div>
        
        <!-- 简化的用户信息和退出按钮 -->
        <div class="flex items-center space-x-4">
            <span class="text-sm">管理员</span>
            <button class="bg-primary-500 hover:bg-primary-600 px-3 py-1 rounded text-sm transition-colors">
                退出
            </button>
        </div>
    </div>
</nav>