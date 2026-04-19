<script lang="ts">
    import Modal from './Modal.svelte';

    let {
        show = false,
        title = '确认',
        message = '确定要执行此操作吗？',
        confirmText = '确定',
        cancelText = '取消',
        onConfirm = () => {},
        onCancel = () => {},
        type = 'default' // default, danger, warning
    } = $props();

    // 确认按钮样式
    const getConfirmButtonClass = () => {
        const baseClass = 'px-4 py-2 rounded-md font-medium transition-colors';
        
        switch (type) {
            case 'danger':
                return `${baseClass} bg-red-600 text-white hover:bg-red-700`;
            case 'warning':
                return `${baseClass} bg-yellow-600 text-white hover:bg-yellow-700`;
            default:
                return `${baseClass} bg-primary text-white hover:bg-primary-600`;
        }
    };

    // 处理确认
    const handleConfirm = () => {
        onConfirm();
    };

    // 处理取消
    const handleCancel = () => {
        onCancel();
    };
</script>

<Modal 
    {show} 
    {title} 
    size="md"
    onClose={handleCancel}
    closeOnBackdrop={true}
    showCloseButton={true}
>
    <!-- 消息内容 -->
    <div class="text-gray-600 mb-6">
        {message}
    </div>
    
    <svelte:fragment slot="footer">
        <div class="flex justify-end space-x-3">
            <button 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                on:click={handleCancel}
            >
                {cancelText}
            </button>
            <button 
                class={getConfirmButtonClass()}
                on:click={handleConfirm}
            >
                {confirmText}
            </button>
        </div>
    </svelte:fragment>
</Modal>