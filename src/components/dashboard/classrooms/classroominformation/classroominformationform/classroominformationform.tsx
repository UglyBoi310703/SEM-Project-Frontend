'use client'
import * as React from 'react';
import Button from '@mui/material/Button';



import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';




export default function ClassroomInformationForm() {
  const [status, setStatus] = React.useState('');

const handleChangeStatus = (event: SelectChangeEvent) => {
  setStatus(event.target.value);
}

  return (
      <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader title="Thông tin" />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
          <FormControl fullWidth>
              <InputLabel>Mã phòng</InputLabel>
              <OutlinedInput label="classroomid" name="classroomid" type="text" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Tên phòng</InputLabel>
              <OutlinedInput label="classroomname" name="classroomname" type="text" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Loại phòng</InputLabel>
              <OutlinedInput label="classroom type" name="classroomtype" type="classroomtype" />
            </FormControl>
        <FormControl fullWidth>
        <InputLabel id="classroomstatus">Trạng thái</InputLabel>
        <Select
          value={status}
          label="Classroomstatus"
          onChange={handleChangeStatus}
        >
          <MenuItem value={10}>Sẵn có</MenuItem>
          <MenuItem value={20}>Đang sử dụng</MenuItem>
          <MenuItem value={30}>Đang bảo trì</MenuItem>
        </Select>
      </FormControl>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Sửa</Button>
          <Button variant="contained">Lưu</Button>
        </CardActions>
      </Card>
    </form>
  );
}
