"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { APIgetAllEquipmentDetailByRoomID } from "@/utils/api";

type Device = {
  id: number;
  serialNumber: string;
  equipmentName: string;
  category: string;
  status: string;
  purchaseDate: string;
};

const statusMap = {
  "Đang sử dụng": { label: "Đang sử dụng", color: "warning" },
  "Có thể sử dụng": { label: "Sẵn sàng", color: "success" },
  "Hỏng": { label: "Hỏng", color: "error" },
} as const;

type Props = {
  RoomId: number;
};

function ClassroomInfoDialog({ RoomId }: Props): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    await fetchDevices(RoomId);
  };

  const handleClose = () => setOpen(false);

  const fetchDevices = async (roomId: number) => {
    setLoading(true);
    try {
      const response = await APIgetAllEquipmentDetailByRoomID(roomId);
      setDevices(response.content); // Dữ liệu content từ API
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Thiết bị
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Thông tin thiết bị gắn tại phòng</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Số seri thiết bị</TableCell>
                    <TableCell>Tên thiết bị</TableCell>
                    <TableCell>Loại thiết bị</TableCell>
                    <TableCell>Trạng thái</TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.length > 0 ? (
                    devices.map((device) => {
                      const { label, color } =
                        statusMap[device.status] ?? {
                          label: "Không xác định",
                          color: "default",
                        };

                      return (
                        <TableRow key={device.id}>
                          <TableCell>{device.serialNumber}</TableCell>
                          <TableCell>{device.equipmentName}</TableCell>
                          <TableCell>{device.category}</TableCell>
                          <TableCell>
                            <Chip color={color} label={label} size="small" />
                          </TableCell>
                       
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Không có thiết bị nào.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClassroomInfoDialog;
