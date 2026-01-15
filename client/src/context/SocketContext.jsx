import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            // Connect to the Gateway, which forwards /socket.io to the service
            // We don't need to specify port 5003 here, we go through port 8000 -> 3000 (proxy) or direct env?
            // Since we are using Vite proxy for /api, we should probably check if Vite proxies WS too.
            // Vite config has changeOrigin: true, but maybe not ws: true explicitly for /socket.io path?
            // Let's assume we connect to window.location.origin (which goes to Vite -> Gateway)
            // Actually, standard practice is to point to the API URL.

            // Connect through API Gateway
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const newSocket = io(apiUrl, {
                path: '/socket.io',
                auth: {
                    token: token
                },
                transports: ['websocket', 'polling'] // Try websocket first, fallback to polling
            });

            newSocket.on('connect', () => {
                console.log('Socket connected');
                setIsConnected(true);
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
                setIsConnected(false);
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            setSocket(newSocket);

            return () => newSocket.close();
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
