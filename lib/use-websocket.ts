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
    payload: unknown;
}

interface UseWebSocketReturn {
    isConnected: boolean;
    lastMessage: WSMessage | null;
    sendMessage: (type: string, payload?: unknown) => void;
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
    const isConnecting = useRef(false);
    const connectRef = useRef<() => void>(() => {});

    const connect = useCallback(() => {
        if (typeof window === 'undefined' || isConnecting.current) return;
        
        if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
            return;
        }

        isConnecting.current = true;
        const wsUrl = 'ws://localhost:5000/ws';
        
        try {
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                reconnectAttempts.current = 0;
                isConnecting.current = false;

                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('token');
                    if (token) {
                        try {
                            const user = JSON.parse(localStorage.getItem('user') || '{}');
                            ws.send(JSON.stringify({
                                type: 'AUTH',
                                payload: { userId: user.id }
                            }));
                        } catch (e) {
                            console.error('Failed to parse user data', e);
                        }
                    }
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
                            setBalance((message.payload as { balance: number }).balance);
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
                isConnecting.current = false;

                if (reconnectAttempts.current < 5) {
                    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
                    reconnectTimeoutRef.current = setTimeout(() => {
                        reconnectAttempts.current++;
                        connectRef.current();
                    }, delay);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                isConnecting.current = false;
            };
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
            isConnecting.current = false;
        }
    }, []);

    useEffect(() => {
        connectRef.current = connect;
    }, [connect]);

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

    const sendMessage = useCallback((type: string, payload?: unknown) => {
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
