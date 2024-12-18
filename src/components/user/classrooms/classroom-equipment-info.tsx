"use client";
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
import Chip from "@mui/material/Chip";

type Device = {
  serialNumber: string;
  name: string;
  type:string;
  status: "available" | "fixing";
};

const devices: Device[] = [
  { serialNumber: "SN001",type:"Hỗ trợ", name: "Máy chiếu", status: "available" },
  { serialNumber: "SN002",type:"Hỗ trợ", name: "Máy tính", status: "fixing" },
  { serialNumber: "SN003",type:"Hỗ trợ", name: "Loa", status: "available" },
];

const statusMap = {
  fixing: { label: "Đang bảo trì", color: "secondary" },
  available: { label: "Sẵn sàng", color: "success" },
} as const;

function ClassroomInfoDialog(): React.JSX.Element {
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
                  <TableCell>Loại thiết bị</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => {
                  const { label, color } =
                    statusMap[device.status] ?? {
                      label: "Không xác định",
                      color: "default",
                    };

                  return (
                    <TableRow key={device.serialNumber}>
                      <TableCell>{device.serialNumber}</TableCell>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device.type}</TableCell>
                      <TableCell>
                        <Chip color={color} label={label} size="small" />
                      </TableCell>
                    </TableRow>
                  );
                })}
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
}

export default ClassroomInfoDialog;
