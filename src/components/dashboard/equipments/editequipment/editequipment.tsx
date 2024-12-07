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

function EditEquipmentModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    serialNumber: '',
    deviceName: '',
    manufacturer: '',
    productionYear: '',
    purchaseDate: '',
    roomName: '', // Trường mới: Tên phòng chứa
    status: 'sẵn có',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleReset = () => {
    setFormData({
      serialNumber: '',
      deviceName: '',
      manufacturer: '',
      productionYear: '',
      purchaseDate: '',
      roomName: '',
      status: 'sẵn có',
      notes: '',
    });
  };

  const handleSave = () => {
    console.log('Updated Device Data:', formData);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Sửa thiết bị
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
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
            <Typography variant="h6">Sửa thiết bị</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={6}>
              <TextField
                label="Số seri"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tên thiết bị"
                name="deviceName"
                value={formData.deviceName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            {/* Row 2 */}
            <Grid item xs={6}>
              <TextField
                label="Hãng"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Năm sản xuất"
                name="productionYear"
                value={formData.productionYear}
                onChange={handleInputChange}
                fullWidth
                type="number"
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={6}>
              <TextField
                label="Ngày mua"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="sẵn có">Sẵn có</MenuItem>
                  <MenuItem value="đang được sử dụng">
                    Đang được sử dụng
                  </MenuItem>
                  <MenuItem value="đang bảo trì">Đang bảo trì</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Row 4 */}
            <Grid item xs={6}>
              <TextField
                label="Tên phòng chứa"
                name="roomName"
                value={formData.roomName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ghi chú"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
              />
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

export default EditEquipmentModal;
