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
  Button
} from '@mui/material';
import BorrowEquipmentDetail from './equipmentborrowdetail';
import Chip from '@mui/material/Chip';

interface BorrowRecord {
  teacherId: string;
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
  { teacherId: 'GV001', teacherName: 'Nguyen Van A', borrowDate: '2024-12-01', expectedReturnDate: '2024-12-10', status: 'pending' },
  { teacherId: 'GV002', teacherName: 'Tran Thi B', borrowDate: '2024-12-02', expectedReturnDate: '2024-12-11', status: 'approved' },
  { teacherId: 'GV003', teacherName: 'Pham Van C', borrowDate: '2024-12-03', expectedReturnDate: '2024-12-12', status: 'overdue' },
  { teacherId: 'GV004', teacherName: 'Nguyen Van D', borrowDate: '2024-12-04', expectedReturnDate: '2024-12-13', status: 'paid' },
  { teacherId: 'GV005', teacherName: 'Le Thi E', borrowDate: '2024-12-05', expectedReturnDate: '2024-12-14', status: 'approved' },
];

function DeviceBorrowTable(){
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
      <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mã giáo viên</TableCell>
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
              <TableRow key={row.teacherId}>
                <TableCell>{row.teacherId}</TableCell>
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

export default DeviceBorrowTable;
