"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface BorrowerInfo {
  teacherId: string;
  teacherName: string;
  email: string;
  status: string;
}

interface Device {
  name: string;
  quantity: number;
  serialNumbers: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  borrower: BorrowerInfo;
  devices: Device[];
}

function BorrowDeviceDialog({ open, onClose, borrower, devices }: Props): React.JSX.Element {
  const [status, setStatus] = useState(borrower.status);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Dialog Header */}
      <DialogTitle>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Thông tin đơn mượn thiết bị
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      {/* Dialog Content */}
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Thông tin người mượn */}
          <Box    sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            p: 2,
            bgcolor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 1,
          }}
          >
          
            <Typography variant="body1"><strong>Tên giáo viên:</strong> {borrower.teacherName}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {borrower.email}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1"><strong>Trạng thái:</strong></Typography>
              {status === "Chờ duyệt" ? (
                <Typography variant="body1">{status}</Typography>
              ) : (
                <FormControl size="small">
                  <Select value={status} onChange={handleStatusChange}>
                    <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
                    <MenuItem value="Đã trả">Đã trả</MenuItem>
                    <MenuItem value="Quá hạn">Quá hạn</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Box>
          </Box>

          <Divider />

          {/* Thông tin thiết bị */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Thông tin thiết bị mượn:
            </Typography>
            <List disablePadding>
              {devices.map((device, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <ListItemText
                      primary={`${device.name}`}
                      secondary={`Số lượng mượn: ${device.quantity}`}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <List disablePadding>
                      {device.serialNumbers.map((serial, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={`Serial: ${serial}`} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button
          variant="contained"
          disabled={status !== "Chờ duyệt"}
        >
          Duyệt đơn
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function BorrowEquipmentDetail(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const borrower: BorrowerInfo = {
    teacherId: "GV001",
    teacherName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987654321",
    status: "Đã duyệt",
  };

  const devices: Device[] = [
    {
      name: "Máy chiếu",
      quantity: 2,
      serialNumbers: ["MC001", "MC002"],
    },
    {
      name: "Laptop",
      quantity: 1,
      serialNumbers: ["LT001"],
    },
    {
      name: "Loa JBL",
      quantity: 3,
      serialNumbers: ["LH001", "LH002", "LH003"],
    },
  ];

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Chi tiết
      </Button>
      <BorrowDeviceDialog
        open={open}
        onClose={() => setOpen(false)}
        borrower={borrower}
        devices={devices}
      />
    </>
  );
}

export default BorrowEquipmentDetail;
