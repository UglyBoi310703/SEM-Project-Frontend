import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers';
import { Autocomplete } from '@mui/material';

function EditEquipmentDialog(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    purchaseDate: null,
    roomName: 'TC-310',
    status: 'sẵn có',
    notes: '',
  });

  const roomCategories = [
    {
      category: 'Phòng học',
      options: ['Phòng học 101', 'Phòng học 102', 'Phòng học 103'],
    },
    {
      category: 'Phòng hội đồng',
      options: ['Phòng hội đồng A', 'Phòng hội đồng B'],
    },
    {
      category: 'Kho',
      options: ['Kho thiết bị 1', 'Kho thiết bị 2'],
    },
  ];

  const groupedRoomOptions = roomCategories.flatMap((category) =>
    category.options.map((option) => ({ label: option, category: category.category }))
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleRoomChange = (event: any, value: { label: string; category: string } | null) => {
    setFormData((prev) => ({ ...prev, roomName: value ? value.label : '' }));
  };

  const handleReset = () => {
    setFormData({
      purchaseDate: null,
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
        Sửa thông tin
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>
          <Typography variant="h6">Sửa thông tin thiết bị</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate autoComplete="off">
            <DatePicker
              label="Ngày mua"
              value={formData.purchaseDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, purchaseDate: date }))
              }
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />

            <Autocomplete
              options={groupedRoomOptions}
              groupBy={(option) => option.category}
              getOptionLabel={(option) => option.label}
              value={
                groupedRoomOptions.find((option) => option.label === formData.roomName) || null
              }
              onChange={handleRoomChange}
              renderInput={(params) => (
                <TextField {...params} label="Tên phòng chứa" fullWidth margin="normal" />
              )}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Trạng thái</InputLabel>
              <Select
                name="status"
                label="Trạng thái"
                value={formData.status}
                onChange={handleInputChange}
              >
                <MenuItem value="sẵn có">Sẵn có</MenuItem>
                <MenuItem value="đang được sử dụng">Đang được sử dụng</MenuItem>
                <MenuItem value="đang bảo trì">Đang bảo trì</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Ghi chú"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} variant="outlined">
            Đặt lại
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditEquipmentDialog;
