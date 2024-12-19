import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { NotificationListItem } from './notification-list-item';

export interface NotificationsDialogProps {
  open: boolean; // Kiểm soát trạng thái mở
  onClose: () => void; // Hàm đóng dialog
  tabValue: string; // Giá trị tab hiện tại
}

export function NotificationsDialog({ open, onClose, tabValue }: NotificationsDialogProps): React.JSX.Element {
  const notifications = [
    { id: 1, type: 'BorrowEquipmentRequest', code: '009', isRead: false, time: '2 giờ trước' },
    { id: 2, type: 'BorrowRoomRequest', code: 'CR-09', isRead: true, time: '1 ngày trước' },
    { id: 3, type: 'CrashReports', code: '010', isRead: false, time: '3 giờ trước' },
    { id: 4, type: 'BorrowEquipmentRequest', code: 'CR-10', isRead: true, time: '2 ngày trước' },
  ];

  const filteredNotifications = notifications.filter((n) => {
    if (tabValue === 'unread') return !n.isRead;
    return true;
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
                isRead={item.isRead}
                time={item.time}
                onClick={onClose} // Truyền callback đóng dialog
              />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
