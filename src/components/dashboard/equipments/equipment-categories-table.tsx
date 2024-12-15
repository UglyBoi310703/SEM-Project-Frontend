"use client"
import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import EquipmentDetails from './equipmentdetails/equipmentdetails';
import EditEquipmentCategoryModal from './editequipment/editcategoryequipment';
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
    brokenQuantity: 5,
  },
  {
    id: 'E-002',
    name: 'Loa JBL',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity: 40,
    brokenQuantity: 5,
  },
  {
    id: 'E-003',
    name: 'Mic',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity: 40,
    brokenQuantity: 5,
  },
  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity: 5,
    brokenQuantity: 1,
  },
];

export function EquipmentsTable(): React.JSX.Element {

   const [EquipmentType, setEquipmentType] = React.useState("Tất cả");
    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setEquipmentType(event.target.value as string);
    };
  // State for pagination
  const [page, setPage] = React.useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = React.useState(2); // Rows per page

  // Handle change page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  // Handle change rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate the rows for the current page
  const paginatedRows = equipments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* Filter */}
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
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
        <InputLabel>Loại thiết bị</InputLabel>
        <Select
          value={EquipmentType}
          onChange={handleFilterChange}
          name="EquipmentType"
          label = "Loại thiết bị"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Phòng học">Phòng học</MenuItem>
          <MenuItem value="Hỗ trợ">Hỗ trợ</MenuItem>
          <MenuItem value="Thể dục">Thể dục</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </Box>

      {/* Bảng danh sách các danh mục thiết bị */}
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
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.totalQuantity}</TableCell>
                <TableCell>{row.usableQuantity}</TableCell>
                <TableCell>{row.usingQuantity}</TableCell>
                <TableCell>{row.brokenQuantity}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <EquipmentDetails />
                    <EditEquipmentCategoryModal />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={equipments.length} // Total rows
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 5, 10]} // Rows per page options
      />
    </Box>
  );
}
