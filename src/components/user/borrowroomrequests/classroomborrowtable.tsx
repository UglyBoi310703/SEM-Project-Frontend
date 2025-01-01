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
  const [BorrowDate, setBorrowDate] = useState<Date | null>(null);

  const handleDateChange = ( date: Date | null) => {

    setBorrowDate(date);
    setPage(0);
  };
  const fetchBorrowRequests = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;
      const localISODate = BorrowDate
      ? new Date(BorrowDate.getTime() - BorrowDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";
      const request: BorrowRoomRequest = {
        userId,
        startDate: localISODate,
        endDate: "",
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
  }, [page, rowsPerPage,BorrowDate]);

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
         <Box  sx={{
          width:"300px",
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          bgcolor: "background.paper",
          boxShadow: 1,
          mb: 2,
        }}>
         <Typography variant="h6" sx={{ flexGrow: 2 }}>
            Bộ lọc:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
             sx={{ maxWidth: 200 }}
              label="Ngày mượn từ:"
              value={BorrowDate}
              onChange={(date) => handleDateChange(date)}
              renderInput={(params) => <FormControl {...params} size="small" />}
            />
          </LocalizationProvider>
         </Box>
        <CreateBorrowRoomRequest onBorrowRequestCreated={fetchBorrowRequests} />
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
              <TableCell></TableCell>
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
                <TableCell>
                  {row.cancelable === true && (
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
