'use client';

import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '@/firebase/config';

export const requestNotificationPermission = async (): Promise<string | null> => {
  if (!messaging) return null;
  
  try {
    // Check if notification permission is granted
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      console.log('Notification permission not granted');
      return null;
    }
    
    // Get FCM token
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
    });
    
    if (token) {
      console.log('FCM Token:', token);
      
      // Here you would typically send this token to your server
      // saveTokenToServer(token);
      
      return token;
    } else {
      console.log('No FCM token available');
      return null;
    }
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
};

export const onMessageListener = () => {
  if (!messaging) return () => {};
  
  return onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    
    // Handle the message
    const { notification } = payload;
    
    if (notification) {
      const { title, body } = notification;
      
      // Display browser notification
      new Notification(title || 'New Notification', {
        body: body || '',
        icon: '/notification-icon.png'
      });
    }
  });
};