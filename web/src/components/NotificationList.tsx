import { useEffect, useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Typography, 
  Paper,
  ListItemAvatar,
  Avatar,
  Box
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { formatDistanceToNow } from '@/utils/dateUtils';

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome',
      body: 'Welcome to our application! We hope you enjoy using it.',
      timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      read: false
    },
    {
      id: '2',
      title: 'Profile Updated',
      body: 'Your profile has been updated successfully.',
      timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      read: true
    },
    {
      id: '3',
      title: 'New Feature Available',
      body: 'Check out our new messaging feature!',
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
      read: true
    }
  ]);

  useEffect(() => {
    // In a real app, you would load notifications from your backend or Firebase
    // For example:
    // const fetchNotifications = async () => {
    //   const userNotifications = await getNotificationsFromFirebase(user.uid);
    //   setNotifications(userNotifications);
    // };
    // fetchNotifications();
  }, []);

  if (notifications.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          backgroundColor: '#f5f5f5', 
          borderRadius: 2,
          textAlign: 'center' 
        }}
      >
        <NotificationsIcon color="disabled" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="body1">
          You don't have any notifications yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
      {notifications.map((notification) => (
        <ListItem 
          key={notification.id}
          alignItems="flex-start"
          sx={{ 
            mb: 1, 
            backgroundColor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
            borderRadius: 1,
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: notification.read ? 'grey.400' : 'primary.main' }}>
              <NotificationsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography 
                variant="subtitle1" 
                fontWeight={notification.read ? 'normal' : 'bold'}
              >
                {notification.title}
              </Typography>
            }
            secondary={
              <Box sx={{ mt: 0.5 }}>
                <Typography 
                  variant="body2" 
                  color="text.primary" 
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  {notification.body}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                >
                  {formatDistanceToNow(notification.timestamp)}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}