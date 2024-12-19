"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { NotificationListItem } from './notification-list-item';
import { NotificationsDialog } from './notifications-dialog';

export interface NotificationsPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function NotificationsPopover({ anchorEl, onClose, open }: NotificationsPopoverProps): React.JSX.Element {
  const [tabValue, setTabValue] = React.useState('all');
  const [showAllDialog, setShowAllDialog] = React.useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // Hàm mở Dialog và đóng Popover
  const handleOpenDialog = () => {
    onClose(); // Đóng Popover
    setShowAllDialog(true); // Mở Dialog
  };

  const handleCloseDialog = () => {
    setShowAllDialog(false); // Đóng Dialog
  };

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
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: '360px' } } }}
      >
        {/* Header */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Thông báo
          </Typography>
        </Box>
        <Divider />

        {/* Tabs */}
        <Tabs value={tabValue} onChange={handleChangeTab} variant="fullWidth">
          <Tab label="Tất cả" value="all" />
          <Tab label="Chưa đọc" value="unread" />
        </Tabs>
        <Divider />

        {/* Danh sách thông báo */}
        <Box>
          <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
            {filteredNotifications.slice(0, 3).map((item) => (
              <NotificationListItem
                key={item.id}
                type={item.type}
                code={item.code}
                isRead={item.isRead}
                time={item.time}
                onClick={onClose} // Đóng Popover khi nhấn vào thông báo
              />
            ))}
          </List>
          <Box sx={{ textAlign: 'center', p: 1 }}>
            {/* Nút Xem tất cả */}
            <Button onClick={handleOpenDialog} size="small">
              Xem tất cả
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Dialog hiển thị danh sách đầy đủ */}
      <NotificationsDialog
        open={showAllDialog}
        onClose={handleCloseDialog}
        tabValue={tabValue}
      />
    </>
  );
}
