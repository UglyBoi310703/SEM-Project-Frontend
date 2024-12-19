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
import { useEffect } from 'react';
import { APIGetAllRoom } from '@/utils/api';
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

export default function ClassRoomList({ rooms, isLoading }) {
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
      <Grid container spacing={3}>
        {paginatedRooms.map((classroom) => (
          <Grid key={classroom.roomName} lg={4} md={6} xs={12}>
            <ClassroomCard classroom={classroom} />
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


