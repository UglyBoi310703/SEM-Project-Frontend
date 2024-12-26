import React, { useEffect, useState } from 'react';
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
  Chip,
} from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';
import { APIgetAllEquipmentDetail } from '@/utils/api';

export interface EquipmentDetail {
  id: number;
  equipmentName: string;
  roomName: string;
  category: string;
  serialNumber: string;
  description: string;
  purchaseDate: string;
  status: 'Có thể sử dụng' | 'Hỏng' | 'Đang sử dụng';
}

interface AddEquipmentsProps {
  onAdd: (device: EquipmentDetail) => void;
  selectedDeviceIds: number[];
}

const statusMap = {
  'Có thể sử dụng': { label: 'Có thể sử dụng', color: 'success' },
  'Hỏng': { label: 'Hỏng', color: 'error' },
  'Đang sử dụng': { label: 'Đang sử dụng', color: 'warning' },
} as const;

function AddRoomEquipments({ onAdd, selectedDeviceIds }: AddEquipmentsProps): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [equipments, setEquipments] = React.useState<EquipmentDetail[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const data = await APIgetAllEquipmentDetail('', 0, 10);
        setEquipments(data.content);
      } catch (err) {
        console.error('Error fetching equipments', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipments();
  }, []);

  const filteredEquipments = equipments.filter((equipment) => {
    const isSearchMatch =
      equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.equipmentName.toLowerCase().includes(searchTerm.toLowerCase());
    const isCategoryMatch = selectedCategory ? equipment.category === selectedCategory : true;
    return isSearchMatch && isCategoryMatch;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Card sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 2 }}>
        <OutlinedInput
          placeholder="Nhập số seri hoặc tên thiết bị"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="small" />
            </InputAdornment>
          }
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
                  <TableRow key={equipment.id}>
                    <TableCell>{equipment.serialNumber}</TableCell>
                    <TableCell>{equipment.equipmentName}</TableCell>
                    <TableCell>{equipment.category}</TableCell>
                    <TableCell>
                      <Chip color={color} label={label} size="small" />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => onAdd(equipment)}
                        disabled={
                          equipment.status === 'Đang sử dụng' || selectedDeviceIds.includes(equipment.id)
                        }
                      >
                        {
                        selectedDeviceIds.includes(equipment.id) ? 'Đã chọn' : 'Thêm'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>
    </Card>
  );
}

export default AddRoomEquipments;
