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
      const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const authToken = localStorage.getItem('token') || '';
      const newSocket = io(serverUrl, {
        auth: { token: authToken },
        query: { userId, token: authToken },
        autoConnect: true,
        reconnectionAttempts: 5,
        timeout: 4000
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