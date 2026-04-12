# SignalR 服务使用指南

## 概述

这个 SignalR 服务提供了一个简单、非阻塞的方式来连接到 SignalR Hub，并处理实时通信。

## 文件结构

本服务包含两个文件，它们有不同的作用和职责：

### 1. `signalr.ts` - 核心服务

这是 **SignalR 的核心服务类**，包含了所有 SignalR 连接的核心逻辑：

- **连接管理**：`startConnection()`, `stopConnection()`
- **事件监听**：`on()`, `off()`
- **方法调用**：`invoke()`
- **状态管理**：`getConnectionStatus()`
- **自动重连机制**
- **错误处理**

它导出了一个单例实例：`signalRService`

### 2. `useSignalR.ts` - 便捷 Hook

这是一个 **便捷的 Hook 函数**，是对 `signalRService` 的封装：

- 它内部调用 `signalRService` 的方法
- 提供了更简洁的 API 接口
- 适合在组件中使用

### 两者的关系

```
useSignalR.ts (便捷 Hook)
    ↓ 调用
signalr.ts (核心服务)
    ↓ 使用
@microsoft/signalr (SignalR 库)
```

### 使用建议

**推荐直接使用 `signalRService`**，因为：
1. `useSignalR.ts` 没有提供实质性的功能增强
2. 直接使用 `signalRService` 更直观
3. 减少了一层不必要的抽象

## 特性

- ✅ 非阻塞连接：使用异步连接，不会阻塞应用程序
- ✅ 自动重连：内置自动重连机制，最多尝试 5 次
- ✅ 错误处理：完善的错误处理和日志记录
- ✅ 浏览器环境检测：自动检测是否在浏览器环境中运行
- ✅ TypeScript 支持：完整的 TypeScript 类型支持

## 配置

在 `.env` 文件中配置 SignalR 端点：

```env
VITE_SINGNALR_ENDPOINT=http://localhost:5231/hub/menu
```

## 使用方法

### 1. 在组件中使用

```svelte
<script lang="ts">
    import { useSignalR } from '$lib/services/useSignalR';
    import { onMount, onDestroy } from 'svelte';

    const { on, off, invoke, isConnected } = useSignalR();
    let messages = [];

    onMount(() => {
        // 监听服务器事件
        on('ReceiveMessage', (user, message) => {
            messages = [...messages, { user, message }];
        });
    });

    onDestroy(() => {
        // 移除事件监听器
        off('ReceiveMessage');
    });

    async function sendMessage() {
        // 调用服务器方法
        await invoke('SendMessage', '用户', '你好！');
    }
</script>

<div>
    {#if isConnected()}
        <p>已连接到 SignalR</p>
    {:else}
        <p>未连接到 SignalR</p>
    {/if}
    
    <button on:click={sendMessage}>发送消息</button>
    
    <ul>
        {#each messages as msg}
            <li>{msg.user}: {msg.message}</li>
        {/each}
    </ul>
</div>
```

### 2. 直接使用 SignalR 服务

```typescript
import { signalRService } from '$lib/services/signalr';

// 监听事件
signalRService.on('ReceiveMessage', (user, message) => {
    console.log(`${user}: ${message}`);
});

// 调用服务器方法
await signalRService.invoke('SendMessage', '用户', '你好！');

// 检查连接状态
const connected = signalRService.getConnectionStatus();
```

## API 参考

### `signalRService`

#### 方法

- `startConnection(): Promise<void>` - 启动 SignalR 连接
- `stopConnection(): Promise<void>` - 停止 SignalR 连接
- `on(eventName: string, callback: (...args: any[]) => void): void` - 监听服务器事件
- `off(eventName: string, callback?: (...args: any[]) => void): void` - 移除事件监听器
- `invoke(methodName: string, ...args: any[]): Promise<any>` - 调用服务器方法
- `getConnectionStatus(): boolean` - 获取连接状态

### `useSignalR()`

返回一个对象，包含以下方法：

- `on(eventName: string, callback: (...args: any[]) => void)` - 监听服务器事件
- `off(eventName: string, callback?: (...args: any[]) => void)` - 移除事件监听器
- `invoke(methodName: string, ...args: any[]): Promise<any>` - 调用服务器方法
- `isConnected(): boolean` - 检查连接状态

## 重连机制

服务内置了自动重连机制，重连策略如下：

- 第 1 次重连：1 秒后
- 第 2 次重连：2 秒后
- 第 3 次重连：4 秒后
- 第 4 次重连：8 秒后
- 第 5 次重连：16 秒后
- 最多尝试 5 次，之后停止重连

## 错误处理

所有错误都会被捕获并记录到控制台，不会影响应用程序的正常运行。

## 注意事项

1. SignalR 连接只在浏览器环境中启动，服务器端渲染时不会连接
2. 连接是异步的，不会阻塞应用程序的启动
3. 建议在 `onMount` 中添加事件监听器，在 `onDestroy` 中移除事件监听器
4. 调用 `invoke` 方法前，建议先检查连接状态
