import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';



export interface NotificationListItemProps {
  message:string;
  isRead: boolean;
  time: string;
  onClick: () => void; // Thêm prop mới
}

export function NotificationListItem({

  message,
  isRead,
  time,
  onClick, // Nhận callback từ cha
}: NotificationListItemProps): React.JSX.Element {
 
  return (
    <ListItem
      onClick={onClick} // Gọi callback khi click
      sx={{
        backgroundColor: isRead ? 'transparent' : '#f0f8ff',
        '&:hover': { backgroundColor: '#f7f7f7' },
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
        px: 2,
      }}
    >
    <ListItemText
        primary={message}
        secondary={
          <Typography component="span" variant="body2" color="text.secondary">
            {time}
          </Typography>
        }
      />
      {!isRead && <CircleIcon sx={{ fontSize: 12, color: 'primary.main', ml: 1 }} />}
    </ListItem>
  );
}
