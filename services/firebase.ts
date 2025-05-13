// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Optional: import other Firebase services as needed
import { getAnalytics } from 'firebase/analytics';

// ✅ Make sure this is EXACTLY correct
const firebaseConfig = {
  apiKey: "AIzaSyB7rGS8TB-6yptWX7hz15KJtiPox3oG4VY",
  authDomain: "jobassignment-2aebf.firebaseapp.com",
  projectId: "jobassignment-2aebf",
  storageBucket: "jobassignment-2aebf.appspot.com", // ✅ Fix this
  messagingSenderId: "714300714291",
  appId: "1:714300714291:web:3f258af01c6ef83b7da246",
  measurementId: "G-B3CHK0BS3Z"
};

// Initialize Firebase App only once
const app = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
