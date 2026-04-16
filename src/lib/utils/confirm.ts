// 全局确认对话框函数

// 显示确认对话框并返回 Promise
export function confirm(options?: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}): Promise<boolean> {
    return new Promise((resolve) => {
        // 创建对话框元素
        const dialog = document.createElement('div');
        dialog.id = 'global-confirm-dialog';
        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 400px;
            z-index: 10000;
        `;
        
        // 设置对话框内容
        const config = {
            title: options?.title || '确认',
            message: options?.message || '确定要执行此操作吗？',
            confirmText: options?.confirmText || '确定',
            cancelText: options?.cancelText || '取消'
        };
        
        content.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 16px;">${config.title}</h3>
            <p style="margin-bottom: 24px;">${config.message}</p>
            <div style="display: flex; justify-content: flex-end; gap: 12px;">
                <button id="confirm-cancel" style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background-color: white; cursor: pointer;">
                    ${config.cancelText}
                </button>
                <button id="confirm-ok" style="padding: 8px 16px; border: none; border-radius: 4px; background-color: #00c950; color: white; cursor: pointer;">
                    ${config.confirmText}
                </button>
            </div>
        `;
        
        dialog.appendChild(content);
        document.body.appendChild(dialog);
        
        // 添加事件监听器
        const cancelBtn = content.querySelector('#confirm-cancel') as HTMLButtonElement;
        const okBtn = content.querySelector('#confirm-ok') as HTMLButtonElement;
        
        const handleCancel = () => {
            resolve(false);
            document.body.removeChild(dialog);
        };
        
        const handleConfirm = () => {
            resolve(true);
            document.body.removeChild(dialog);
        };
        
        cancelBtn.onclick = handleCancel;
        okBtn.onclick = handleConfirm;
    });
}