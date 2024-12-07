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
import ClassroomBorrowFilters from './classroomborrowrequestfilters';
import BorrowRoomDetail from './classroomborrowdetail';
interface RoomBorrowRecord {
  teacherId: string;
  teacherName: string;
  roomname:string;
  borrowTime: string;
  expectedReturnTime: string;
  status: string;
}

const roomBorrowData: RoomBorrowRecord[] = [
  { teacherId: 'GV006', teacherName: 'Le Thi F',roomname:"TC-310", borrowTime: '2024-12-01 08:00', expectedReturnTime: '2024-12-01 10:00', status: 'Đã trả' },
  { teacherId: 'GV007', teacherName: 'Hoang Van G',roomname:"TC-310", borrowTime: '2024-12-02 14:00', expectedReturnTime: '2024-12-02 16:00', status: 'Chờ duyệt' },
  { teacherId: 'GV008', teacherName: 'Pham Van H',roomname:"TC-310", borrowTime: '2024-12-03 09:00', expectedReturnTime: '2024-12-03 11:00', status: 'Đã duyệt' },
  { teacherId: 'GV009', teacherName: 'Nguyen Van I',roomname:"TC-310", borrowTime: '2024-12-04 13:00', expectedReturnTime: '2024-12-04 15:00', status: 'Đã trả' },
  { teacherId: 'GV010', teacherName: 'Tran Thi J',roomname:"TC-310", borrowTime: '2024-12-05 10:00', expectedReturnTime: '2024-12-05 12:00', status: 'Quá hạn' },
];

function RoomBorrowTable (): React.JSX.Element {
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
      <ClassroomBorrowFilters/>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã giáo viên</TableCell>
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
            .map((row) => (
              <TableRow key={row.teacherId}>
                <TableCell>{row.teacherId}</TableCell>
                <TableCell>{row.teacherName}</TableCell>
                <TableCell>{row.roomname}</TableCell>
                <TableCell>{row.borrowTime}</TableCell>
                <TableCell>{row.expectedReturnTime}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell><BorrowRoomDetail/></TableCell>
              </TableRow>
            ))}
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
