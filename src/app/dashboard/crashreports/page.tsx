import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
// // import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// // // import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import Typography from '@mui/material/Typography';
import { config } from '@/config';
import { Reports } from '@/components/dashboard/crashreports/crashreports-table';


export const metadata = { title: `CrashReports | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid >
      <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4">Báo cáo sự cố thiết bị</Typography>
        </Stack>
        <Reports
        />
    </Grid>
  );
}
