import * as React from 'react';
import type { Metadata } from 'next';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { config } from '@/config';
import EquipmentBorrowTable from '@/components/user/borrowequipmentrequests/equipmentborrowtable';

export const metadata = { title: `BorrowEquipment | User | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách mượn trả thiết bị</Typography>
         
        </Stack>
      </Stack>
      <EquipmentBorrowTable/>
    </Stack>
  );
}


