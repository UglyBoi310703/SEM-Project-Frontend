"use client"
import React, { useState } from 'react';
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function AddCategoryEquipmentModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    deviceCode: '',
    deviceName: '',
    deviceType: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleReset = () => {
    setFormData({
      deviceCode: '',
      deviceName: '',
      deviceType: '',
    });
  };

  // const handleSave = () => {
  //   console.log('New Category Data:', formData);
  //   setOpen(false);
  // };

  return (
    <Box sx={{
      p:2
    }}>
      <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={() => setOpen(true)}>
        Thêm danh mục thiết bị
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
         <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
         >
         <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6">Thêm danh mục thiết bị</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <Stack spacing={3}>
  
            {/* Tên thiết bị */}
            <TextField
              label="Tên thiết bị"
              name="deviceName"
              value={formData.deviceName}
              onChange={handleInputChange}
              fullWidth
            />

            {/* Loại thiết bị */}
            <FormControl fullWidth>
              <InputLabel>Loại thiết bị</InputLabel>
              <Select
                label =" Loại thiết bị"
                name="deviceType"
                value={formData.deviceType}
                onChange={handleInputChange}
              >
                <MenuItem value="Điện tử">Phòng học</MenuItem>
                <MenuItem value="Cơ khí">Hỗ trợ</MenuItem>
                <MenuItem value="Y tế">Thể dục</MenuItem>
                <MenuItem value="Khác">Thí nghiệm</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 4,
            }}
          >
            <Button onClick={handleReset} variant="outlined" sx={{ mr: 2 }}>
              Đặt lại
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
          </Box>
         </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default AddCategoryEquipmentModal;
