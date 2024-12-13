import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { config } from '@/config';
import CategoryEquipmentFilter from '@/components/user/equipments/equipmentfilters/categoryequipmentfilters';
import { EquipmentsTable } from '@/components/user/equipments/equipment';
import type { Equipment } from '@/components/user/equipments/equipment';


export const metadata = { title: `Equipments | User | ${config.site.name}` } satisfies Metadata;

const equipments = [
  {
    id: 'E-001',
    name: 'Máy chiếu',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity:40,
    brokenQuantity:5

  },
  {
    id: 'E-002',
    name: 'Loa JBL',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity:40,
    brokenQuantity:5

  },  {
    id: 'E-003',
    name: 'Mic',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity:40,
    brokenQuantity:5

  },  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity:5,
    brokenQuantity:1
  },
  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity:5,
    brokenQuantity:1
  },
  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity:5,
    brokenQuantity:1
  },
  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity:5,
    brokenQuantity:1
  },
  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity:5,
    brokenQuantity:1
  },

] satisfies Equipment[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedBorrows = applyPagination(equipments, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách  thiết bị</Typography>
        </Stack>
      </Stack>
      <CategoryEquipmentFilter/>
      <EquipmentsTable
        count={paginatedBorrows.length}
        page={page}
        rows={paginatedBorrows}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Equipment[], page: number, rowsPerPage: number): Equipment[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
