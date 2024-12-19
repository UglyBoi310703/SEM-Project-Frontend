import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
// import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// // import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import Typography from '@mui/material/Typography';
import { config } from '@/config';
import { Reports } from '@/components/user/crashreports/reports';
import CreateCrashReport from '@/components/user/crashreports/create-crashreport';

export const metadata = { title: `CrashReports | User | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return ( <Stack spacing={3}>
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
         <CreateCrashReport/>
        </Button>
      </div>
    </Stack>
    <Reports/>
  </Stack>
    // <Grid >
    //   <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
    //       <Typography variant="h4">Báo cáo sự cố thiết bị</Typography>
    //       {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
    //         <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
    //           Import
    //         </Button>
    //         <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
    //           Export
    //         </Button>
    //       </Stack> */}
    //        <CreateCrashReport/>
    //     </Stack>

    //     <Box
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent:"space-between",
    //     }}
    //     >
    
    //     </Box>
    //     <Reports
        
    //       sx={{ height: '100%' }}
    //     />
    // </Grid>
  );
}
