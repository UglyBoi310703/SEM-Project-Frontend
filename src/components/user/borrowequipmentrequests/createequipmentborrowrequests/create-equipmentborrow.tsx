"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import AddEquipments from './addequipments';

interface Device {
  id: number;
  name: string;
  quantity: number;
  category:string;
}
interface SelectedDevice extends Device {
  maxQuantity: number;
  currentQuantity: number;
}

function CreateBorrowEquipmentRequest(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [borrowDate, setBorrowDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<SelectedDevice[]>([]);

  const handleAddDevice = (device: Device, maxQuantity: number) => {
    if (!selectedDevices.find((d) => d.id === device.id)) {
      setSelectedDevices([
        ...selectedDevices,
        { ...device, maxQuantity, currentQuantity: 1 },
      ]);
    }
  };

  const handleRemoveDevice = (id: number) => {
    setSelectedDevices(selectedDevices.filter((d) => d.id !== id));
  };

  const handleQuantityChange = (id: number, value: string) => {
    setSelectedDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              currentQuantity: value === '' ? 0 : Math.min(Math.max(Number(value), 1), d.maxQuantity),
            }
          : d
      )
    );
  };

  const handleBlur = (id: number) => {
    setSelectedDevices((prev) =>
      prev.map((d) =>
        d.id === id && d.currentQuantity === 0
          ? { ...d, currentQuantity: 1 }
          : d
      )
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" onClick={() => {setOpen(true)}}>
        Tạo đơn mượn thiết bị
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}  maxWidth="md">
        <DialogTitle>
          <Typography variant="h6">Tạo đơn mượn</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
          <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* Thông tin đơn mượn */}
          <Box display="flex"  gap={2}>
            {/* Borrow date */}
            <DatePicker
              label="Ngày mượn"
              value={borrowDate}
              onChange={(date) => setBorrowDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            {/* Return date */}
            <DatePicker
              label="Ngày hẹn trả"
              value={returnDate}
              onChange={(date) => setReturnDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>

        {/* Danh sách thiết bị mượn */}
       <Box sx={{ height:450, display: "flex",flexDirection:"column",alignItems:"center", gap: 3, mt: 2 }}>
       <Typography variant="h6" sx={{ mt: 2 }}>
            Danh sách thiết bị
          </Typography>
          {selectedDevices.length === 0 ? (
           <Box sx={{ height:300 }}>
             <Typography variant="body2" color="textSecondary">
              Danh sách trống
            </Typography>
           </Box>
          ) : (
            <TableContainer sx={{height:300}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên thiết bị</TableCell>
                    <TableCell>Loại thiết bị</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device.category}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <TextField
                            type="number"
                            value={device.currentQuantity === 0 ? '' : device.currentQuantity}
                            onChange={(e) => handleQuantityChange(device.id, e.target.value)}
                            onBlur={() => handleBlur(device.id)}
                            inputProps={{ min: 1, max: device.maxQuantity }}
                            sx={{ width: 80 }}
                          />
                          <Typography>/ {device.maxQuantity}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() =>
                            window.confirm('Bạn có chắc chắn muốn xóa?') &&
                            handleRemoveDevice(device.id)
                          }
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Button
            variant="outlined"
            onClick={() => setAddDeviceDialogOpen(true)}
            sx={{ mt: 2 }}
          >
            Thêm thiết bị
          </Button>
       </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>

      {/* Add device dialog */}
      <Dialog fullWidth maxWidth="md"
        open={addDeviceDialogOpen}
        onClose={() => setAddDeviceDialogOpen(false)}
      >
        <DialogTitle>Thêm thiết bị</DialogTitle>
        <DialogContent>
          <AddEquipments
            onAdd={handleAddDevice}
            selectedDeviceIds={selectedDevices.map((d) => d.id)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDeviceDialogOpen(false)}>Xong</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default CreateBorrowEquipmentRequest;
