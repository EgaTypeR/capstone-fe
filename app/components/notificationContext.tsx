// NotificationContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
    unreadCount: number;
    incrementCount: () => void;
    setUnreadNotifCount: (num: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    const incrementCount = () => {
        setUnreadCount(prevCount => prevCount + 1);
    };

    const setUnreadNotifCount = (num: number) =>{
        setUnreadCount(num)
    }

    return (
        <NotificationContext.Provider value={{ unreadCount, incrementCount, setUnreadNotifCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
