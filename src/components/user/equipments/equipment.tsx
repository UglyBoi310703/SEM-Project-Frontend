'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { FormControl, InputLabel, Select, MenuItem, TablePagination } from '@mui/material';
import { APIGetAllEquipment } from '@/utils/api';
import type { Equipment } from '@/components/dashboard/equipments/equipment-categories-table';

export function EquipmentsTable(): React.JSX.Element {
  const [equipmentCategories, setEquipmentCategories] = useState<Equipment[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5); // Kích thước mỗi trang
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState("ALL");

  const fetchEquipment = async () => {
    
    try {
      
      const data = await APIGetAllEquipment({
        category: category === "ALL" ? "" : category,
        keyword: keyword,
        page,
        size: size,
      }
      );
      setEquipmentCategories(data.content);
      setTotalElements(data.page.totalElements);
    } catch (err) {
      console.error('Error fetching equipment data', err);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [page, size, keyword, category]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setPage(0); // Reset về trang đầu
  };

  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value as string);
    setPage(0); // Reset về trang đầu
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu
  };

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
          mb: 2,
        }}
      >
        <OutlinedInput
          placeholder="Nhập tên thiết bị"
          value={keyword}
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '250px' }}
        />

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Loại thiết bị</InputLabel>
          <Select value={category} onChange={handleCategoryChange} label="Loại thiết bị">
            <MenuItem value="ALL">Tất cả</MenuItem>
            <MenuItem value="TEACHING_EQUIPMENT">Thiết bị giảng dạy</MenuItem>
            <MenuItem value="ELECTRIC_EQUIPMENT">Thiết bị điện</MenuItem>
            <MenuItem value="SPORTS_EQUIPMENT">Thiết bị thể thao</MenuItem>
            <MenuItem value="LABORATORY_EQUIPMENT">Thiết bị phòng thí nghiệm</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display:"flex",
          flexDirection:"column",
          alignItems:"center",
          overflowX: 'auto' }}>
   
        <Table sx={{ minWidth: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Mã thiết bị</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Tên thiết bị</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Loại thiết bị</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Tổng số lượng</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Có thể mượn</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Đang được sử dụng</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Bị hỏng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipmentCategories.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell sx={{ textAlign: 'center' }}>{row.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.equipmentName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.category}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.totalQuantity}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.totalQuantityHasUsableInWarehouse}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.inUseQuantity}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.brokenQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider sx={{ my: 2 }} />

<TablePagination
  component="div"
  count={totalElements}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={size}
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[5, 10, 25, 50]}
  labelRowsPerPage="Số dòng mỗi trang"
/>
      </Box>

    
    </Box>
  );
}
