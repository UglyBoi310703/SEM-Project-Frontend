"use client";

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
import { APIGetRoom } from '@/utils/api';

export default function ClassroomList(): React.JSX.Element {
  const [classrooms, setClassrooms] = React.useState<Classroom[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [roomStatus, setRoomStatus] = React.useState('ALL');
  const [roomType, setRoomType] = React.useState('ALL');

  const fetchRooms = async () => {
    const status = roomStatus === 'ALL' ? '' : roomStatus;
    const type = roomType === 'ALL' ? '' : roomType;
    try {
      const data = await APIGetRoom(type, status, keyword, currentPage, 6);
      setClassrooms(data.content);
      setTotalPages(data.page.totalPages);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  React.useEffect(() => {
    fetchRooms();
  }, [currentPage, roomStatus, roomType, keyword]);

  const handleRoomStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRoomStatus(event.target.value as string);
  };

  const handleRoomTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRoomType(event.target.value as string);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page - 1);
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
          value={keyword}
          onChange={handleKeywordChange}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '500px' }}
        />

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

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={roomStatus}
              onChange={handleRoomStatusFilterChange}
              name="roomstatus"
              label="Trạng thái"
            >
              <MenuItem value="ALL">Tất cả</MenuItem>
              <MenuItem value="AVAILABLE">Sẵn có</MenuItem>
              <MenuItem value="OCCUPIED">Đang sử dụng</MenuItem>
              <MenuItem value="BROKEN">Đang bảo trì</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Loại phòng</InputLabel>
            <Select
              value={roomType}
              onChange={handleRoomTypeFilterChange}
              name="roomtype"
              label="Loại phòng"
            >
              <MenuItem value="ALL">Tất cả</MenuItem>
              <MenuItem value="CLASSROOM">Phòng học</MenuItem>
              <MenuItem value="EQUIPMENT_ROOM">Phòng thiết bị</MenuItem>
              <MenuItem value="MEETING_ROOM">Phòng hội thảo</MenuItem>
              <MenuItem value="LABORATORY">Phòng thí nghiệm</MenuItem>
              <MenuItem value="OFFICE">Văn phòng</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={fetchRooms}
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
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
          size="small"
        />
      </Box>
    </Stack>
  );
}
