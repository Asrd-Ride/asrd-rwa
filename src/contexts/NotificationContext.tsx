"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Premium3DNotification from '@/components/ui/Premium3DNotification';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'premium';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.map(notification => (
        <Premium3DNotification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
          duration={notification.duration}
        />
      ))}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
