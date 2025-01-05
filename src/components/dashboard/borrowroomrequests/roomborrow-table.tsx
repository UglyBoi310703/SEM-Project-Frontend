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
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { APIGetAdminBorrowRoomRequests } from "@/utils/api"; // Import hàm API
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

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
  const [emailSearch,setemailSearch] = useState("");
  const [StartDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [EndDateFilter, setEndDateFilter] = useState<Date | null>(null);

  const handleStartDateChange = ( date: Date | null) => {
    setStartDateFilter(date);
    setPage(0);
  };
  const handleEndDateChange = ( date: Date | null) => {
    setEndDateFilter(date);
    setPage(0);
  };

  const fetchBorrowRequests = async () => {

    try {
      const localISOStartDate = StartDateFilter
      ? new Date(StartDateFilter.getTime() - StartDateFilter.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";
      const localISOEndDate = EndDateFilter
      ? new Date(EndDateFilter.getTime() - EndDateFilter.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";
      const params = {
        page,
        size: rowsPerPage,
        sort: [],
        email: emailSearch, // Nếu cần lọc thêm
        startDate: localISOStartDate,
        endDate: localISOEndDate, // Có thể thêm logic lấy endDate
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
  }, [page, rowsPerPage, StartDateFilter,emailSearch,EndDateFilter]);


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
          bgcolor: "background.paper",
          boxShadow: 1,
          mb: 2,
          p: 2,
        }}
      >
          <OutlinedInput value={emailSearch}
          onChange={(e) => setemailSearch(e.target.value)}
          placeholder="Nhập email"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: "220px" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml:5
          }}
        >
          <Typography width={70} variant="h6">Bộ lọc:</Typography>
           <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                       sx={{ maxWidth: 200 }}
                        label="Từ:"
                        value={StartDateFilter}
                        onChange={(date) => handleStartDateChange(date)}
                        renderInput={(params) => <FormControl {...params} size="small" />}
                      />
                      <DatePicker
                       sx={{ maxWidth: 200 }}
                        label="Đến:"
                        value={EndDateFilter}
                        onChange={(date) => handleEndDateChange(date)}
                        renderInput={(params) => <FormControl {...params} size="small" />}
                      />
                    </LocalizationProvider>
        </Box>
      </Box>
      <TableContainer sx={{ display:"flex",
          flexDirection:"column",
          alignItems:"center",
          overflowX: 'auto' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Mã đơn mượn</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Tên phòng</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Tên người mượn</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Thời gian mượn</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Thời gian trả</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomBorrowData.map((row) => (
              <TableRow key={row.uniqueId}>
                <TableCell align="center">{row.uniqueId}</TableCell>
                <TableCell align="center">{row.roomName}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.comment}</TableCell>
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
