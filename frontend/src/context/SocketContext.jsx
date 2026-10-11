import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext({ socket: null, isConnected: false });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId: propUserId }) => {
  const auth = useAuth ? useAuth() : {};
  const user = auth?.user;
  const token = auth?.token;

  const currentUserId = user?.id || user?._id || propUserId || localStorage.getItem('userId');
  const currentToken = token || localStorage.getItem('token') || '';

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!currentUserId) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    try {
      const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const newSocket = io(serverUrl, {
        auth: { token: currentToken },
        query: { userId: currentUserId, token: currentToken },
        autoConnect: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 5000,
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('[SocketContext] Connected to real-time server:', newSocket.id);
        newSocket.emit('join_user');
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('[SocketContext] Disconnected from real-time server');
      });

      newSocket.on('connect_error', (err) => {
        setIsConnected(false);
        console.warn('[SocketContext] Connection warning:', err.message);
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    } catch (err) {
      console.warn('Socket connection optional/inactive:', err.message);
    }
  }, [currentUserId, currentToken]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};