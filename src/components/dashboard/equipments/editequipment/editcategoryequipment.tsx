import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function EditEquipmentCategoryModal(): JSX.Element {
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

  const handleSave = () => {
    console.log('Updated Category Data:', formData);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Sửa
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
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
              mb: 3,
            }}
          >
            <Typography variant="h6">Sửa danh mục thiết bị</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={12}>
              <TextField
                label="Mã thiết bị"
                name="deviceCode"
                value={formData.deviceCode}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12}>
              <TextField
                label="Tên thiết bị"
                name="deviceName"
                value={formData.deviceName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Loại thiết bị</InputLabel>
                <Select
                  label = "Loại thiết bị"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Điện tử">Điện tử</MenuItem>
                  <MenuItem value="Cơ khí">Cơ khí</MenuItem>
                  <MenuItem value="Y tế">Y tế</MenuItem>
                  <MenuItem value="Khác">Khác</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

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
}

export default EditEquipmentCategoryModal;
