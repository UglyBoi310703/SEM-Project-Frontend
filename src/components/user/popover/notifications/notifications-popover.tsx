import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Bell as BellIcon } from "@phosphor-icons/react/dist/ssr/Bell";
import { APIGetAllMessages, APIMarkAsRead } from "@/utils/api";
import { NotificationListItem } from "./notification-list-item";
import { NotificationsDialog } from "./notifications-dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Notifications {
  id: number;
  message: string;
  read: boolean;
  time: string;
}

export function NotificationsPopover(): React.JSX.Element {
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState<null | HTMLElement>(null);
  const [tabValue, setTabValue] = React.useState("all");
  const [notifications, setNotifications] = React.useState<Notifications[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showAllDialog, setShowAllDialog] = React.useState(false);

  const open = Boolean(notificationsAnchorEl);

  // Fetch notifications on mount
    const fetchNotifications = React.useCallback(async () => {
      setLoading(true);
      try {
        const response = await APIGetAllMessages(); // Gọi API lấy thông báo
        setNotifications(response);
      } catch (error) {
        console.error("Không thể tải thông báo:", error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    // Fetch notifications khi component mount
    React.useEffect(() => {
      fetchNotifications();
    }, [fetchNotifications]);
  
    
   React.useEffect(() => {
      const eventSource = new EventSource('http://localhost:8080/api/v1/notifications/subscribe',
        {
          withCredentials:true
        }
      );
    
      eventSource.addEventListener('notification', (event) => {
        console.log('Received notification:', event.data);
        // Thực hiện xử lý khác, ví dụ: hiển thị thông báo
        toast.info(`Thông báo mới: ${event.data}`, { position: "top-center", autoClose: 10000 });
        fetchNotifications();
       
      });
      eventSource.onerror = () => {
        console.error('SSE connection error');
        eventSource.close();
      };
    
      return () => {
        eventSource.close();
      };
    }, []);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleOpenDialog = () => {
    handleClose();
    setShowAllDialog(true);
  };

  const handleCloseDialog = () => {
    setShowAllDialog(false);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // Số lượng thông báo chưa đọc
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const filteredNotifications =
    tabValue === "all"
      ? notifications
      : notifications.filter((notification) => !notification.read);

  return (
    <Box sx={{
      backgroundColor:"#EEEEEE",
      borderRadius:"20px"
    }}>
      {/* Bell Icon with Badge */}
      <Tooltip title="Thông báo">
        <Badge
          badgeContent={unreadCount}
          color="error"
          max={99}
          sx={{
            "& .MuiBadge-badge": {
              right: 10,
              top: 5,
              fontSize: "0.75rem",
              height: "16px",
              minWidth: "15px",
            },
          }}
        >
          <IconButton onClick={handleOpen}>
            <BellIcon />
          </IconButton>
        </Badge>
      </Tooltip>

      {/* Notifications Popover */}
      <Popover
        anchorEl={notificationsAnchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={handleClose}
        open={open}
        slotProps={{ paper: { sx: { width: "360px" } } }}
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

        {/* Notifications List */}
        <Box>
          <List sx={{ maxHeight: "300px", overflow: "auto" }}>
            {loading ? (
              <Typography sx={{ textAlign: "center", mt: 2 }}>Đang tải...</Typography>
            ) : filteredNotifications.length === 0 ? (
              <Typography sx={{ textAlign: "center", mt: 2 }}>
                Không có thông báo nào.
              </Typography>
            ) : (
              filteredNotifications.map((item) => (
                <NotificationListItem
                  key={item.id}
                  message={item.message}
                  isRead={item.read}
                  time={item.time}
                  onClick={async () => {
                    try {
                      await APIMarkAsRead(item.id); // Gọi API đánh dấu đã đọc
                      setNotifications((prevNotifications) =>
                        prevNotifications.map((notification) =>
                          notification.id === item.id ? { ...notification, read: true } : notification
                        )
                      ); // Cập nhật trạng thái cục bộ
                    } catch (error) {
                      console.error("Không thể đánh dấu thông báo đã đọc:", error);
                    }
                  }}
                />
              ))
            )}
          </List>
          <Box sx={{ textAlign: "center", p: 1 }}>
            {/* Button to view all */}
            <Button onClick={handleOpenDialog} size="small">
              Xem tất cả
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Notifications Dialog */}
      <NotificationsDialog
        open={showAllDialog}
        onClose={handleCloseDialog}
        notifications={notifications}
      />
    </Box>
  );
}
