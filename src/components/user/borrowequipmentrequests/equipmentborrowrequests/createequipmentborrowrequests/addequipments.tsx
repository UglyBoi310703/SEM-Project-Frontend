"use client";
import React, { useState, useEffect } from "react";
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
  OutlinedInput,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { APIGetAllEquipment } from "@/utils/api";
import type { Equipment } from "@/components/dashboard/equipments/equipment-categories-table";


interface AddEquipmentsProps {
  onAdd: (device: Equipment, maxQuantity: number) => void;
  selectedDeviceIds: string[];
}

function AddEquipments({ onAdd, selectedDeviceIds }: AddEquipmentsProps): React.JSX.Element {
  const [equipmentCategories, setEquipmentCategories] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await APIGetAllEquipment();
        setEquipmentCategories(data.content);
      } catch (err) {
        console.error("Error fetching equipment data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  const filteredEquipments = equipmentCategories.filter((equipment) => {
    const isNameMatch = equipment.equipmentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isCategoryMatch = selectedCategory
      ? equipment.category === selectedCategory
      : true;
    return isNameMatch && isCategoryMatch;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  // Lấy tất cả các loại thiết bị
  const categories = Array.from(
    new Set(equipmentCategories.map((equipment) => equipment.category))
  );

  return (
    <Card>
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
        {/* Thanh tìm kiếm */}
        <OutlinedInput
          placeholder="Tìm kiếm theo tên thiết bị"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: "500px" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Bộ lọc loại thiết bị */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
          overflowY: "auto",
          height: 400, // Thiết lập chiều cao cố định và cuộn
        }}
      >
        {/* Hiển thị thông báo nếu không có thiết bị nào phù hợp */}
        {isLoading ? (
          <Box sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Đang tải dữ liệu...</Typography>
          </Box>
        ) : filteredEquipments.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Danh sách thiết bị trống</Typography>
          </Box>
        ) : (
          <Table stickyHeader>
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
                    <Typography variant="subtitle2">{row.equipmentName}</Typography>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.usableQuantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => onAdd(row, row.usableQuantity)}
                      disabled={selectedDeviceIds.includes(row.id)}
                    >
                      {selectedDeviceIds.includes(row.id) ? "Đã chọn" : "Thêm"}
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
