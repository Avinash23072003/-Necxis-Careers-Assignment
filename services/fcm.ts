import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// This file provides a mock implementation for FCM since we can't directly use Firebase
// Cloud Messaging with Expo unless using EAS Build or developing a custom native module

// Set notification handler for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Function to register for push notifications
export async function registerForPushNotificationsAsync() {
  let token;
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    
    // This would be where you'd get the FCM token in a real implementation
    // For demonstration, we're using Expo's notification token system
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.expoProjectId,
    })).data;
    
    console.log('Push Notification Token:', token);
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

// Function to send FCM token to the web app
export function sendFCMTokenToWebView(webViewRef: any, token: string) {
  if (webViewRef.current && token) {
    const script = `
      if (window.setFCMToken) {
        window.setFCMToken("${token}");
      } else {
        // Store for later when the web app is ready
        localStorage.setItem("pendingFCMToken", "${token}");
      }
      true;
    `;
    webViewRef.current.injectJavaScript(script);
  }
}

// Listen for incoming notifications
export function addNotificationListener(callback: (notification: Notifications.Notification) => void) {
  return Notifications.addNotificationReceivedListener(callback);
}

// Listen for notification interactions
export function addNotificationResponseListener(callback: (response: Notifications.NotificationResponse) => void) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}