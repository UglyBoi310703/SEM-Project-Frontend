import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NotificationOptions from '@/components/dashboard/settings/notifications';
import { config } from '@/config';
// import { Notifications } from '@/components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import { Box } from '@mui/material';

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Cài đặt</Typography>
      </div>
      <Box sx={{
        display: "flex",
        justifyContent:"space-around",
        width:"60%"
      }}>
      <UpdatePasswordForm />
      <NotificationOptions/>
      </Box>
    </Stack>
  );
}
