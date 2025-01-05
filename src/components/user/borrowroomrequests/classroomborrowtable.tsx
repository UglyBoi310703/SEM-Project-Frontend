"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
  Button,
  Typography
} from "@mui/material";

import CreateBorrowRoomRequest from "./create-classroom-request";
import { APIGetBorrowRoomRequests, BorrowRoomRequest,APIBatchDeleteBorrowRoom } from "@/utils/api";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface RoomBorrowRecord {
  uniqueId: number;
  roomName: string;
  username: string;
  email: string;
  startTime: string;
  cancelable:boolean;
  endTime: string;
  comment: string;
}

function RoomBorrowTable(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [roomBorrowData, setRoomBorrowData] = useState<RoomBorrowRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
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
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;
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
      const request: BorrowRoomRequest = {
        userId,
        startDate: localISOStartDate,
        endDate: localISOEndDate,
        page, // Trang hiện tại
        size: rowsPerPage, // Số lượng bản ghi trên mỗi trang
        sort: [],
      };

      const response = await APIGetBorrowRoomRequests(request);

      setRoomBorrowData(
        response.content.map((item) => ({
          uniqueId: item.uniqueId,
          roomName: item.roomName,
          username: item.username,
          email: item.email,
          startTime: item.startTime,
          cancelable: item.cancelable,
          endTime: item.endTime,
          comment: item.comment,
        }))
      );

      setTotalRecords(response.page.totalElements); // Số lượng bản ghi tổng cộng
    } catch (error) {
      console.error("Error fetching borrow room data:", error);
    }
  };

  useEffect(() => {
    setRoomBorrowData([]); // Xóa dữ liệu cũ
    fetchBorrowRequests();
  }, [page, rowsPerPage,StartDateFilter,EndDateFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCancelBorrowRequest = async (id: number) => {
    Swal.fire({
      title: `Bạn có chắc chắn muốn hủy đơn mượn phòng mã ${id} ?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
      customClass: {
        popup: "swal-small-popup",
        title: "swal-small-title",
        content: "swal-small-content",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await APIBatchDeleteBorrowRoom([id]); // Gọi API hủy
          Swal.fire("Đã hủy!", "Đơn mượn đã được hủy thành công.", "success");
          fetchBorrowRequests(); // Cập nhật danh sách
        } catch (error) {
          console.error("Lỗi khi hủy đơn mượn:", error);
          Swal.fire("Lỗi!", "Không thể hủy đơn mượn. Vui lòng thử lại sau.", "error");
        }
      }
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          bgcolor: "background.paper",
          boxShadow: 1,
          mb: 2,
        }}
      >
         <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
          <Typography variant="h6" sx={{ flexGrow: 2 }}>
              Chọn ngày mượn
            </Typography>
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
        <CreateBorrowRoomRequest onBorrowRequestCreated={fetchBorrowRequests} />
      </Box>

      <TableContainer
  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  component={Paper}
>
  <Table>
    <TableHead>
      <TableRow>
        {[
          "Mã đơn mượn",
          "Tên phòng",
          "Tên người mượn",
          "Email",
          "Thời gian mượn",
          "Thời gian trả",
          "Ghi chú",
          "",
        ].map((header, index) => (
          <TableCell
            key={index}
            align="center"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {roomBorrowData.map((row) => (
        <TableRow key={row.uniqueId}>
          {[
            row.uniqueId,
            row.roomName,
            row.username,
            row.email,
            row.startTime,
            row.endTime,
            row.comment,
          ].map((value, index) => (
            <TableCell key={index} align="center" sx={{ textAlign: "center" }}>
              {value}
            </TableCell>
          ))}
          <TableCell align="center">
            {row.cancelable && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleCancelBorrowRequest(row.uniqueId)}
              >
                Hủy
              </Button>
            )}
          </TableCell>
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
