import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { BorrowEquipmentFilters } from '@/components/dashboard/borrowequipment/borrowequipment-filters';
import { BorrowsTable } from '@/components/dashboard/borrowequipment/borrowequipment-table';
import type { Borrow } from '@/components/dashboard/borrowequipment/borrowequipment-table';

export const metadata = { title: `BorrowEquipment | Dashboard | ${config.site.name}` } satisfies Metadata;

const borrows = [
  {
    id: 'USR-001',
    name: 'Alex Cander',
    avatar: '/assets/avatar-10.png',
    email: 'AlexCander@sis.com',
    phone: '908-691-3242',
    address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    startDate: dayjs().subtract(2, 'hours').toDate(),
    endDate: dayjs().subtract(2, 'hours').toDate()
  },
  {
    id: 'USR-002',
    name: 'Vuong.Do.Van',
    avatar: '/assets/avatar-9.png',
    email: 'vuongdv@sis.com',
    phone: '415-907-2647',
    address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    startDate: dayjs().subtract(2, 'hours').toDate(),
    endDate: dayjs().subtract(2, 'hours').toDate()
  },
  {
    id: 'USR-003',
    name: 'Chien LV',
    avatar: '/assets/avatar-8.png',
    email: 'chienLV@sis.DTLT',
    phone: '770-635-2682',
    address: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    startDate: dayjs().subtract(2, 'hours').toDate(),
    endDate: dayjs().subtract(2, 'hours').toDate()
  },
  {
    id: 'USR-004',
    name: 'Lâm LP',
    avatar: '/assets/avatar-7.png',
    email: 'Lam.LP.@sis.com',
    phone: '801-301-7894',
    address: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    startDate: dayjs().subtract(2, 'hours').toDate(),
    endDate: dayjs().subtract(2, 'hours').toDate()
  },
  {
    id: 'USR-005',
    name: 'Vũ Múa Đình Trường',
    avatar: '/assets/avatar-6.png',
    email: 'truong.VĐ@sis.DTLT.CNTT1',
    phone: '313-812-8947',
    address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    startDate: dayjs().subtract(2, 'hours').toDate(),
    endDate: dayjs().subtract(2, 'hours').toDate()
  },

] satisfies Borrow[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedBorrows = applyPagination(borrows, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách đơn mượn thiết bị</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <BorrowEquipmentFilters />
      <BorrowsTable
        count={paginatedBorrows.length}
        page={page}
        rows={paginatedBorrows}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Borrow[], page: number, rowsPerPage: number): Borrow[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
