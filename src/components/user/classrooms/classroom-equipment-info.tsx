"use client"
import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Device = {
  serialNumber: string;
  name: string;
  status: string;
};

const devices: Device[] = [
  { serialNumber: "SN001", name: "Máy chiếu", status: "Hoạt động" },
  { serialNumber: "SN002", name: "Máy tính", status: "Đang bảo trì" },
  { serialNumber: "SN003", name: "Loa", status: "Hoạt động" },
];

function ClassroomInfoDialog(): React.JSX.Element{
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Số seri thiết bị</TableCell>
                  <TableCell>Tên thiết bị</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.serialNumber}>
                    <TableCell>{device.serialNumber}</TableCell>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassroomInfoDialog;
