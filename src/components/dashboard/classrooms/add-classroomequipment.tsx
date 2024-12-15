import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';

interface Equipment {
  seri: string;
  name: string;
  category: string;
  status: 'available' | 'fixing';
}

interface AddEquipmentsProps {
  onAdd: (device: Equipment) => void;
  selectedDeviceIds: string[];
}

const statusMap = {
  fixing: { label: 'Đang bảo trì', color: 'secondary' },
  available: { label: 'Sẵn sàng', color: 'success' },
} as const;

const equipments: Equipment[] = [
  { seri: 'E-001', name: 'Máy chiếu', category: 'Phòng học', status: 'available' },
  { seri: 'E-002', name: 'Loa JBL', category: 'Phòng học', status: 'available' },
  { seri: 'E-003', name: 'Mic', category: 'Phòng học', status: 'fixing' },
  { seri: 'E-004', name: 'Bảng trắng', category: 'Phòng học', status: 'available' },
];

function AddRoomEquipments({ onAdd, selectedDeviceIds }: AddEquipmentsProps): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredEquipments = equipments.filter((equipment) => {
    const isSearchMatch =
      equipment.seri.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isCategoryMatch = selectedCategory ? equipment.category === selectedCategory : true;
    return isSearchMatch && isCategoryMatch;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  const categories = [...new Set(equipments.map((equipment) => equipment.category))];

  return (
    <Card sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 2 }}>
        <OutlinedInput
          placeholder="Tìm kiếm theo số seri hoặc tên thiết bị"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="small" />
            </InputAdornment>
          }
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bộ lọc:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Loại thiết bị</InputLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange} label="Loại thiết bị">
              <MenuItem value="">Tất cả</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ overflowY: 'auto', height: 400 }}>
        {filteredEquipments.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Danh sách thiết bị trống</Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Số seri</TableCell>
                <TableCell>Tên thiết bị</TableCell>
                <TableCell>Loại thiết bị</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipments.map((equipment) => {
                const { label, color } = statusMap[equipment.status];
                return (
                  <TableRow key={equipment.seri}>
                    <TableCell>{equipment.seri}</TableCell>
                    <TableCell>{equipment.name}</TableCell>
                    <TableCell>{equipment.category}</TableCell>
                    <TableCell><Chip color={color} label={label} size="small" /></TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => onAdd(equipment)}
                        disabled={equipment.status === 'fixing' || selectedDeviceIds.includes(equipment.seri)}
                      >
                        {selectedDeviceIds.includes(equipment.seri) ? 'Đã chọn' : 'Thêm'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
              )}
            </TableBody>
          </Table>
        )}
      </Box>
    </Card>
  );
}

export default AddRoomEquipments;
