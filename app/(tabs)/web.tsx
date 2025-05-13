import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

// This would be your deployed Next.js app URL in production
const WEB_APP_URL = 'http://localhost:3000';

export default function WebScreen() {
  const [isLoading, setIsLoading] = useState(true);

  // JavaScript to inject into the WebView to handle FCM token
  const injectedJavaScript = `
    // Function to send message to React Native
    const sendToRN = (data) => {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    };
    
    // Add a global function to receive FCM token from React Native
    window.setFCMToken = (token) => {
      // Store the token in localStorage or pass it to your web app
      localStorage.setItem('fcmToken', token);
      console.log('FCM token set in web app:', token);
      
      // You might want to refresh certain parts of your web app
      // or call specific functions that need the token
      if (window.onFCMTokenReceived) {
        window.onFCMTokenReceived(token);
      }
    };
    
    // Let React Native know the web app is ready
    sendToRN({ type: 'WEB_APP_READY' });
    
    true;
  `;

  // Handle messages from the web app
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('Message from web app:', data);
      
      // Handle different message types
      switch (data.type) {
        case 'WEB_APP_READY':
          console.log('Web app is ready');
          // Here you would get the FCM token and send it to the web app
          // getFCMToken().then(token => {
          //   if (token) {
          //     webViewRef.current.injectJavaScript(`window.setFCMToken("${token}"); true;`);
          //   }
          // });
          break;
          
        case 'NOTIFICATION_PERMISSION_REQUESTED':
          // Handle notification permission request if needed
          break;
          
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing message from web app:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
        </View>
      )}
      
      <WebView
        source={{ uri: WEB_APP_URL }}
        style={styles.webview}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
    zIndex: 1000,
  },
});