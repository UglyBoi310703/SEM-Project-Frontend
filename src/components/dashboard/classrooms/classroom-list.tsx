"use client"
import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { ClassroomCard } from '@/components/dashboard/classrooms/classrooms-card';
import type { Classroom } from '@/components/dashboard/classrooms/classrooms-card';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  import InputAdornment from '@mui/material/InputAdornment';
  import OutlinedInput from '@mui/material/OutlinedInput';
  import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export const metadata = { title: `ClassRooms | Dashboard | ${config.site.name}` } satisfies Metadata;

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
    status:"fixing"
  },
] satisfies Classroom[];

export default function ClassRoomList(): React.JSX.Element {
     const [RoomStatus, setRoomStatus] = React.useState("Tất cả");
     const [RoomType, setRoomType] = React.useState("Tất cả");
    
      const handleRoomStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRoomStatus(event.target.value as string);
      };
      const handleRoomTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRoomType(event.target.value as string);
      };
      const handleApplyFilter = () => {
        console.log("Loại thiết bị được chọn:", RoomStatus,RoomType);
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
          value={RoomStatus}
          onChange={handleRoomStatusFilterChange}
          name="equipmentstatus"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Sẵn có">Sẵn có</MenuItem>
          <MenuItem value="Đang bảo trì">Đang bảo trì</MenuItem>
          <MenuItem value="Đang bảo trì">Đang bảo trì</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Loại phòng</InputLabel>
        <Select
          value={RoomType}
          onChange={handleRoomTypeFilterChange}
          name="equipmentstatus"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Phòng học">Phòng học</MenuItem>
          <MenuItem value="Phòng hội đồng">Phòng hội đồng</MenuItem>
          <MenuItem value="Phòng thí nghiệm">Phòng thí nghiệm</MenuItem>
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
