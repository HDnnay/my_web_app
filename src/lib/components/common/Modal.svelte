<script lang="ts">
    let {
        show = false,
        title = '',
        size = 'md', // sm, md, lg, xl
        onClose = () => {},
        closeOnBackdrop = true,
        showCloseButton = true
    } = $props();

    // 处理背景点击
    const handleBackdropClick = (event: MouseEvent) => {
        if (closeOnBackdrop && (event.target as HTMLElement).classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    // 处理键盘事件
    $effect(() => {
        if (show) {
            const handleKeydown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    onClose();
                }
            };
            
            document.addEventListener('keydown', handleKeydown);
            
            return () => {
                document.removeEventListener('keydown', handleKeydown);
            };
        }
    });

    // 阻止模态框内容点击事件冒泡
    const handleContentClick = (event: MouseEvent) => {
        event.stopPropagation();
    };
</script>

{#if show}
    <div 
        class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
        class:opacity-0={!show}
        class:opacity-100={show}
        onclick={handleBackdropClick}
        style="backdrop-filter: blur(2px);"
    >
        <div 
            class="modal-content bg-white rounded-lg shadow-xl transform transition-all duration-300"
            class:scale-95={!show}
            class:scale-100={show}
            class:max-w-sm={size === 'sm'}
            class:max-w-md={size === 'md'}
            class:max-w-lg={size === 'lg'}
            class:max-w-xl={size === 'xl'}
            class:w-full
            onclick={handleContentClick}
        >
            <!-- 头部 -->
            {#if title || showCloseButton}
                <div class="modal-header flex items-center justify-between p-6 border-b border-gray-200">
                    {#if title}
                        <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
                    {:else}
                        <div></div>
                    {/if}
                    
                    {#if showCloseButton}
                        <button 
                            class="close-button p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onclick={onClose}
                            aria-label="关闭"
                        >
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    {/if}
                </div>
            {/if}
            
            <!-- 内容区域 -->
            <div class="modal-body p-6">
                <slot />
            </div>
            
            <!-- 底部区域（可选） -->
            <div class="modal-footer p-6 border-t border-gray-200">
                <slot name="footer" />
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal-content {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to { 
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
</style>