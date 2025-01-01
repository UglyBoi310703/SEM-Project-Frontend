"use client";

import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import AddEquipments from "./addequipments";
import { APICreateBorrowEquipmentRequest } from "@/utils/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import dayjs from "dayjs";
interface CreateBorrowEquipmentRequestProps {
  onBorrowRequestCreated?: () => void; // Optional callback prop
}
interface Device {
  id: number;
  equipmentName: string;
  category: string;
  usableQuantity: number;
}

interface SelectedDevice extends Device {
  maxQuantity: number;
  currentQuantity: number;
}

function CreateBorrowEquipmentRequest({ onBorrowRequestCreated }: CreateBorrowEquipmentRequestProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conditionBeforeBorrow, setConditionBeforeBorrow] = useState("");
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
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedDevices(selectedDevices.filter((d) => d.id !== id));
      }
    });
  };

  const handleQuantityChange = (id: number, value: string) => {
    setSelectedDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              currentQuantity:
                value === "" ? 0 : Math.min(Math.max(Number(value), 1), d.maxQuantity),
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
  const handleSave = async () => {
    if (!returnDate || selectedDevices.length === 0) {
      await Swal.fire({
        title: "Lỗi",
        text: "Vui lòng nhập đầy đủ thông tin và chọn ít nhất một thiết bị.",
        icon: "error",
      });
      return;
    }
  
    const userData = localStorage.getItem("user");
    if (!userData) {
      await Swal.fire({
        title: "Lỗi",
        text: "Không tìm thấy thông tin người dùng.",
        icon: "error",
      });
      return;
    }
  
    const user = JSON.parse(userData);
    const requestBody = {
      userId: user.id,
      comment: message,
      expectedReturnDate: returnDate.format("YYYY-MM-DD"),
      equipmentItems: selectedDevices.map((device) => ({
        equipmentName: device.equipmentName,
        quantityBorrowed: device.currentQuantity,
        conditionBeforeBorrow: conditionBeforeBorrow || "Good",
      })),
    };
  
    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn gửi đơn mượn?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Gửi",
      cancelButtonText: "Hủy",

    });
  
    if (result.isConfirmed) {
      try {
        await APICreateBorrowEquipmentRequest(requestBody);
        setOpen(false);
        await Swal.fire({
          title: "Thành công",
          text: "Đơn mượn đã được gửi thành công. Đang chờ xét duyệt.",
          icon: "success",
        });
        setOpen(false);
        setSelectedDevices([]);
        setMessage("");
        setConditionBeforeBorrow("");
        setReturnDate(null);
        onBorrowRequestCreated && onBorrowRequestCreated();
      } catch (error) {
        await Swal.fire({
          title: "Lỗi",
          text: "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Tạo đơn mượn thiết bị
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h6">Tạo đơn mượn</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box gap={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box display="flex" gap={2}>
              <DatePicker
                label="Ngày hẹn trả"
                value={returnDate}
                onChange={(date) => setReturnDate(date)}
                minDate={dayjs()}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <TextField
                label="Tình trạng trước khi mượn"
                value={conditionBeforeBorrow}
                onChange={(e) => setConditionBeforeBorrow(e.target.value)}
                fullWidth
                multiline
              />
            </Box>
            <TextField
              label="Tin nhắn"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              sx={{ width: "60%" }}
              rows={2}
            />
          </Box>
          <Box
            sx={{
              height: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              mt: 1,
            }}
          >
            <Typography variant="h6" sx={{ mt: 2 }}>
              Danh sách thiết bị
            </Typography>
            {selectedDevices.length === 0 ? (
              <Box sx={{ height: 300 }}>
                <Typography variant="body2" color="textSecondary">
                  Danh sách trống
                </Typography>
              </Box>
            ) : (
              <TableContainer sx={{ height: 300 }}>
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
                        <TableCell>{device.equipmentName}</TableCell>
                        <TableCell>{device.category}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <TextField
                              type="number"
                              value={
                                device.currentQuantity === 0 ? "" : device.currentQuantity
                              }
                              onChange={(e) =>
                                handleQuantityChange(device.id, e.target.value)
                              }
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
                            onClick={() => handleRemoveDevice(device.id)}
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
          <Button variant="contained" onClick={handleSave}>
            Gửi
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={addDeviceDialogOpen}
        onClose={() => setAddDeviceDialogOpen(false)}
      >
        <DialogTitle>Thêm thiết bị</DialogTitle>
        <DialogContent>
          <AddEquipments
            onAdd={handleAddDevice}
            selectedDeviceNames={selectedDevices.map((d) => d.equipmentName)}
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
