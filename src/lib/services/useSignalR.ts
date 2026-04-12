import { signalRService } from './signalr';

export function useSignalR() {
    const on = (eventName: string, callback: (...args: any[]) => void) => {
        signalRService.on(eventName, callback);
    };

    const off = (eventName: string, callback?: (...args: any[]) => void) => {
        signalRService.off(eventName, callback);
    };

    const invoke = async (methodName: string, ...args: any[]): Promise<any> => {
        return await signalRService.invoke(methodName, ...args);
    };

    const isConnected = () => {
        return signalRService.getConnectionStatus();
    };

    return {
        on,
        off,
        invoke,
        isConnected
    };
}
