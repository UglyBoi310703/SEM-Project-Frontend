"use client";
import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import BorrowEquipmentDetail from './equipmentborrow-detail';
import Chip from '@mui/material/Chip';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { APIGetAllBorrowEquipmentRequests } from '@/utils/api';

interface BorrowRecord {
  requestId: number;
  teacherName: string;
  borrowDate: string;
  expectedReturnDate: string;
  status: 'NOT_BORROWED' | 'BORROWED' | 'OVERDUE' | 'PAID';
}

const statusMap = {
  NOT_BORROWED: { label: 'Chưa mượn', color: 'warning' },
  BORROWED: { label: 'Đã mượn', color: 'success' },
  OVERDUE: { label: 'Quá hạn', color: 'error' },
  PAID: { label: 'Đã trả', color: 'info' },
} as const;

function EquipmentBorrowTable(): React.JSX.Element {
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([]);
  const [BorowEquipmentStatus, SetBorowEquipmentStatus] = useState<string>("Tất cả");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    const fetchBorrowRecords = async () => {
      try {
        const response = await APIGetAllBorrowEquipmentRequests();
        const formattedData = response.content.map(record => ({
          requestId: record.uniqueID,
          teacherName: record.userName,
          borrowDate: record.createdAt,
          expectedReturnDate: record.expectedReturnDate,
          status: record.status,
        }));
        setBorrowRecords(formattedData);
      } catch (error) {
        console.error("Error fetching borrow records", error);
      }
    };
    fetchBorrowRecords();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    SetBorowEquipmentStatus(event.target.value as string);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = borrowRecords.filter(record => {
    if (BorowEquipmentStatus === "Tất cả") return true;
    const statusLabel = statusMap[record.status]?.label || "";
    return statusLabel === BorowEquipmentStatus;
  });

  return (
    <Box>
      {/* Filters */}
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
              value={BorowEquipmentStatus}
              onChange={handleFilterChange}
              name="BorowEquipmentStatus"
              label="Trạng thái"
            >
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="Chưa mượn">Chưa mượn</MenuItem>
              <MenuItem value="Đã mượn">Đã mượn</MenuItem>
              <MenuItem value="Đã trả">Đã trả</MenuItem>
              <MenuItem value="Quá hạn">Quá hạn</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* Bảng danh sách các đơn mượn */}
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
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const { label, color } = statusMap[row.status] ?? { label: 'Unknown', color: 'default' };
                return (
                  <TableRow key={row.requestId}>
                    <TableCell>{row.requestId}</TableCell>
                    <TableCell>{row.teacherName}</TableCell>
                    <TableCell>{row.borrowDate}</TableCell>
                    <TableCell>{row.expectedReturnDate}</TableCell>
                    <TableCell><Chip color={color} label={label} size="small" /></TableCell>
                    <TableCell><BorrowEquipmentDetail /></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default EquipmentBorrowTable;
