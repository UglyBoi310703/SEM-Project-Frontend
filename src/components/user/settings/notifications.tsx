'use client';
import * as React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Divider } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

function NotificationOptions() {
  const [email, setEmail] = React.useState(true);
  const [inApp, setInApp] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (type, value) => {
    enqueueSnackbar(`Thông báo ${type} đã được ${value ? 'bật' : 'tắt'}`, {
      variant: value ? 'success' : 'error',
    });
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardHeader title="Tuỳ chỉnh thông báo" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        </Box>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <NotificationOptions />
    </SnackbarProvider>
  );
}
