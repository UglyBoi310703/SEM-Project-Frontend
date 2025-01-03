"use client";
import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { APIGetAdminBorrowRoomRequests } from "@/utils/api"; // Import hàm API

interface RoomBorrowRecord {
  uniqueId: number;
  roomname: string;
  username: string;
  email: string;
  startTime: string;
  endTime: string;
  comment: string;
  cancelable: boolean;
}

function RoomBorrowTable(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [roomBorrowData, setRoomBorrowData] = useState<RoomBorrowRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [borrowDate, setBorrowDate] = useState<Date | null>(null);

  const fetchBorrowRequests = async () => {

    try {
      const localISODate = borrowDate
      ? new Date(borrowDate.getTime() - borrowDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";
      const params = {
        page,
        size: rowsPerPage,
        sort: [],
        email: "", // Nếu cần lọc thêm
        startDate: localISODate,
        endDate: "", // Có thể thêm logic lấy endDate
      };

      const response = await APIGetAdminBorrowRoomRequests(params);
      setRoomBorrowData(response.content);
      setTotalRecords(response.page.totalElements);
    } catch (error) {
      console.error("Error fetching borrow room data:", error);
    }
  };

  useEffect(() => {
    fetchBorrowRequests();
  }, [page, rowsPerPage, borrowDate]);

  const handleDateChange = (date: Date | null) => {
    setBorrowDate(date);
    setPage(0);
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          boxShadow: 1,
          mb: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">Bộ lọc:</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày mượn từ:"
              value={borrowDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn mượn</TableCell>
              <TableCell>Tên phòng</TableCell>
              <TableCell>Tên người mượn</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Thời gian mượn</TableCell>
              <TableCell>Thời gian trả</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomBorrowData.map((row) => (
              <TableRow key={row.uniqueId}>
                <TableCell>{row.uniqueId}</TableCell>
                <TableCell>{row.roomName}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.endTime}</TableCell>
                <TableCell>{row.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalRecords}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default RoomBorrowTable;
