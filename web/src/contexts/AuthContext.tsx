'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  GoogleAuthProvider, 
  User, 
  UserCredential, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as authSignOut,

} from 'firebase/auth';
import { auth } from '@/firebase/config';
import { FirebaseError } from 'firebase/app';
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  // New error state for improved error handling

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);  // Start loading when sign-in begins
      return await signInWithPopup(auth, provider);
    } catch (error) {
  if (error instanceof FirebaseError) {
    setError(`Authentication failed: ${error.message}`);
  } else {
    setError('An unknown error occurred during Google sign-in');
  }
  console.error('Google sign-in error:', error);
  throw error;
}
 finally {
      setLoading(false);  // Set loading to false when done
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await authSignOut(auth);
    } catch (error) {
      if (error instanceof FirebaseError) {
  setError(`Authentication failed: ${error.message}`);
} else {
        setError('An unknown error occurred during sign-out');
      }
      console.error('Sign-out error:', error);
      throw error;
    } finally {
      setLoading(false);  // Set loading to false after sign-out completes
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}  {/* Display errors */}
    </AuthContext.Provider>
  );
};
