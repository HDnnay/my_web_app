<script lang="ts">
    import type { PageProps } from './$types';
    import Pagination from '$lib/components/paginations/pagination.svelte';
    import { goto } from '$app/navigation';
    // 导入全局确认对话框
    import { confirm } from '$lib/utils/confirm';
    // 导入模态框组件
    import DynamicModal from '$lib/components/common/DynamicModal.svelte';

    let { data }: PageProps = $props();
    
    // 使用 $derived 创建响应式状态，依赖于 data
    const state = $derived({
        users: data?.users || [],
        pagination: data?.pagination || {
            totalItems: 0,
            itemsPerPage: 10,
            currentPage: 1,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
            endCursor: null
        }
    });

    let userIdToDelete: string | undefined = undefined;
    let showDeleteConfirm = $state(false);
    let showEditUser = $state(false);
    let editingUser: any = $state(null);
    
    // 处理页码变化
    const handlePageChange = (page: number) => {
        // 计算新的游标
        let after = null;
        if (page > state.pagination.currentPage) {
            // 下一页，使用当前页的 endCursor
            after = state.pagination.endCursor || null;
        } else if (page < state.pagination.currentPage) {
            // 上一页，需要使用上一页的游标，这里简化处理，直接回到第一页
            after = null;
        }
        
        // 更新 URL 查询参数，触发页面重新加载
        const params = new URLSearchParams();
        params.set('page', page.toString());
        if (after) {
            params.set('after', after);
        }
        goto(`/admin/users?${params.toString()}`);
    };

    // 处理用户状态切换
    const handleToggleStatus = (userId: string | undefined, isDisabled: boolean | undefined) => {
        if (!userId) return;
        
        // 这里应该调用 API 来切换用户状态
        console.log(`切换用户 ${userId} 的状态，从 ${isDisabled ? '禁用' : '启用'} 到 ${isDisabled ? '启用' : '禁用'}`);
        
        // 切换成功后，应该重新加载用户数据
        // 这里可以添加刷新逻辑
    };

    // 表单数据
    let editFormData = $state({
        name: '',
        email: '',
        userType: '',
        isDisabled: false
    });

    // 处理编辑用户
    const handleEditUser = (user: any) => {
        if (!user) return;
        
        // 设置正在编辑的用户
        editingUser = user;
        
        // 初始化表单数据
        editFormData = {
            name: user?.name || '',
            email: user?.email || '',
            userType: user?.userType || '',
            isDisabled: user?.isDisabled || false
        };
        
        // 显示编辑模态框
        showEditUser = true;
    };

    // 处理保存用户
    const handleSaveUser = () => {
        console.log('保存用户信息:', editFormData);
        console.log('原用户信息:', editingUser);
        
        // 这里应该调用 API 来更新用户信息
        // 例如：await updateUser(editingUser.id, editFormData);
        // 然后重新加载用户数据
        
        // 关闭模态框并重置状态
        showEditUser = false;
        editingUser = null;
    };

    // 处理取消编辑
    const handleCancelEdit = () => {
        // 关闭模态框并重置状态
        showEditUser = false;
        editingUser = null;
    };

    // 处理分配角色
    const handleAssignRoles = (userId: string | undefined) => {
        if (!userId) return;
        
        // 这里应该跳转到分配角色页面或打开分配角色弹窗
        console.log(`为用户 ${userId} 分配角色`);
        // 例如：goto(`/admin/users/${userId}/roles`);
    };



    // 处理删除用户
    const handleDeleteUser = (userId: string | undefined) => {
        if (!userId) return;
        
        // 存储要删除的用户 ID
        userIdToDelete = userId;
        
        // 显示确认模态框
        showDeleteConfirm = true;
    };

    // 处理确认删除
    const handleConfirmDelete = () => {
        if (userIdToDelete) {
            console.log(`删除用户 ${userIdToDelete}`);
            // 这里应该调用 API 来删除用户
            // 例如：await deleteUser(userIdToDelete);
            // 然后重新加载用户数据
        }
        
        // 关闭模态框并重置状态
        showDeleteConfirm = false;
        userIdToDelete = undefined;
    };

    // 处理取消删除
    const handleCancelDelete = () => {
        // 关闭模态框并重置状态
        showDeleteConfirm = false;
        userIdToDelete = undefined;
    };
</script>



<div class="px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold mb-6 text-gray-900">用户管理</h1>
    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">序号</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户类型</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                {#each state.users as user, index}
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1 + (state.pagination.currentPage - 1) * state.pagination.itemsPerPage}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user?.name}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user?.email}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user?.userType}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {#if user?.isDisabled}
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    禁用
                                </span>
                            {:else}
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    启用
                                </span>
                            {/if}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-900">
                            {#if user?.roles && user?.roles.length > 0}
                                {#each user?.roles as role, index}
                                    {role?.name}{index < user?.roles.length - 1 ? ', ' : ''}
                                {/each}
                            {:else}
                                无角色
                            {/if}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onclick={() => handleEditUser(user)} class="text-white bg-primary hover:bg-primary-400 px-2 py-1 rounded-md mr-2 text-xs">编辑</button>
                            <button onclick={() => handleToggleStatus(user?.id, user?.isDisabled)} class={`px-2 py-1 rounded-md mr-2 text-xs ${user?.isDisabled ? 'text-green-600 border border-green-600 hover:bg-green-100' : 'text-yellow-600 border border-yellow-600 hover:bg-yellow-100'}`}>
                                {user?.isDisabled ? '启用' : '禁用'}
                            </button>
                            <button onclick={() => handleAssignRoles(user?.id)} class="text-blue-600 border border-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md mr-2 text-xs">分配角色</button>
                            <button onclick={() => handleDeleteUser(user?.id)} class="text-red-600 border border-red-600 hover:bg-red-100 px-2 py-1 rounded-md text-xs">删除</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    
    <!-- 分页组件 -->
    <Pagination
        currentPage={state.pagination.currentPage}
        totalItems={state.pagination.totalItems}
        itemsPerPage={state.pagination.itemsPerPage}
        onPageChange={handlePageChange}
    />


    <!-- 编辑用户模态框 -->
    <DynamicModal 
        show={showEditUser}
        title={editingUser ? `编辑用户 - ${editingUser.name}` : '编辑用户'}
        size="lg"
        type="info"
        onClose={handleCancelEdit}
    >
        <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); handleSaveUser(); }}>
            <!-- 姓名 -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input 
                    id="name"
                    type="text"
                    bind:value={editFormData.name}
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
                    bind:value={editFormData.email}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                />
            </div>

            <!-- 用户类型 -->
            <div>
                <label for="userType" class="block text-sm font-medium text-gray-700 mb-1">用户类型</label>
                <select 
                    id="userType"
                    bind:value={editFormData.userType}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="">请选择用户类型</option>
                    <option value="ADMIN">管理员</option>
                    <option value="USER">普通用户</option>
                    <option value="GUEST">访客</option>
                </select>
            </div>

            <!-- 状态 -->
            <div class="flex items-center">
                <input 
                    id="isDisabled"
                    type="checkbox"
                    bind:checked={editFormData.isDisabled}
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
                    onclick={handleCancelEdit}
                >
                    取消
                </button>
                <button 
                    type="button"
                    class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
                    onclick={handleSaveUser}
                >
                    保存
                </button>
            </div>
        </svelte:fragment>
    </DynamicModal>
</div>