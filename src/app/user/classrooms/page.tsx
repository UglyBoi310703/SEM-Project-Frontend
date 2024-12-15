
import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
// import dayjs from 'dayjs';
import { config } from '@/config';
import ClassRoomList from '@/components/user/classrooms/classroom-list';

export const metadata = { title: `ClassRooms | User | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách phòng học tại trường</Typography>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
      <ClassRoomList/>
      </Grid>
    </Stack>
  );
}
