import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import RouterLink from 'next/link';
import { paths } from '@/paths';


export interface NotificationListItemProps {
  type: string;
  message:string;
  isRead: boolean;
  time: string;
  onClick: () => void; // Thêm prop mới
}

export function NotificationListItem({
  type,
  message,
  isRead,
  time,
  onClick, // Nhận callback từ cha
}: NotificationListItemProps): React.JSX.Element {
  const getHref = () => {
    if (type === 'BorrowEquipmentRequest') {
      return paths.user.borrowequipmentrequests;
    }
    if (type === 'BorrowRoomRequest') {
      return paths.user.borrowroomrequests;
    }
   
    return '#';
  };

  return (
    <ListItem
      component={RouterLink}
      href={getHref()}
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
