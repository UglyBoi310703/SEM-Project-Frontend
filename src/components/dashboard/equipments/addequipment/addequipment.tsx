import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

function AddEquipmentModal(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    serialNumber: '',
    deviceName: '',
    manufacturer: '',
    productionYear: '',
    purchaseDate: '',
    containroom:''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      serialNumber: '',
      deviceName: '',
      manufacturer: '',
      productionYear: '',
      purchaseDate: '',
      containroom:''
    });
  };

  const handleSave = () => {

    // Thêm logic lưu dữ liệu ở đây
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={() => setOpen(true)}>
        Thêm thiết bị
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6">Thêm thiết bị</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <Stack spacing={2}>
            <TextField
              label="Số seri"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Tên thiết bị"
              name="deviceName"
              value={formData.deviceName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Hãng"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Năm sản xuất"
              name="productionYear"
              value={formData.productionYear}
              onChange={handleInputChange}
              fullWidth
              type="number"
            />
            <TextField
              label="Ngày mua"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Tên phòng chứa"
              name="containroomn"
              value={formData.containroom}
              onChange={handleInputChange}
              fullWidth
            />
          </Stack>

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 3,
            }}
          >
            <Button onClick={handleReset} variant="outlined" sx={{ mr: 2 }}>
              Đặt lại
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddEquipmentModal;
