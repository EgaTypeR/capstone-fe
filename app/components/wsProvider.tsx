'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
    ws: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws/get-notification");
        
        socket.onopen = () => console.log("WebSocket connected");
        socket.onerror = (error) => console.log("WebSocket Error:" + error)
        socket.onclose = () => console.log("WebSocket disconnected");

        setWs(socket);

        // Clean up WebSocket on component unmount
        return () => {
          if (socket.readyState === 1) { // <-- This is important
              socket.close();
              console.log("WS Connection Closed")
          }
      }
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook for accessing WebSocket context
export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
