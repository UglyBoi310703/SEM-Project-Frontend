import * as React from 'react';
import type { Metadata } from 'next';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { config } from '@/config';

import { EquipmentsTable } from '@/components/dashboard/equipments/equipment-categories-table';
import AddCategoryEquipmentModal from '@/components/dashboard/equipments/addequipment/addcategoryequipment';

export const metadata = { title: `BorrowEquipment | Dashboard | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách  thiết bị</Typography>
          {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack> */}
        </Stack>
        <div>
            <AddCategoryEquipmentModal/>
        </div>
      </Stack>
      <EquipmentsTable
      />
    </Stack>
  );
}
