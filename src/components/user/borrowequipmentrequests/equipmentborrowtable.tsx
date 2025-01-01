"use client";
import React, { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  Button
} from '@mui/material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import BorrowEquipmentDetail from './equipmentborrowdetail';
import UpdateBorrowEquipmentRequest from './edit-borrowequipment-request';
import CreateBorrowEquipmentRequest from './createequipmentborrowrequests/create-equipmentborrow';
import { APIGetFilteredBorrowEquipmentRequests, APIGetBorrowEquipmentDetails,APIBatchDeleteBorrowEquipments  } from '@/utils/api';

interface BorrowRecord {
  borrowId: number;
  teacherName: string;
  borrowDate: string;
  comment:string;
  expectedReturnDate: string;
  conditionbeforeborrow:string;
  status: 'BORROWED'|'NOT_BORROWED'| 'RETURNED';
}

const statusMap = {
  BORROWED: { label: 'Đã duyệt', color: 'success' },
  NOT_BORROWED: { label: 'Chờ duyệt', color: 'warning' },
  RETURNED: { label: 'Đã trả', color: 'info' },
} as const;

function EquipmentBorrowTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [equipmentBorrowRequestStatus, setEquipmentBorrowRequestStatus] = useState<string[]>([]);
  const [borrowData, setBorrowData] = useState<BorrowRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedBorrowDetail, setSelectedBorrowDetail] = useState<any | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const status = equipmentBorrowRequestStatus === "Tất cả" ? [] : equipmentBorrowRequestStatus;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchBorrowRequests = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    try {
      const response = await APIGetFilteredBorrowEquipmentRequests({
        userId: userId,
        statuses: status,
        expectedReturnDateBefore: endDate ? endDate.toISOString().split("T")[0] : "",
        expectedReturnDateAfter: startDate ? startDate.toISOString().split("T")[0] : "",
        page,
        size: rowsPerPage,
      });
      setBorrowData(
        response.content.map((item) => ({
          borrowId: item.uniqueID,
          teacherName: item.userName,
          borrowDate: item.createdAt,
          expectedReturnDate: item.expectedReturnDate,
          comment: item.comment,
          conditionbeforeborrow:item.equipmentItems.conditionBeforeBorrow,
          status: item.status,
        }))
      );
      setTotalRecords(response.page.totalElements);
    } catch (error) {
      console.error('Error fetching borrow requests:', error);
    }
  }
  useEffect(() => {
    fetchBorrowRequests();
  }, [page, rowsPerPage, equipmentBorrowRequestStatus, startDate, endDate]);

  const handleBorrowRequestCreated = () => {
    fetchBorrowRequests(); // Refresh the table data
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEquipmentBorrowRequestStatus(event.target.value as string);
    setPage(0);
  };
  const handleDateChange = (type: "start" | "end", date: Date | null) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      // Tăng thêm 1 ngày nếu type là "end"
      if (date) {
        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        setEndDate(adjustedDate);
      } else {
        setEndDate(null);
      }
    }
    setPage(0); // Đặt lại trang về 0
  };
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetailDialog = async (borrowId: string) => {
    try {
      const detailResponse = await APIGetBorrowEquipmentDetails(Number(borrowId));
      const teacherName = borrowData.find((record) => record.borrowId === borrowId)?.teacherName || 'Unknown';
      const status = borrowData.find((record) => record.borrowId === borrowId)?.status || 'Unknown';
      setSelectedBorrowDetail({
        ...detailResponse,
        teacherName,
        status,
      });
      setDetailDialogOpen(true);
    } catch (error) {
      console.error('Error fetching borrow detail:', error);
    }
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedBorrowDetail(null);
  };
const handleCancelBorrowRequest = async (id: number) => {
    Swal.fire({
      title: `Bạn có chắc chắn muốn hủy đơn mượn thiết bị mã ${id} ?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
     
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await APIBatchDeleteBorrowEquipments([id]); // Gọi API hủy
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          boxShadow: 1,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 2 }}>
              Bộ lọc:
            </Typography>

            <FormControl sx={{ minWidth: 150 }} >
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={equipmentBorrowRequestStatus}
                onChange={handleFilterChange}
                name="reportstatus"
                label="Trạng thái"
              >
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                <MenuItem value="NOT_BORROWED">Chờ duyệt</MenuItem>
                <MenuItem value="BORROWED">Đã duyệt</MenuItem>
                <MenuItem value="RETURNED">Đã trả</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
          <Typography variant="h6" sx={{ flexGrow: 2 }}>
              Chọn ngày dự kiến trả:
            </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
             sx={{ maxWidth: 200 }}
              label="Từ"
              value={startDate}
              onChange={(date) => handleDateChange("start", date)}
              renderInput={(params) => <FormControl {...params} size="small" />}
            />
            <DatePicker
            sx={{ maxWidth: 200}}
              label="Đến"
              value={endDate}
              onChange={(date) => handleDateChange("end", date)}
              renderInput={(params) => <FormControl {...params} size="small" />}
            />
          </LocalizationProvider>
          </Box>
        </Box>
        <CreateBorrowEquipmentRequest onBorrowRequestCreated={handleBorrowRequestCreated}/>
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
  {borrowData.map((row) => {
    const { label, color } = statusMap[row.status] ?? { label: 'Unknown', color: 'default' };
    const isNotBorrow = row.status === 'NOT_BORROWED';
    return (
      <TableRow key={row.borrowId}>
        <TableCell>{row.borrowId}</TableCell>
        <TableCell>{row.teacherName}</TableCell>
        <TableCell>{row.borrowDate}</TableCell>
        <TableCell>{row.expectedReturnDate}</TableCell>
        <TableCell>
          <Chip color={color} label={label} size="small" />
        </TableCell>
        <TableCell>
          {isNotBorrow ? (
            <>
              <Button size="small" variant="contained"  style={{ marginRight: 8 }} onClick={() => handleOpenDetailDialog(row.borrowId)}>
                Chi tiết
               
              </Button>
              <UpdateBorrowEquipmentRequest
                borrowRequestId={row.borrowId}
                message={row.comment}
                conditionbeforborrow={row.conditionBeforeBorrow}
                returnDate={row.expectedReturnDate}
              />
              
              <Button
                variant="outlined"
                color="error"
                size="small"
                style={{ marginLeft: 8 }}
                onClick={() => handleCancelBorrowRequest(row.borrowId)}
              >
                Huỷ
              </Button>
            </>
          ) : (
            <Button size="small" variant="contained" onClick={() => handleOpenDetailDialog(row.borrowId)}>
              Chi tiết
             
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  })}
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

      {selectedBorrowDetail && (
        <BorrowEquipmentDetail
          open={detailDialogOpen}
          onClose={handleCloseDetailDialog}
          borrower={{
            teacherName: selectedBorrowDetail.teacherName,
            status: selectedBorrowDetail.status,
          }}
          devices={selectedBorrowDetail.details.map((detail) => ({
            name: detail.equipmentName,
            quantity: detail.quantityBorrowed,
            serialNumbers: detail.borrowedEquipmentDetailCodes,
          }))}
        />
      )}
    </Box>
  );
}

export default EquipmentBorrowTable;