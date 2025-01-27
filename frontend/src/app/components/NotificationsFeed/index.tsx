// src/components/NotificationsFeed.jsx

import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { formatDistanceToNow } from 'date-fns';

const NotificationsFeed = ({ notifications }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.notification_id}>
            <NotificationsIcon color={notification.notification_type === 'error' ? 'error' : 'primary'} />
            <ListItemText
              primary={notification.message}
              secondary={formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            />
            {!notification.read && <Badge color="secondary" variant="dot" />}
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default NotificationsFeed;