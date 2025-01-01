"use client"
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import BorrowRoomDetail from './roomborrow-detail';
import { APIGetBorrowRoomRequests, APIGetRoomBorrowRequestAdmin } from '@/utils/api';

interface RoomBorrowRecord  {
  uniqueId: number,
  roomName: string,
  username: string,
  email: string,
  startTime: string,
  endTime: string,
  comment: string,
  cancelable: boolean
}
const statusMap = {
  approved: { label: 'Đã duyệt', color: 'success' },
  pending: { label: 'Chờ duyệt', color: 'warning' },
} as const;
function RoomBorrowTable (): React.JSX.Element {
  const [BorrowRoomStatus, setBorrowRoomStatus] = useState<string>("Tất cả");
  const [roomBorrowData, setRoomBorrowData] = useState<RoomBorrowRecord[]>([])

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBorrowRoomStatus(event.target.value as string);
  };
  const fetchRooms = async (newPage: number) => {
      try {
        const data = await APIGetRoomBorrowRequestAdmin('', '', '', 0, 5, '');
        // setRooms(data.content);
        console.log(data.content)
        setRoomBorrowData(data.content)
        
      } catch (err) {
        console.error("Error fetching rooms", err);
      }  
    };
  React.useEffect(()=> {
    fetchRooms()
     
  }, [])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  return (
    <Box>
      {/* Filter */}
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        mb:2
      }}
    >
      <OutlinedInput
        placeholder="Tìm kiếm "
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
          value={BorrowRoomStatus}
          onChange={handleFilterChange}
          name="BorrowRoomStatus"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
          <MenuItem value="Chờ duyệt">Chờ duyệt</MenuItem>
          <MenuItem value="Đã trả">Đã trả</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </Box>

    {/* Danh sách các đơn mượn phòng */}
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn mượn</TableCell>
            <TableCell>Tên giáo viên</TableCell>
            <TableCell>Tên phòng</TableCell>
            <TableCell>Thời gian mượn</TableCell>
            <TableCell>Thời gian trả phòng dự kiến</TableCell>
            <TableCell>Ghi chú</TableCell>
            {/* <TableCell></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
  {roomBorrowData
    .map((row)=> {
      return (
        <TableRow key={row.uniqueId}>
          <TableCell>{row.uniqueId}</TableCell>
          <TableCell>{row.username}</TableCell>
          <TableCell>{row.roomName}</TableCell>
          <TableCell>{(row.startTime).replace("T", " ")}</TableCell>
          <TableCell>{(row.endTime).replace("T", " ")}</TableCell>
          <TableCell>{row.comment}</TableCell>
          {/* <TableCell><BorrowRoomDetail /></TableCell> */}
        </TableRow>
      );
    })}
</TableBody>
      </Table>

      {/* Phân trang */}
      <TablePagination
        component="div"
        count={roomBorrowData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </Box>
  );
};

export default RoomBorrowTable;
