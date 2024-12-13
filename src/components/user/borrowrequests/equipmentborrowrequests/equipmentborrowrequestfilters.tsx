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
import CreateBorrowEquipmentRequest from "./createequipmentborrowrequests/create-equipmentborrow";
interface FilterProps {
  onFilter: (deviceType: string) => void; // Callback để gửi giá trị lọc ra ngoài
}

function BorrowEquipmentFilters({ onFilter }: FilterProps): React.JSX.Element {
  const [deviceStatus, setDeviceStatus] = useState<string>("Tất cả");

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeviceStatus(event.target.value as string);
  };

  const handleApplyFilter = () => {
    onFilter(deviceStatus); // Gửi giá trị lọc ra ngoài
    console.log("Loại thiết bị được chọn:", deviceStatus);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.paper",
        pb: 2,
       
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
          value={deviceStatus}
          onChange={handleFilterChange}
          name="reportstatus"
          label = "Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Chưa duyệt">Đã được duyệt</MenuItem>
          <MenuItem value="Đang chờ duyệt">Đang chờ duyệt</MenuItem>
          <MenuItem value="Đã trả">Đã trả</MenuItem>
          <MenuItem value="Trả 1 phần">Trả 1 phần</MenuItem>
          <MenuItem value="Quá hạn">Quá hạn</MenuItem>
        </Select>
      </FormControl>
    
      </Box>
    </Box>
  );
}

export default BorrowEquipmentFilters;