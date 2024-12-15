"use client"
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ClassroomCard } from '@/components/user/classrooms/classrooms-card';
import type { Classroom } from '@/components/user/classrooms/classrooms-card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


const classrooms = [
  {
    id: 'CLASS-001',
    title: 'TC-301',
    description: 'Phòng học',
    seats:40,
    status:"fixing"
  },
  {
    id: 'CLASS-002',
    title: 'TC-302',
    description: 'Phòng học',
    seats:40,
    status:"available"
  
  },
  {
    id: 'CLASS-003',
    title: 'TC-303',
    description: 'Phòng tự học',
    seats:40,
    status:"available"

  },
  {
    id: 'CLASS-004',
    title: 'TC-304',
    description: 'Phòng hội đồng',
    seats:40,
    status:"available"
  },
  {
    id: 'CLASS-005',
    title: 'TC-305',
    description: 'Phòng máy tính',
    seats:40,
    status:"used"
  },
  {
    id: 'CLASS-006',
    title: 'TC-306',
    description: 'Phòng thí nghiệm hoá học',
    seats:40,
    status:"available"

  
  },
] satisfies Classroom[];

export default function ClassroomList(): React.JSX.Element {
    const [RoomStatus, setRoomStatus] = React.useState("Tất cả");
    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setRoomStatus(event.target.value as string);
    };
  
    const handleApplyFilter = () => {
      console.log("Loại thiết bị được chọn:", RoomStatus);
    };
  return (
    <Stack spacing={3}>
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <OutlinedInput
        placeholder="Tìm kiếm"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />  
      {/* Tiêu đề */}
      <Box
       sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
      }}
      >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Bộ lọc:
      </Typography>
      {/* Trường Loại thiết bị */}
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Trạng thái</InputLabel>
        <Select
          value="Tất cả"
          onChange={handleFilterChange}
          name="roomstatus"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Điện tử">Sẵn có</MenuItem>
          <MenuItem value="Cơ khí">Đang sử dụng</MenuItem>
          <MenuItem value="Y tế">Đang bảo trì</MenuItem>

        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Loại phòng</InputLabel>
        <Select
          value="Tất cả"
          onChange={handleFilterChange}
          name="roomtype"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Điện tử">Phòng học</MenuItem>
          <MenuItem value="Cơ khí">Phòng hội đồng</MenuItem>
          <MenuItem value="Y tế">Phòng thí nghiệm</MenuItem>
        </Select>
      </FormControl>
    
      {/* Nút Áp dụng */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyFilter}
        sx={{ whiteSpace: "nowrap" }}
      >
        Áp dụng
      </Button>
      </Box>
    </Box>
      <Grid container spacing={3}>
        {classrooms.map((classroom) => (
          <Grid key={classroom.id} lg={4} md={6} xs={12}>
            <ClassroomCard classroom={classroom} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
