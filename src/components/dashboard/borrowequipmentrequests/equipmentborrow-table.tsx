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
  IconButton,
  Menu,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  Typography
} from "@mui/material";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { APIGetFilteredBorrowEquipmentRequests,APISetReturnBorrowEquipmentRequest } from "@/utils/api";
import BorrowEquipmentDetail from "./equipmentborrow-detail";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Swal from "sweetalert2"; 

interface BorrowRecord {
  requestId: number;
  teacherName: string;
  borrowDate: string;
  expectedReturnDate: string;
  comment: string;
  status: "NOT_BORROWED" | "BORROWED" | "OVERDUE"|"REJECTED"|"RETURNED";
}

const statusMap = {
  NOT_BORROWED: { label: "Chưa mượn", color: "warning" },
  BORROWED: { label: "Đã mượn", color: "success" },
  OVERDUE: { label: "Quá hạn", color: "error" },
  RETURNED: { label: "Đã trả", color: "info" },
  REJECTED: { label: "Bị từ chối", color: "secondary" },
  
} as const;

function EquipmentBorrowTable(): React.JSX.Element {
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([]);
  const [BorowEquipmentStatus, SetBorowEquipmentStatus] = useState<string>("Tất cả");
  const [page, setPage] = useState(0);
  const [keySearch,setketSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<{ anchorEl: HTMLElement | null; recordId: number | null }>({
    anchorEl: null,
    recordId: null,
  });
  const statusFilter = BorowEquipmentStatus === "Tất cả" ? [] : BorowEquipmentStatus;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, recordId: number) => {
    setMenuAnchor({ anchorEl: event.currentTarget, recordId });
  };

  const handleCloseMenu = () => {
    setMenuAnchor({ anchorEl: null, recordId: null });
  };

  const handleChangeStatus = (status: BorrowRecord["status"]) => {
    if (menuAnchor.recordId !== null) {
      if (status === "RETURNED") {
        handleConfirmReturn(menuAnchor.recordId); // Gọi hàm xác nhận trả thiết bị
      } else {
        // Các trạng thái khác không cần xác nhận
        setBorrowRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.requestId === menuAnchor.recordId ? { ...record, status } : record
          )
        );
      }
    }
    handleCloseMenu();
  };
  const handleDateChange = (type: "start" | "end", date: Date | null) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setPage(0);
  };

  const fetchBorrowRecords = async () => {
    const localISOStartDate = startDate
    ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
    : "";
    const localISOEndDate = endDate
    ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
    : "";
    try {
      const response = await APIGetFilteredBorrowEquipmentRequests({
        userId:undefined,
        username: keySearch,
        statuses:statusFilter,
        page,
        expectedReturnDateBefore: localISOEndDate, 
        expectedReturnDateAfter: localISOStartDate, 
        size: rowsPerPage,
        sort: [],
      });
      const formattedData = response.content.map((record: any) => ({
        requestId: record.uniqueID,
        teacherName: record.userName,
        comment: record.comment,
        borrowDate: record.createdAt,
        expectedReturnDate: record.expectedReturnDate,
        status: record.status,
      }));
      setBorrowRecords(formattedData);
      setTotalElements(response.page.totalElements); // Cập nhật tổng số phần tử
    } catch (error) {
      console.error("Error fetching borrow records", error);
    }
  };

  const handleConfirmReturn = async (requestId: number) => {
    // Hiển thị hộp thoại xác nhận
    const result = await Swal.fire({
      title: "Xác nhận trả thiết bị",
      text: `Xác nhận đơn mượn thiết bị mã ${requestId}: giáo viên đã trả thiết bị?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });
  
    // Nếu người dùng xác nhận
    if (result.isConfirmed) {
      try {
        // Gọi API
        const message = await APISetReturnBorrowEquipmentRequest(requestId);
        Swal.fire("Thành công", message, "success");
  
        // Cập nhật trạng thái cục bộ
        setBorrowRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.requestId === requestId ? { ...record, status: "RETURNED" } : record
          )
        );
      } catch (error) {
        Swal.fire("Lỗi", "Không thể cập nhật trạng thái. Vui lòng thử lại.", "error");
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchBorrowRecords();
  }, [page, rowsPerPage,keySearch,BorowEquipmentStatus,endDate,startDate]); // Gọi lại API khi thay đổi trang hoặc số lượng bản ghi


  return (
    <Box>
      {/* Bộ lọc */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          mb: 2,
        }}
      >
        <OutlinedInput value={keySearch}
          
          onChange={(e) => setketSearch(e.target.value)}
          placeholder="Nhập tên giáo viên"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: "220px" }}
        />
         <FormControl sx={{ minWidth: 150 }} >
                      <InputLabel>Trạng thái</InputLabel>
                      <Select
                        value={BorowEquipmentStatus}
                        onChange={(event) => SetBorowEquipmentStatus(event.target.value as string)}
                        name="borrowStatus"
                        label="Trạng thái"
                      >
                        <MenuItem value="Tất cả">Tất cả</MenuItem>
                        <MenuItem value="NOT_BORROWED">Chờ duyệt</MenuItem>
                        <MenuItem value="BORROWED">Đã duyệt</MenuItem>
                        <MenuItem value="RETURNED">Đã trả</MenuItem>
                      </Select>
                    </FormControl>
       
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
             sx={{ maxWidth: 180 }}
              label="Từ"
              value={startDate}
              onChange={(date) => handleDateChange("start", date)}
              renderInput={(params) => <FormControl {...params} size="small" />}
            />
            <DatePicker
            sx={{ maxWidth: 180}}
              label="Đến"
              value={endDate}
              onChange={(date) => handleDateChange("end", date)}
              renderInput={(params) => <FormControl {...params} size="small" />}
            />
          </LocalizationProvider>
          </Box>
      </Box>

      {/* Bảng */}
      <TableContainer sx={{ display:"flex",
          flexDirection:"column",
          alignItems:"center",
          overflowX: 'auto' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Mã đơn mượn</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Tên giáo viên</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Ngày mượn</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Ngày trả dự kiến</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Ghi chú</TableCell>
              <TableCell  sx={{ fontWeight: "bold", pl:5}}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} >Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowRecords.map((row) => {
              const { label, color } = statusMap[row.status] ?? { label: "Unknown", color: "default" };
              return (
                <TableRow key={row.requestId}>
                  <TableCell  align="center">{row.requestId}</TableCell>
                  <TableCell  align="center">{row.teacherName}</TableCell>
                  <TableCell  align="center">{row.borrowDate}</TableCell>
                  <TableCell  align="center">{row.expectedReturnDate}</TableCell>
                  <TableCell  align="center">{row.comment}</TableCell>
                  <TableCell sx={{pl:5}} >
                  <Box >
                    <Chip color={color} label={label} size="small" />
                    {(row.status === "BORROWED" || row.status === "OVERDUE") && (
                      <
                        >
                        <IconButton onClick={(event) => handleOpenMenu(event, row.requestId)}>
                          <ArrowDropDownIcon />
                        </IconButton>
                        <Menu
                        anchorEl={menuAnchor.anchorEl}
                        open={menuAnchor.recordId === row.requestId}
                        onClose={handleCloseMenu}
                      >
                        {(row.status === "BORROWED" || row.status === "OVERDUE") && (
                         <>
                          <MenuItem  onClick={() => handleCloseMenu()} >
                          <Chip color={statusMap["BORROWED"].color} label={statusMap["BORROWED"].label} size="small" />
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleChangeStatus("RETURNED")} // Xử lý trạng thái "Đã trả"
                          >
                            
                            <Chip color={statusMap["RETURNED"].color} label={statusMap["RETURNED"].label} size="small" />
                          </MenuItem></>
                        )}
                      </Menu>
                      </>
                    )}
                      </Box>
                  </TableCell>
                  <TableCell>
                    <BorrowEquipmentDetail onPageChanged={fetchBorrowRecords} borrowinfo={row} requestId={row.requestId} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalElements} // Tổng số phần tử từ API
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </TableContainer>
    </Box>
  );
}

export default EquipmentBorrowTable;
