import React, { useState } from 'react';
import {
  Button,
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface Equipment {
  id: string;
  name: string;
  category: string;
  totalQuantity: number;
  usableQuantity: number;
}

interface AddEquipmentsProps {
  onAdd: (device: Equipment, maxQuantity: number) => void;
  selectedDeviceIds: string[];
}

const equipments: Equipment[] = [
  { id: 'E-001', name: 'Máy chiếu', category: 'Phòng học', totalQuantity: 50, usableQuantity: 45 },
  { id: 'E-002', name: 'Loa JBL', category: 'Phòng học', totalQuantity: 50, usableQuantity: 45 },
  { id: 'E-003', name: 'Mic', category: 'Phòng học', totalQuantity: 50, usableQuantity: 45 },
  { id: 'E-004', name: 'abc', category: 'Hỗ trợ', totalQuantity: 50, usableQuantity: 45 },
  { id: 'E-005', name: 'cdf', category: 'Hỗ trợ', totalQuantity: 50, usableQuantity: 45 },
  { id: 'E-006', name: 'fhfg', category: 'Thể dục', totalQuantity: 50, usableQuantity: 45 },
  { id: 'E-007', name: 'hjy', category: 'Phòng học', totalQuantity: 50, usableQuantity: 45 },
];

function AddEquipments({ onAdd, selectedDeviceIds }: AddEquipmentsProps): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Lưu loại thiết bị được chọn

  // Lọc thiết bị theo tên và loại
  const filteredEquipments = equipments.filter((equipment) => {
    const isNameMatch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isCategoryMatch = selectedCategory ? equipment.category === selectedCategory : true;
    return isNameMatch && isCategoryMatch;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  // Lấy tất cả các loại thiết bị
  const categories = [...new Set(equipments.map((equipment) => equipment.category))];

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* Thanh tìm kiếm */}
        <OutlinedInput
          placeholder="Tìm kiếm theo tên thiết bị"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '500px' }}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Bộ lọc loại thiết bị */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bộ lọc:
          </Typography>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Loại thiết bị</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Loại thiết bị"
            >
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

      <Box
        sx={{
          overflowY: 'auto',
          height: 400, // Thiết lập chiều cao cố định và cuộn
        }}
      >
        {/* Hiển thị thông báo nếu không có thiết bị nào phù hợp */}
        {filteredEquipments.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Danh sách thiết bị trống</Typography>
          </Box>
        ) : (
          <Table stickyHeader >
            <TableHead>
              <TableRow>
                <TableCell>Tên thiết bị</TableCell>
                <TableCell>Loại thiết bị</TableCell>
                <TableCell>Có thể sử dụng</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipments.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.usableQuantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => onAdd(row, row.usableQuantity)}
                      disabled={selectedDeviceIds.includes(row.id)}
                    >
                      {selectedDeviceIds.includes(row.id) ? 'Đã chọn' : 'Thêm'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
      <Divider />
    </Card>
  );
}

export default AddEquipments;
