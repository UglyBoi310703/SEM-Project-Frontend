import * as React from 'react';
import { useNotifications } from '@toolpad/core/useNotifications';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NotificationOptions() {
  const notifications = useNotifications();

  // State cho các loại thông báo
  const [email, setEmail] = React.useState(true);
  const [inApp, setInApp] = React.useState(true);
  const [push, setPush] = React.useState(true);

  // Ref để theo dõi trạng thái trước đó của các thông báo
  const prevStates = React.useRef({ email, inApp, push });

  React.useEffect(() => {
    // Hàm xử lý logic thông báo
    const handleNotification = (type, isEnabled) => {
      const key = isEnabled
        ? notifications.show(`Thông báo ${type} đã được bật`, {
            severity: 'success',
            autoHideDuration: 3000,
          })
        : notifications.show(`Thông báo ${type} đã được tắt`, {
            severity: 'error',
          });
      return key;
    };

    const closeNotification = (key) => {
      notifications.close(key);
    };

    // Xử lý Email Notification
    if (prevStates.current.email !== email) {
      const key = handleNotification('Email', email);
      closeNotification(key);
    }

    // Xử lý In-App Notification
    if (prevStates.current.inApp !== inApp) {
      const key = handleNotification('In-App', inApp);
      closeNotification(key);
    }

    // Xử lý Push Notification
    if (prevStates.current.push !== push) {
      const key = handleNotification('Push', push);
      closeNotification(key);
    }

    // Cập nhật ref trạng thái
    prevStates.current = { email, inApp, push };
  }, [email, inApp, push, notifications]);

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Tuỳ chọn Thông báo
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={email}
            onChange={() => setEmail((prev) => !prev)}
          />
        }
        label="Thông báo Email"
      />
      <FormControlLabel
        control={
          <Switch
            checked={inApp}
            onChange={() => setInApp((prev) => !prev)}
          />
        }
        label="Thông báo In-App"
      />
      <FormControlLabel
        control={
          <Switch
            checked={push}
            onChange={() => setPush((prev) => !prev)}
          />
        }
        label="Thông báo Push"
      />
    </Box>
  );
}
