import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';




export interface Classroom {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface ClassroomCardProps {
  classroom: Classroom;
}

export function ClassroomCard({ classroom }: ClassroomCardProps): React.JSX.Element {
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
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <Typography color="text.secondary" display="inline" variant="body2">
            {classroom.status} 
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
