import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import ClassroomInfoDialog from './classroom-equipment-info';

export interface Classroom {
  id: number,
  roomName: string;
  type: string;
  capacity:number;
  status:'OCCUPIED' | 'AVAILABLE' | 'BROKEN';
}

export interface ClassroomCardProps {
  classroom: Classroom;
}
const statusMap = {
  BROKEN: { label: 'Đang bảo trì', color: 'secondary' },
  AVAILABLE: { label: 'Sẵn sàng', color: 'success' },
  OCCUPIED: { label: 'Đang được sử dụng', color: 'warning' },
} as const;

export function ClassroomCard({ classroom }: ClassroomCardProps): React.JSX.Element {
  const { label, color } = statusMap[classroom.status] ?? { label: 'Unknown', color: 'default' };
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {classroom.roomName}
            </Typography>
            <Typography align="center" variant="body1">
              {classroom.type}
            </Typography>
            <Typography align="center" variant="body1">
              Số lượng chỗ ngồi: {classroom.capacity}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
        <Chip color={color} label={label} size="small" />
        </Stack>
       <ClassroomInfoDialog/>
      </Stack>
    </Card>
  );
}
