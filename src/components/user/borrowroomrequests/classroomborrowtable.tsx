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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import Chip from '@mui/material/Chip';
import BorrowRoomDetail from './classroomborrowdetail';
import CreateBorrowRoomRequest from './create-classroom-request';

interface RoomBorrowRecord {
  RequestId: string;
  teacherName: string;
  roomname:string;
  borrowTime: string;
  expectedReturnTime: string;
  status: 'pending' | 'approved';
}
const statusMap = {
  approved: { label: 'Đã duyệt', color: 'success' },
  pending: { label: 'Chờ duyệt', color: 'warning' },
} as const;
const roomBorrowData: RoomBorrowRecord[] = [
  { RequestId: 'GV006', teacherName: 'Le Thi F',roomname:"TC-310", borrowTime: '2024-12-01 08:00', expectedReturnTime: '2024-12-01 10:00', status: 'approved' },
  { RequestId: 'GV007', teacherName: 'Hoang Van G',roomname:"TC-310", borrowTime: '2024-12-02 14:00', expectedReturnTime: '2024-12-02 16:00', status: 'pending' },
  { RequestId: 'GV008', teacherName: 'Pham Van H',roomname:"TC-310", borrowTime: '2024-12-03 09:00', expectedReturnTime: '2024-12-03 11:00', status: 'approved' },
  { RequestId: 'GV009', teacherName: 'Nguyen Van I',roomname:"TC-310", borrowTime: '2024-12-04 13:00', expectedReturnTime: '2024-12-04 15:00', status: 'approved' },
  { RequestId: 'GV010', teacherName: 'Tran Thi J',roomname:"TC-310", borrowTime: '2024-12-05 10:00', expectedReturnTime: '2024-12-05 12:00', status: 'approved' },
];

function RoomBorrowTable (): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [RoomBorrowRequestStatus, setRoomBorrowRequestStatus] = useState<string>("Tất cả");

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRoomBorrowRequestStatus(event.target.value as string);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
 
  return (
    <Box>
       <Box  sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
      }} >
           <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.paper",
        pb: 2,
        borderRadius: 2,
        boxShadow: 1,
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
      {/* Trường trạng thái đơn */}
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Trạng thái</InputLabel>
        <Select
          value={RoomBorrowRequestStatus}
          onChange={handleFilterChange}
          name="RoomBorrowRequestStatus"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
          <MenuItem value="Chờ duyệt">Chờ duyệt</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </Box>
          <CreateBorrowRoomRequest/>
          </Box>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn mượn</TableCell>
            <TableCell>Tên giáo viên</TableCell>
            <TableCell>Tên phòng</TableCell>
            <TableCell>Thời gian mượn</TableCell>
            <TableCell>Thời gian trả phòng dự kiến</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {roomBorrowData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => {
      const { label, color } = statusMap[row.status] ?? { label: 'Unknown', color: 'default' };
      return(
        <TableRow key={row.RequestId}>
          <TableCell>{row.RequestId}</TableCell>
          <TableCell>{row.teacherName}</TableCell>
          <TableCell>{row.roomname}</TableCell>
          <TableCell>{row.borrowTime}</TableCell>
          <TableCell>{row.expectedReturnTime}</TableCell>
          <TableCell><Chip color={color} label={label} size="small" /></TableCell>
          <TableCell><BorrowRoomDetail/></TableCell>
        </TableRow>
      );
    })}
</TableBody>
      </Table>
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
