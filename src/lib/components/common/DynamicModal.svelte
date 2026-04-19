<script lang="ts">
    import Modal from './Modal.svelte';

    let {
        show = false,
        title = '',
        content = '',
        type = 'info', // info, confirm, warning, error, success, custom
        size = 'md',
        buttons = [],
        onClose = () => {},
        onConfirm = () => {}
    } = $props();

    // 默认按钮配置
    const defaultButtons = {
        info: [
            { text: '确定', type: 'primary', action: 'close' }
        ],
        confirm: [
            { text: '取消', type: 'secondary', action: 'close' },
            { text: '确定', type: 'primary', action: 'confirm' }
        ],
        warning: [
            { text: '确定', type: 'warning', action: 'close' }
        ],
        error: [
            { text: '确定', type: 'danger', action: 'close' }
        ],
        success: [
            { text: '确定', type: 'success', action: 'close' }
        ]
    };

    // 获取按钮配置
    const getButtons = () => {
        if (buttons.length > 0) return buttons;
        return defaultButtons[type] || defaultButtons.info;
    };

    // 处理按钮点击
    const handleButtonClick = (button: any) => {
        switch (button.action) {
            case 'close':
                onClose();
                break;
            case 'confirm':
                onConfirm();
                break;
            case 'custom':
                button.onClick?.();
                break;
        }
    };

    // 获取按钮样式
    const getButtonClass = (buttonType: string) => {
        const baseClass = 'px-4 py-2 rounded-md font-medium transition-colors';
        
        switch (buttonType) {
            case 'primary':
                return `${baseClass} bg-primary text-white hover:bg-primary-600`;
            case 'danger':
                return `${baseClass} bg-red-600 text-white hover:bg-red-700`;
            case 'warning':
                return `${baseClass} bg-yellow-600 text-white hover:bg-yellow-700`;
            case 'success':
                return `${baseClass} bg-green-600 text-white hover:bg-green-700`;
            default:
                return `${baseClass} border border-gray-300 text-gray-700 hover:bg-gray-50`;
        }
    };

    // 获取图标
    const getIcon = () => {
        switch (type) {
            case 'info':
                return 'ℹ️';
            case 'warning':
                return '⚠️';
            case 'error':
                return '❌';
            case 'success':
                return '✅';
            default:
                return '';
        }
    };
</script>

<Modal 
    {show} 
    {title} 
    {size}
    onClose={onClose}
    closeOnBackdrop={true}
    showCloseButton={true}
>
    <!-- 内容区域 -->
    <div class="modal-content-area">
        <!-- 图标和内容 -->
        {#if getIcon()}
            <div class="text-center text-4xl mb-4">{getIcon()}</div>
        {/if}
        
        {#if content}
            <div class="text-gray-600 mb-6 text-center">{content}</div>
        {/if}
        
        <!-- 默认插槽内容 -->
        <slot />
    </div>
    
    <!-- 按钮区域 -->
    <svelte:fragment slot="footer">
        <div class="flex justify-end space-x-3">
            {#each getButtons() as button}
                <button 
                    class={getButtonClass(button.type)}
                    onclick={() => handleButtonClick(button)}
                >
                    {button.text}
                </button>
            {/each}
        </div>
    </svelte:fragment>
</Modal>