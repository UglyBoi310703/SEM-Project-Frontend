import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { NotificationListItem } from './notification-list-item';
import Button from '@mui/material/Button';

export interface NotificationsDialogProps {
  open: boolean;
  onClose: () => void;
  tabValue: string; // Thêm prop này để nhận giá trị tab
}

export function NotificationsDialog({ open, onClose, tabValue }: NotificationsDialogProps): React.JSX.Element {
  const notifications = [
    { id: 1, type: 'approval', code: '009', status: 'approved', isRead: false, time: '2 giờ trước' },
    { id: 2, type: 'report', code: 'CR-09', status: 'approved', isRead: true, time: '1 ngày trước' },
    { id: 3, type: 'approval', code: '010', status: 'rejected', isRead: false, time: '3 giờ trước' },
    { id: 4, type: 'report', code: 'CR-10', status: 'rejected', isRead: true, time: '2 ngày trước' },
  ];

  // Lọc thông báo theo tab
  const filteredNotifications = notifications.filter((n) => {
    if (tabValue === 'unread') return !n.isRead; // Chỉ thông báo chưa đọc
    return true; // Tất cả thông báo
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Danh sách thông báo</DialogTitle>
      <DialogContent>
        <List>
          {filteredNotifications.map((item) => (
            <React.Fragment key={item.id}>
              <NotificationListItem
                type={item.type}
                code={item.code}
                status={item.status}
                isRead={item.isRead}
                time={item.time}
              />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
