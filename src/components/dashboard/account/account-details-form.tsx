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


export function AccountDetailsForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="Thông tin có thể được chỉnh sửa" title="Thông tin tài khoản" />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Họ và tên</InputLabel>
              <OutlinedInput defaultValue="Boi" label="Last name" name="lastName" />
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Email</InputLabel>
              <OutlinedInput defaultValue="uglyboi3107@gmail.com" label="Email address" name="email" />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined">Sửa</Button>
          <Button variant="contained">Lưu</Button>
        </CardActions>
      </Card>
    </form>
  );
}
