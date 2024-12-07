"use client"
import React, { useState } from "react";
import Card from '@mui/material/Card';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface FilterProps {
  onFilter: (deviceType: string) => void; // Callback để gửi giá trị lọc ra ngoài
}

function CategoryEquipmentFilter({ onFilter }: FilterProps): React.JSX.Element {
  const [deviceType, setDeviceType] = useState<string>("Tất cả");

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeviceType(event.target.value as string);
  };

  const handleApplyFilter = () => {
    onFilter(deviceType); // Gửi giá trị lọc ra ngoài
    console.log("Loại thiết bị được chọn:", deviceType);
  };

  return (
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
          value={deviceType}
          onChange={handleFilterChange}
            
          name="deviceType"
          label = "Loại thiết bị"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Điện tử">Điện tử</MenuItem>
          <MenuItem value="Cơ khí">Cơ khí</MenuItem>
          <MenuItem value="Y tế">Y tế</MenuItem>
          <MenuItem value="Khác">Khác</MenuItem>
        </Select>
      </FormControl>

      {/* Nút Áp dụng */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyFilter}
        sx={{ whiteSpace: "nowrap" }}
      >
        Áp dụng
      </Button>
      </Box>
    </Box>
  );
}

export default CategoryEquipmentFilter;
