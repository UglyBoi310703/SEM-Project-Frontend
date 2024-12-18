'use client';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Divider } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
export default function NotificationOptions() {
  const [email, setEmail] = React.useState(true);
  const [inApp, setInApp] = React.useState(true);
  const [push, setPush] = React.useState(true);

  // State điều khiển Snackbar
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (type, value) => {
    setSnackbar({
      open: true,
      message: `Thông báo ${type} đã được ${value ? 'bật' : 'tắt'}`,
      severity: value ? 'success' : 'error',
    });
  };

  return (
   <Card sx={{ m:2}}>
    <CardHeader  title="Tuỳ chỉnh thông báo" />
        <Divider />
    <CardContent>
    <Box sx={{display:"flex",flexDirection:"column",  }}>
      <FormControlLabel
        control={
          <Switch
            checked={email}
            onChange={() => {
              setEmail((prev) => !prev);
              handleChange('Email', !email);
            }}
          />
        }
        label="Thông báo Email"
      />
      <FormControlLabel
        control={
          <Switch
            checked={inApp}
            onChange={() => {
              setInApp((prev) => !prev);
              handleChange('In-App', !inApp);
            }}
          />
        }
        label="Thông báo In-App"
      />
      <FormControlLabel
        control={
          <Switch
            checked={push}
            onChange={() => {
              setPush((prev) => !prev);
              handleChange('Push', !push);
            }}
          />
        }
        label="Thông báo Push"
      />

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    </CardContent>
   </Card>
  );
}
