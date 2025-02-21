export class WebSocketService {
    private socket: WebSocket | null = null;
    private url: string;
    private messageCallbacks: ((message: string) => void)[] = [];
    private clientCountCallbacks: ((count: number) => void)[] = [];

    constructor(url: string) {
        this.url = url;
    }
    public connect() {
        if (this.socket) {
            console.log('WebSocket 已连接');
            return;
        }
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            console.log('WebSocket 连接已打开');
        };
        this.socket.onerror = (error: Event) => {
            console.error('WebSocket 错误:', error);
        };
        // 监听 WebSocket 消息事件
        this.socket.onmessage = (event: MessageEvent) => {
            const message = event.data;
            console.log('(vue3: @/util/webSocket)收到消息:', message);
            
            // 如果消息中包含“当前连接的终端数”信息，处理并通知回调
            if (message.startsWith('当前连接的终端数:')) {
                const clientCount = parseInt(message.split(':')[1].trim());
                this.clientCountCallbacks.forEach(callback => callback(clientCount));
            } else {
                // 处理其他类型的消息
                this.messageCallbacks.forEach(callback => callback(message));
            }
        };
        this.socket.onclose = () => {
            console.log('WebSocket 连接已关闭');
        };
    }
    public sendMessage(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
            console.log('发送消息:', message);
        } else {
            console.error('WebSocket 未连接');
        }
    }
    public onMessage(callback: (message: string) => void) {
        this.messageCallbacks.push(callback);
    }
    public onClientCountChange(callback: (count: number) => void) {
        this.clientCountCallbacks.push(callback);
    }
    public close() {
        if (this.socket) {
            this.socket.close();
            console.log('WebSocket 已关闭');
        }
    }
}
