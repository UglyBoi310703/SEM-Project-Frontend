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
import BorrowEquipmentDetail from './equipmentborrowdetail';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import CreateBorrowEquipmentRequest from './createequipmentborrowrequests/create-equipmentborrow';

interface BorrowRecord {
  borowId: string;
  teacherName: string;
  borrowDate: string;
  expectedReturnDate: string;
  status: 'pending' | 'approved' | 'overdue'|'paid';
}
const statusMap = {
  overdue: { label: 'Quá hạn', color: 'error' },
  approved: { label: 'Đã duyệt', color: 'success' },
  pending: { label: 'Chờ duyệt', color: 'warning' },
  paid:{ label: 'Đã trả', color: 'info' },
} as const;
const deviceBorrowData: BorrowRecord[] = [
  { borowId: 'GV001', teacherName: 'Nguyen Van A', borrowDate: '2024-12-01', expectedReturnDate: '2024-12-10', status: 'pending' },
  { borowId: 'GV002', teacherName: 'Tran Thi B', borrowDate: '2024-12-02', expectedReturnDate: '2024-12-11', status: 'approved' },
  { borowId: 'GV003', teacherName: 'Pham Van C', borrowDate: '2024-12-03', expectedReturnDate: '2024-12-12', status: 'overdue' },
  { borowId: 'GV004', teacherName: 'Nguyen Van D', borrowDate: '2024-12-04', expectedReturnDate: '2024-12-13', status: 'paid' },
  { borowId: 'GV005', teacherName: 'Le Thi E', borrowDate: '2024-12-05', expectedReturnDate: '2024-12-14', status: 'approved' },
];

function EquipmentBorrowTable(){
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [EquipmentBorrowRequestStatus, setEquipmentBorrowRequestStatus] = useState<string>("Tất cả");
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEquipmentBorrowRequestStatus(event.target.value as string);
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
    {/* Search and filters */}
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
          value={EquipmentBorrowRequestStatus}
          onChange={handleFilterChange}
          name="reportstatus"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Chưa duyệt">Đã duyệt</MenuItem>
          <MenuItem value="Đang chờ duyệt">Chờ duyệt</MenuItem>
          <MenuItem value="Đã trả">Đã trả</MenuItem>
          <MenuItem value="Quá hạn">Quá hạn</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </Box>
          <CreateBorrowEquipmentRequest/>
          </Box>
   
      <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mã đơn mượn</TableCell>
          <TableCell>Tên giáo viên</TableCell>
          <TableCell>Ngày mượn</TableCell>
          <TableCell>Ngày trả dự kiến</TableCell>
          <TableCell>Trạng thái</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {deviceBorrowData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            const { label, color } = statusMap[row.status] ?? { label: 'Unknown', color: 'default' };
            return(
              <TableRow key={row.borowId}>
                <TableCell>{row.borowId}</TableCell>
                <TableCell>{row.teacherName}</TableCell>
                <TableCell>{row.borrowDate}</TableCell>
                <TableCell>{row.expectedReturnDate}</TableCell>
                <TableCell><Chip color={color} label={label} size="small" /></TableCell>
                <TableCell><BorrowEquipmentDetail/></TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
    <TablePagination
      component="div"
      count={deviceBorrowData.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </TableContainer>
  </Box>
  );
};

export default EquipmentBorrowTable;
