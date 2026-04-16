<script lang="ts">
 let {
  title = '确认',
  message = '确定要执行此操作吗？',
  confirmText = '确定',
  cancelText = '取消',
  show = false,
  resolve = (value: boolean) => {}
 } = $props();

 console.log('ConfirmDialog show:', show);
</script>

{#if show}
  <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
    <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 400px; z-index: 10000;">
      <h3 style="margin-top: 0; margin-bottom: 16px;">{title}</h3>
      <p style="margin-bottom: 24px;">{message}</p>
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button 
          onclick={() => resolve(false)} 
          style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background-color: white; cursor: pointer;"
        >
          {cancelText}
        </button>
        <button 
          onclick={() => resolve(true)} 
          style="padding: 8px 16px; border: none; border-radius: 4px; background-color: #00c950; color: white; cursor: pointer;"
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}