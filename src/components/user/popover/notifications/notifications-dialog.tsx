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

export function NotificationsDialog({ open, onClose }: NotificationsDialogProps): React.JSX.Element {
  const notifications = [
    { id: 1, type: 'BorrowEquipmentRequest', message: 'Đươn mượn thiết bị mã ORD đã được phê duyệt', isRead: false, time: '2 giờ trước' },
    { id: 2, type: 'BorrowRoomRequest', message: 'Đơn mượn phòng BRR-09 đã được phê duyệt', isRead: true, time: '1 ngày trước' },
    { id: 3, type: 'CrashReports', message: 'Báo cáo sự cố mã CR-010', isRead: false, time: '3 giờ trước' },
    { id: 4, type: 'BorrowEquipmentRequest', message: 'Đơn mượn thiết bị mã BER-10 đã bị từ chối', isRead: true, time: '2 ngày trước' },
  ];



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Danh sách thông báo</DialogTitle>
      <DialogContent>
        <List>
          {notifications.map((item) => (
            <React.Fragment key={item.id}>
              <NotificationListItem
                type={item.type}
                message={item.message}
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
