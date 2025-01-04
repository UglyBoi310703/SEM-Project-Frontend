import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { NotificationListItem } from './notification-list-item';
import type { Notifications } from '@/components/user/popover/notifications/notifications-popover';

export interface NotificationsDialogProps {
  open: boolean; // Kiểm soát trạng thái mở
  onClose: () => void; // Callback đóng dialog
  handleMaskasRead: (id: number) => void; // Đánh dấu thông báo đã đọc
  notifications: Notifications[];
}

export function NotificationsDialog({
  open,
  onClose,
  handleMaskasRead,
  notifications,
}: NotificationsDialogProps): React.JSX.Element {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Danh sách thông báo
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          {notifications.map((item) => (
            <React.Fragment key={item.id}>
              <NotificationListItem
                message={item.message}
                isRead={item.read}
                time={item.time}
                onClick={() => handleMaskasRead(item.id)} // Truyền callback đánh dấu đã đọc
              />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
