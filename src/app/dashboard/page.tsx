import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import Typography from '@mui/material/Typography';
import { config } from '@/config';
import { Reports } from '@/components/dashboard/reports/reports';
import { ReportsFilters } from '@/components/dashboard/reports/reports-filters';

export const metadata = { title: `Reports | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid >
      <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Báo cáo sự cố thiết bị</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
   <ReportsFilters/>
        <Reports
          orders={[
            {
              id: 'ORD-009',
              customer: { name: 'Đỗ Văn Vương' },
             idEquip:'DTLT-E001',
             nameEquip:'Mic',
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Chiến LV' },
              idEquip:'DTLT-E002',
             nameEquip:'Máy chiếu',
              status: 'approved',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Lê Phúc Lâm' },
              idEquip:'DTLT-E003',
              nameEquip:'Loa',
              status: 'approved',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Vũ Đình Trường' },
              idEquip:'DTLT-E004',
              nameEquip:'Máy chiếu',
              status: 'approved',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            
          ]}
          sx={{ height: '100%' }}
        />
    </Grid>
  );
}
