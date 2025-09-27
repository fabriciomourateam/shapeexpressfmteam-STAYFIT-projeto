import { useState, useEffect, useCallback } from 'react';

interface NotificationPermission {
  permission: NotificationPermission;
  isSupported: boolean;
  isEnabled: boolean;
}

export function useNotifications() {
  const [notificationState, setNotificationState] = useState<NotificationPermission>({
    permission: 'default',
    isSupported: false,
    isEnabled: false
  });

  // Verificar suporte e solicitar permissão automaticamente
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationState(prev => ({
        ...prev,
        isSupported: true,
        permission: Notification.permission,
        isEnabled: Notification.permission === 'granted'
      }));

      // Solicitar permissão automaticamente se ainda não foi concedida
      if (Notification.permission === 'default') {
        requestPermission();
      } else if (Notification.permission === 'granted') {
        // Se já tem permissão, agendar notificações
        scheduleDailyNotifications();
      }
    }
  }, []);

  // Solicitar permissão
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const isGranted = permission === 'granted';
      
      setNotificationState(prev => ({
        ...prev,
        permission,
        isEnabled: isGranted
      }));

      if (isGranted) {
        // Agendar notificações diárias
        scheduleDailyNotifications();
      }

      return isGranted;
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
      return false;
    }
  }, []);

  // Agendar notificações diárias
  const scheduleDailyNotifications = useCallback(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SCHEDULE_NOTIFICATIONS'
      });
    }
  }, []);

  // Enviar notificação imediata
  const sendNotification = useCallback((title: string, body: string, options?: NotificationOptions) => {
    if (notificationState.isEnabled) {
      new Notification(title, {
        body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        vibrate: [200, 100, 200],
        ...options
      });
    }
  }, [notificationState.isEnabled]);


  return {
    ...notificationState,
    requestPermission,
    sendNotification,
    scheduleDailyNotifications
  };
}
