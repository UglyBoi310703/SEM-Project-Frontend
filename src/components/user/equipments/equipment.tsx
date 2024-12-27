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
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { APIGetAllEquipment } from '@/utils/api';
import type { Equipment } from '@/components/dashboard/equipments/equipment-categories-table';

export function EquipmentsTable(): React.JSX.Element {
  const [equipmentCategories, setEquipmentCategories] = useState<Equipment[]>([]);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await APIGetAllEquipment();
        setEquipmentCategories(data.content);
      } catch (err) {
        console.error("Error fetching equipment data", err);
      }
    };
    fetchEquipment();
  }, []);

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
          placeholder="Tìm kiếm"
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
            value="Tất cả"
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
            {equipmentCategories.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.equipmentName}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.totalQuantity}</TableCell>
                <TableCell>{row.usableQuantity}</TableCell>
                <TableCell>{row.inUseQuantity}</TableCell>
                <TableCell>{row.brokenQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Divider />
    </Box>
  );
}
