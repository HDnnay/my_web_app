<script lang="ts">
    import Modal from './Modal.svelte';

    let {
        show = false,
        user = null,
        onSave = () => {},
        onCancel = () => {}
    } = $props();

    // 表单数据
    let formData = $state({
        name: '',
        email: '',
        userType: '',
        isDisabled: false
    });

    // 当用户数据变化时更新表单
    $effect(() => {
        if (user) {
            formData = {
                name: user?.name || '',
                email: user?.email || '',
                userType: user?.userType || '',
                isDisabled: user?.isDisabled || false
            };
        }
    });

    // 处理保存
    const handleSave = () => {
        onSave(formData);
    };

    // 处理取消
    const handleCancel = () => {
        onCancel();
    };

    // 用户类型选项
    const userTypes = [
        { value: 'ADMIN', label: '管理员' },
        { value: 'USER', label: '普通用户' },
        { value: 'GUEST', label: '访客' }
    ];
</script>

<Modal 
    {show} 
    title={user ? `编辑用户 - ${user.name}` : '编辑用户'}
    size="lg"
    onClose={handleCancel}
    closeOnBackdrop={true}
    showCloseButton={true}
>
    <form class="space-y-4" on:submit|preventDefault={handleSave}>
        <!-- 姓名 -->
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input 
                id="name"
                type="text"
                bind:value={formData.name}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
            />
        </div>

        <!-- 邮箱 -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input 
                id="email"
                type="email"
                bind:value={formData.email}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
            />
        </div>

        <!-- 用户类型 -->
        <div>
            <label for="userType" class="block text-sm font-medium text-gray-700 mb-1">用户类型</label>
            <select 
                id="userType"
                bind:value={formData.userType}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
                <option value="">请选择用户类型</option>
                {#each userTypes as type}
                    <option value={type.value}>{type.label}</option>
                {/each}
            </select>
        </div>

        <!-- 状态 -->
        <div class="flex items-center">
            <input 
                id="isDisabled"
                type="checkbox"
                bind:checked={formData.isDisabled}
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="isDisabled" class="ml-2 block text-sm text-gray-700">禁用用户</label>
        </div>
    </form>
    
    <svelte:fragment slot="footer">
        <div class="flex justify-end space-x-3">
            <button 
                type="button"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                on:click={handleCancel}
            >
                取消
            </button>
            <button 
                type="button"
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
                on:click={handleSave}
            >
                保存
            </button>
        </div>
    </svelte:fragment>
</Modal>