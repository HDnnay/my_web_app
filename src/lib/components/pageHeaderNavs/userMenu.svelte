<script lang="ts">
    import { browser } from '$app/environment';
    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    // 点击外部关闭菜单
    function handleClickOutside(event: MouseEvent) {
        const menu = document.getElementById('user-menu');
        const button = document.getElementById('user-menu-button');
        
        if (menu && button) {
            if (!menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
                isOpen = false;
            }
        }
    }

    // 只在浏览器环境中添加事件监听器
    if (browser) {
        document.addEventListener('click', handleClickOutside);
    }
</script>

<div class="relative">
    <button 
        id="user-menu-button"
        class="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 px-3 py-1 rounded text-sm transition-colors"
        on:click={toggleMenu}
    >
        <span>管理员</span>
        <span class="transform transition-transform {isOpen ? 'rotate-180' : ''}">▼</span>
    </button>
    
    {#if isOpen}
        <div 
            id="user-menu"
            class="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50"
        >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人资料</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">设置</a>
            <div class="border-t border-gray-200"></div>
            <button class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">退出</button>
        </div>
    {/if}
</div>
