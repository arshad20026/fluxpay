import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';

interface WSClient extends WebSocket {
    userId?: string;
    isAlive?: boolean;
}

interface WSMessage {
    type: string;
    payload: any;
}

class WebSocketManager {
    private wss: WebSocketServer | null = null;
    private clients: Map<string, WSClient> = new Map();

    initialize(server: Server) {
        this.wss = new WebSocketServer({ server, path: '/ws' });

        this.wss.on('connection', (ws: WSClient, req) => {
            const clientId = Math.random().toString(36).substring(7);
            ws.isAlive = true;
            ws.userId = clientId;
            this.clients.set(clientId, ws);

            console.log(`WebSocket client connected: ${clientId}`);

            ws.on('pong', () => {
                ws.isAlive = true;
            });

            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message.toString()) as WSMessage;
                    this.handleMessage(ws, data);
                } catch (error) {
                    console.error('WebSocket message error:', error);
                }
            });

            ws.on('close', () => {
                this.clients.delete(clientId);
                console.log(`WebSocket client disconnected: ${clientId}`);
            });

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                this.clients.delete(clientId);
            });

            this.send(ws, {
                type: 'CONNECTED',
                payload: { clientId, message: 'Connected to FluxPay WebSocket' }
            });
        });

        this.wss.on('error', (error) => {
            console.error('WebSocket Server error:', error);
        });

        setInterval(() => {
            this.wss?.clients.forEach((ws: WSClient) => {
                if (ws.isAlive === false) {
                    this.clients.forEach((client, id) => {
                        if (client === ws) this.clients.delete(id);
                    });
                    return ws.terminate();
                }
                ws.isAlive = false;
                ws.ping();
            });
        }, 30000);

        console.log('WebSocket server initialized');
    }

    private handleMessage(ws: WSClient, message: WSMessage) {
        switch (message.type) {
            case 'AUTH':
                ws.userId = message.payload.userId;
                this.clients.set(message.payload.userId, ws);
                this.send(ws, { type: 'AUTH_SUCCESS', payload: { userId: ws.userId } });
                break;
            case 'PING':
                this.send(ws, { type: 'PONG', payload: { timestamp: Date.now() } });
                break;
            default:
                console.log('Unknown message type:', message.type);
        }
    }

    send(ws: WebSocket, message: WSMessage) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    }

    broadcast(message: WSMessage) {
        this.wss?.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }

    sendToUser(userId: string, message: WSMessage) {
        const client = this.clients.get(userId);
        if (client && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    }

    notifyTransaction(userId: string, transaction: any) {
        this.sendToUser(userId, {
            type: 'NEW_TRANSACTION',
            payload: transaction
        });
    }

    notifyBalanceUpdate(userId: string, newBalance: number) {
        this.sendToUser(userId, {
            type: 'BALANCE_UPDATE',
            payload: { balance: newBalance }
        });
    }

    notifySecurityAlert(userId: string, alert: any) {
        this.sendToUser(userId, {
            type: 'SECURITY_ALERT',
            payload: alert
        });
    }
}

export const wsManager = new WebSocketManager();
