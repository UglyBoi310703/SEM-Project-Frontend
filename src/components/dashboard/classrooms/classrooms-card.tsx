import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ClassRoomInformation from './classroominfomation';
import Chip from '@mui/material/Chip';


export interface Classroom {
  id: string;
  title: string;
  description: string;
  seats:number;
  status:'used' | 'available' | 'fixing';
}

export interface ClassroomCardProps {
  classroom: Classroom;
}
const statusMap = {
  fixing: { label: 'Đang bảo trì', color: 'secondary' },
  available: { label: 'Sẵn sàng', color: 'success' },
  used: { label: 'Đang được sử dụng', color: 'warning' },
} as const;

export function ClassroomCard({ classroom }: ClassroomCardProps): React.JSX.Element {
  const { label, color } = statusMap[classroom.status] ?? { label: 'Unknown', color: 'default' };
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {classroom.title}
            </Typography>
            <Typography align="center" variant="body1">
              {classroom.description}
            </Typography>
            <Typography align="center" variant="body1">
              Số lượng chỗ ngồi: {classroom.seats}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
        <Chip color={color} label={label} size="small" />
        </Stack>
        <ClassRoomInformation/>
      </Stack>
    </Card>
  );
}
