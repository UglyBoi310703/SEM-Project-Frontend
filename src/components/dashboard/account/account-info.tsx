import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const user = {
  id: "3107",
  name: 'Ugly Boi',
  avatar: '/assets/AVT.jpg',
  country: 'Việt Nam',

} as const;

export function AccountInfo(): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <Typography color="text.secondary" variant="body2">
              {user.id} 
            </Typography>
            <Typography variant="h5">{user.name}</Typography>
            
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
