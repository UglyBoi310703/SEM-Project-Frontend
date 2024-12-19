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
  Stack,
  Autocomplete,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const roomOptions = [
  { category: 'Phòng học', name: 'Phòng A101' },
  { category: 'Phòng học', name: 'Phòng A102' },
  { category: 'Phòng hội đồng', name: 'Phòng HĐ01' },
  { category: 'Kho', name: 'Kho 01' },
  { category: 'Phòng thí nghiệm', name: 'Phòng TN01' },
];

function AddEquipmentDialog(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    purchaseDate: null,
    containRoom: null, // Chỉ chọn 1 phòng chứa
    notes: '', // Trường ghi chú
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (event: any, value: any) => {
    setFormData((prev) => ({ ...prev, containRoom: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, purchaseDate: date }));
  };

  const handleReset = () => {
    setFormData({
      purchaseDate: null,
      containRoom: null,
      notes: '',
    });
  };

  // const handleSave = () => {
  //   // Thêm logic lưu dữ liệu ở đây
  //   console.log('Dữ liệu lưu:', formData);
  //   setOpen(false);
  // };

  return (
    <>
      <Button
        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Thêm thiết bị
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Thêm thiết bị</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <DialogContent >
          <Stack mt={2} spacing={2}>
            {/* Ngày mua */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày mua"
                value={formData.purchaseDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>

            {/* Phòng chứa */}
            <Autocomplete
              options={roomOptions}
              getOptionLabel={(option) => `${option.category} - ${option.name}`}
              groupBy={(option) => option.category}
              value={formData.containRoom}
              onChange={handleRoomChange}
              isOptionEqualToValue={(option, value) => option.name === value?.name}
              renderInput={(params) => (
                <TextField {...params} label="Phòng chứa" placeholder="Chọn phòng" />
              )}
            />

            {/* Ghi chú */}
            <TextField
              label="Ghi chú"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} variant="outlined">
            Đặt lại
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddEquipmentDialog;
