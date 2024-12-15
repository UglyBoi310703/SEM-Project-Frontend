import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
// import dayjs from 'dayjs';
import Addclassroommodal from '@/components/dashboard/classrooms/add-classroom';
import { config } from '@/config';
import ClassRoomList from '@/components/dashboard/classrooms/classroom-list';

export const metadata = { title: `ClassRooms | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách phòng học tại trường</Typography>
          {/* <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack> */}
        </Stack>
        <div>
          <Button >
           <Addclassroommodal/>
          </Button>
        </div>
      </Stack>
      <ClassRoomList/>
    </Stack>
  );
}
