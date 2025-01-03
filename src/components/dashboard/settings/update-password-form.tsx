'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
export function UpdatePasswordForm(): React.JSX.Element {
  return (
   <Box sx={{flex:1,m:2}}>
     <form  
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card >
        <CardHeader  title="Đổi mật khẩu" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
          <FormControl fullWidth>
              <InputLabel>Mật khẩu</InputLabel>
              <OutlinedInput label="Password" name="password" type="password" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Mật khẩu mới</InputLabel>
              <OutlinedInput label="Password" name="password" type="password" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Nhập lại mật khẩu mới</InputLabel>
              <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Update</Button>
        </CardActions>
      </Card>
    </form>
   </Box>
  );
}
