# Next.js + Expo Integrated App with Firebase Authentication

This project integrates a Next.js web application with an Expo mobile app and includes Firebase Authentication and Firebase Cloud Messaging for push notifications.

## Project Structure

- `/` - Root directory containing the Expo mobile app
- `/web` - Next.js web application

## Prerequisites

1. Firebase project with Authentication and Cloud Messaging enabled
2. Google Cloud Platform project with the Identity Provider configured

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
# Install Expo app dependencies
npm install

# Install Next.js app dependencies
cd web
npm install
cd ..
```

### 3. Configure Firebase

1. Create a `.env` file in the root directory using the `.env.example` template
2. Create a `.env.local` file in the `/web` directory using the `.env.local.example` template
3. Fill in your Firebase configuration values in both files

### 4. Start the development servers

```bash
# Start the Next.js development server
npm run web:dev

# In a new terminal, start the Expo development server
npm run dev
```

## Firebase Configuration

### Authentication

This project uses Firebase Authentication with Google Sign-In. To set up:

1. Enable Google provider in Firebase Console > Authentication > Sign-in method
2. Configure the OAuth consent screen in Google Cloud Console
3. Add authorized domains in Firebase Console

### Cloud Messaging (FCM)

To configure FCM:

1. Generate a VAPID key in Firebase Console > Project Settings > Cloud Messaging
2. Update the `.env.local` file in the `/web` directory with your VAPID key
3. Configure the Firebase service worker in `/web/public/firebase-messaging-sw.js`

## Mobile App Features

- Tab-based navigation
- WebView integration of Next.js app
- Profile management
- Push notification handling

## Web App Features

- Material UI components
- Google authentication
- Responsive design
- Notification management

## Building for Production

### Web App

```bash
npm run web:build
```

### Expo App

```bash
# For Android
eas build --platform android

# For iOS
eas build --platform ios
```

## Notes

- The FCM implementation in the Expo app uses a mock implementation for demonstration. In a production environment, you would need to use a native module or EAS Build to fully implement FCM.
- For complete FCM functionality on Android, you would need to add the `google-services.json` file to your project.