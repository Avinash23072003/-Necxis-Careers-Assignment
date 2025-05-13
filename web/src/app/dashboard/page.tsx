'use client';

import { useAuth } from '../../contexts/AuthContext';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Avatar,
  Divider
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NotificationList from '../../components/NotificationList';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          mb: 4
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            src={user.photoURL || undefined} 
            alt={user.displayName || 'User'} 
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h5" component="h1">
              Welcome, {user.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Recent Notifications
        </Typography>
        
        <NotificationList />
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={signOut}
            sx={{ 
              borderRadius: 2,
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}