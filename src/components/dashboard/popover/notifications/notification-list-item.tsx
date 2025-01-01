import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import RouterLink from 'next/link';
import { paths } from '@/paths';


export interface NotificationListItemProps {
  type: string;
  code: string;
  isRead: boolean;
  time: string;
  onClick: () => void; // Thêm prop mới
}

export function NotificationListItem({
  type,
  code,
  isRead,
  time,
  onClick, // Nhận callback từ cha
}: NotificationListItemProps): React.JSX.Element {
  const getHref = () => {
    if (type === 'BorrowEquipmentRequest') {
      return paths.dashboard.borrowequipmentrequests;
    }
    if (type === 'BorrowRoomRequest') {
      return paths.dashboard.borrowroomrequests;
    }
   
    return '#';
  };

  const getMessage = () => {
    if (type === 'BorrowEquipmentRequest') {
      return `Đơn mượn thiết bị mã ${code} đang chờ phê duyệt.`;
    }
    if (type === 'BorrowRoomRequest') {
      return `Đơn mượn phòng mã ${code} đang chờ phê duyệt.`;
    }
    if (type === 'CrashReports') {
      return `Báo cáo sự cố mã ${code} đang chờ phê duyệt.`;
    }
    return '';
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
        primary={getMessage()}
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
