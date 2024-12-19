'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  totalQuantity: number;
  usableQuantity: number;
  usingQuantity: number;
  brokenQuantity: number;
}

const equipments: Equipment[] = [
  {
    id: 'E-001',
    name: 'Máy chiếu',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity: 40,
    brokenQuantity: 5
  },
  {
    id: 'E-002',
    name: 'Loa JBL',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity: 40,
    brokenQuantity: 5
  },
  {
    id: 'E-003',
    name: 'Mic',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity: 40,
    brokenQuantity: 5
  },
  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity: 5,
    brokenQuantity: 1
  }
];

export function EquipmentsTable(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [deviceType, setDeviceType] = React.useState('Tất cả');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Xử lý thay đổi bộ lọc loại thiết bị
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeviceType(event.target.value as string);
    setPage(0); // Reset về trang đầu tiên khi lọc
  };

  // Xử lý thay đổi số hàng mỗi trang
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Xử lý thay đổi trang
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Lọc dữ liệu dựa trên từ khóa và loại thiết bị
  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = deviceType === 'Tất cả' || equipment.category === deviceType;

    return matchesSearch && matchesCategory;
  });

  // Lấy dữ liệu của trang hiện tại
  const paginatedEquipments = filteredEquipments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          mb:2
        }}
      >
        <OutlinedInput
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '500px' }}
        />

        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Loại thiết bị</InputLabel>
          <Select
            value={deviceType}
            onChange={handleFilterChange}
            name="deviceType"
            label="Loại thiết bị"
          >
            <MenuItem value="Tất cả">Tất cả</MenuItem>
            <MenuItem value="Phòng học">Phòng học</MenuItem>
            <MenuItem value="Hỗ trợ">Hỗ trợ</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Mã thiết bị</TableCell>
              <TableCell>Tên thiết bị</TableCell>
              <TableCell>Loại thiết bị</TableCell>
              <TableCell>Tổng số lượng</TableCell>
              <TableCell>Có thể sử dụng</TableCell>
              <TableCell>Đang được sử dụng</TableCell>
              <TableCell>Bị hỏng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEquipments.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.totalQuantity}</TableCell>
                <TableCell>{row.usableQuantity}</TableCell>
                <TableCell>{row.usingQuantity}</TableCell>
                <TableCell>{row.brokenQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Divider />

      <TablePagination
        component="div"
        count={filteredEquipments.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}
