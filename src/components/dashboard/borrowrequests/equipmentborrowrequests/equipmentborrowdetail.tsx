"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface BorrowerInfo {
  teacherId: string;
  teacherName: string;
  email: string;
  phone: string;
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
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
        <Box sx={{ display: "flex",flexDirection:"column", gap: 4 }}>
          {/* Left Column: Thông tin người mượn */}
          <Box  sx={{  display:"flex", justifyContent:"space-between" }}>
          <Box sx={{ display: "flex",flexDirection:"column",justifyContent:"space-between" }}>
          <TextField
               value={borrower.teacherName}
               variant="standard"
               margin="dense"
               InputProps={{
                 readOnly: true,
                 startAdornment: <InputAdornment position="start">Tên người mượn: </InputAdornment>,
               }}
               sx={{
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '& .MuiInput-root:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
              }}
            />
            <TextField
               value={borrower.email}
               variant="standard"
               margin="dense"
               InputProps={{
                 readOnly: true,
                 startAdornment: <InputAdornment position="start">Email: </InputAdornment>,
               }}
               sx={{
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '& .MuiInput-root:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
              }}
            />
            
          </Box>
          <FormControl  margin="dense">
              <InputLabel>Trạng thái</InputLabel>
              <Select value={borrower.status} readOnly>
                <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
                <MenuItem value="Chưa duyệt">Chưa duyệt</MenuItem>
                <MenuItem value="Quá hạn">Quá hạn</MenuItem>
              </Select>
            </FormControl>
           
          </Box>
          <Box sx={{width:"100%"}} >
            <Typography variant="subtitle1" sx={{ mb: 2, textAlign: "center" }}>
              Thông tin thiết bị mượn
            </Typography>
            <List
              sx={{
                width: "100%",
                maxHeight: 340,
                overflow: "auto",
              }}
            >
              {devices.map((device, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <ListItemText
                      primary={`${device.name} (Số lượng: ${device.quantity})`}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
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
          disabled={borrower.status !== "Chưa duyệt"}  // Disable button if status is not "Chưa duyệt"
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
    status: "Đã duyệt", // Test with "đã duyệt" status
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
      <Button variant="contained" onClick={() => setOpen(true)}>Chi tiết</Button>
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
