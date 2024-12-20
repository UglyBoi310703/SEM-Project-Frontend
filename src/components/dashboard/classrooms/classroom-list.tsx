"use client"
import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { ClassroomCard } from '@/components/dashboard/classrooms/classrooms-card';


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

export default function ClassRoomList({ rooms, isLoading , onUpdateRoom}) {
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRooms = rooms.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Typography>Đang tải danh sách phòng học...</Typography>;
  }

  return (
    <>
       {/* Search and Filter */}
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
      {/* Search */}
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
      {/* Filter */}
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
        {paginatedRooms.map((classroom) => (
          <Grid key={classroom.roomName} lg={4} md={6} xs={12}>
            <ClassroomCard classroom={classroom} onUpdateRoom={onUpdateRoom} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(rooms.length / itemsPerPage)}  
          page={currentPage}  
          onChange={handlePageChange}  
          size="small"
        />
      </Box>
    </>
  );
}


