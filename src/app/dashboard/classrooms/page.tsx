import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
// import dayjs from 'dayjs';
import Addclassroommodal from '@/components/dashboard/classrooms/addclassroom/addclassroommodal';
import { config } from '@/config';
import { ClassroomCard } from '@/components/dashboard/classrooms/classrooms-card';
import type { Classroom } from '@/components/dashboard/classrooms/classrooms-card';
import ClassroomFilters from '@/components/dashboard/classrooms/classrooms-filters';

export const metadata = { title: `ClassRooms | Dashboard | ${config.site.name}` } satisfies Metadata;

const classrooms = [
  {
    id: 'CLASS-001',
    title: 'TC-301',
    description: 'Phòng học',
    status:"fixing"
  },
  {
    id: 'CLASS-002',
    title: 'TC-302',
    description: 'Phòng học',
    status:"available"
  
  },
  {
    id: 'CLASS-003',
    title: 'TC-303',
    description: 'Phòng tự học',
    status:"available"

  },
  {
    id: 'CLASS-004',
    title: 'TC-304',
    description: 'Phòng hội đồng',
    status:"available"
  },
  {
    id: 'CLASS-005',
    title: 'TC-305',
    description: 'Phòng máy tính',
    status:"used"
  },
  {
    id: 'CLASS-006',
    title: 'TC-306',
    description: 'Phòng thí nghiệm hoá học',
    status:"fixing"
  },
] satisfies Classroom[];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách phòng học tại trường</Typography>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button >
           <Addclassroommodal/>
          </Button>
        </div>
      </Stack>
      <ClassroomFilters/>
      <Grid container spacing={3}>
        {classrooms.map((classroom) => (
          <Grid key={classroom.id} lg={4} md={6} xs={12}>
            <ClassroomCard classroom={classroom} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
