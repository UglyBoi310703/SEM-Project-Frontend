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

  // Hàm thay đổi tab
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // Hàm mở dialog hiển thị tất cả thông báo
  const handleOpenDialog = () => {
    setShowAllDialog(true);
  };

  // Hàm đóng dialog
  const handleCloseDialog = () => {
    setShowAllDialog(false);
  };

  // Danh sách thông báo
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
                status={item.status}
                isRead={item.isRead}
                time={item.time}
              />
            ))}
          </List>
          <Box sx={{ textAlign: 'center', p: 1 }}>
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
        tabValue={tabValue} // Truyền tabValue vào dialog
      />
    </>
  );
}
