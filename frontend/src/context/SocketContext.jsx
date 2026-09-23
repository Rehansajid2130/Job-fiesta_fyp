import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    try {
      const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const newSocket = io(serverUrl, {
        query: { userId },
        autoConnect: false, // Prevents aggressive reconnection spam if backend is not running
        reconnectionAttempts: 2,
        timeout: 2000
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    } catch (err) {
      console.warn('Socket connection optional/inactive:', err.message);
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};