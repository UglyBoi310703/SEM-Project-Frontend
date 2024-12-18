import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
export interface NotificationListItemProps {
  type: 'approval' | 'report';
  code: string;
  status: 'approved' | 'rejected';
  isRead: boolean;
  time: string;
}

export function NotificationListItem({
  type,
  code,
  status,
  isRead,
  time,
}: NotificationListItemProps): React.JSX.Element {
  const getMessage = () => {
    if (type === 'approval') {
      return `Đơn mượn thiết bị mã ${code} đã được ${status === 'approved' ? 'phê duyệt' : 'từ chối'}.`;
    }
    if (type === 'report') {
      return `Báo cáo sự cố mã ${code} đã được ${status === 'approved' ? 'phê duyệt' : 'từ chối'}.`;
    }
    return '';
  };
  return (
    <ListItem
    component={RouterLink} href={paths.dashboard.settings} 
      sx={{
        backgroundColor: isRead ? 'transparent' : '#f0f8ff', // Nền nhạt cho chưa đọc
        '&:hover': { backgroundColor: '#f7f7f7' },
        cursor: 'pointer',
        
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
