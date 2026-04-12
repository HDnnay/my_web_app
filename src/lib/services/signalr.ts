import * as signalR from '@microsoft/signalr';
import { browser } from '$app/environment';

class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private isConnected = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;

    async startConnection(): Promise<void> {
        if (!browser) {
            return;
        }

        const endpoint = import.meta.env.VITE_SINGNALR_ENDPOINT;
        
        if (!endpoint) {
            console.error('SignalR endpoint is not defined in environment variables');
            return;
        }

        try {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(endpoint)
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: retryContext => {
                        if (retryContext.previousRetryCount < this.maxReconnectAttempts) {
                            return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000);
                        }
                        return null;
                    }
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();

            this.connection.onclose((error) => {
                this.isConnected = false;
                console.error('SignalR connection closed:', error);
            });

            this.connection.onreconnecting((error) => {
                this.isConnected = false;
                console.warn('SignalR reconnecting:', error);
            });

            this.connection.onreconnected((connectionId) => {
                this.isConnected = true;
                console.log('SignalR reconnected:', connectionId);
            });

            await this.connection.start();
            this.isConnected = true;
            console.log('SignalR connected successfully');
        } catch (error) {
            console.error('Error starting SignalR connection:', error);
            this.isConnected = false;
        }
    }

    async stopConnection(): Promise<void> {
        if (this.connection) {
            try {
                await this.connection.stop();
                this.isConnected = false;
                console.log('SignalR connection stopped');
            } catch (error) {
                console.error('Error stopping SignalR connection:', error);
            }
        }
    }

    on(eventName: string, callback: (...args: any[]) => void): void {
        if (this.connection) {
            this.connection.on(eventName, callback);
        }
    }

    off(eventName: string, callback?: (...args: any[]) => void): void {
        if (this.connection) {
            this.connection.off(eventName, callback);
        }
    }

    async invoke(methodName: string, ...args: any[]): Promise<any> {
        if (this.connection && this.isConnected) {
            try {
                return await this.connection.invoke(methodName, ...args);
            } catch (error) {
                console.error(`Error invoking ${methodName}:`, error);
                throw error;
            }
        } else {
            console.warn('SignalR connection is not established');
            return null;
        }
    }

    getConnectionStatus(): boolean {
        return this.isConnected;
    }
}

export const signalRService = new SignalRService();
