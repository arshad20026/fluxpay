"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

type WSMessageType = 
    | 'CONNECTED' 
    | 'AUTH_SUCCESS' 
    | 'NEW_TRANSACTION' 
    | 'BALANCE_UPDATE' 
    | 'SECURITY_ALERT' 
    | 'PONG';

interface WSMessage {
    type: WSMessageType;
    payload: any;
}

interface UseWebSocketReturn {
    isConnected: boolean;
    lastMessage: WSMessage | null;
    sendMessage: (type: string, payload?: any) => void;
    balance: number | null;
    notifications: WSMessage[];
    clearNotifications: () => void;
}

export function useWebSocket(): UseWebSocketReturn {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [notifications, setNotifications] = useState<WSMessage[]>([]);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttempts = useRef(0);

    const connect = useCallback(() => {
        if (typeof window === 'undefined') return;

        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000/ws';
        
        try {
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                reconnectAttempts.current = 0;

                const token = localStorage.getItem('token');
                if (token) {
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    ws.send(JSON.stringify({
                        type: 'AUTH',
                        payload: { userId: user.id }
                    }));
                }
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data) as WSMessage;
                    setLastMessage(message);

                    switch (message.type) {
                        case 'NEW_TRANSACTION':
                            setNotifications(prev => [message, ...prev].slice(0, 20));
                            break;
                        case 'BALANCE_UPDATE':
                            setBalance(message.payload.balance);
                            break;
                        case 'SECURITY_ALERT':
                            setNotifications(prev => [message, ...prev].slice(0, 20));
                            break;
                    }
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                setIsConnected(false);

                if (reconnectAttempts.current < 5) {
                    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
                    reconnectTimeoutRef.current = setTimeout(() => {
                        reconnectAttempts.current++;
                        connect();
                    }, delay);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
        }
    }, []);

    useEffect(() => {
        connect();

        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [connect]);

    const sendMessage = useCallback((type: string, payload?: any) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type, payload }));
        }
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return {
        isConnected,
        lastMessage,
        sendMessage,
        balance,
        notifications,
        clearNotifications,
    };
}

export function useRealtimeBalance() {
    const { balance, isConnected } = useWebSocket();
    return { balance, isConnected };
}
