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

  Divider,
  Box,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


interface BorrowerInfo {
  teacherId: string;
  teacherName: string;
  email: string;
  phone: string;
  status: string;
}

interface Room {
  name: string;
  seats: number;
  type:string
}

interface Props {
  open: boolean;
  onClose: () => void;
  borrower: BorrowerInfo;
  room: Room;
}

function BorrowRoomDialog({ open, onClose, borrower, room }: Props): React.JSX.Element {
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
        <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
          {/* Left Column: Thông tin người mượn */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, textAlign: "center" }}>
              Thông tin người mượn
            </Typography>
            <TextField
              fullWidth
              label="Mã giáo viên"
              value={borrower.teacherId}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Tên giáo viên"
              value={borrower.teacherName}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Email"
              value={borrower.email}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              value={borrower.phone}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Trạng thái</InputLabel>
              <Select value={borrower.status} readOnly>
                <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
                <MenuItem value="Chưa duyệt">Chưa duyệt</MenuItem>
                <MenuItem value="Trả một phần">Trả một phần</MenuItem>
                <MenuItem value="Quá hạn">Quá hạn</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Right Column: Thông tin thiết bị */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, textAlign: "center" }}>
              Thông tin phòng học mượn
            </Typography>
            <TextField
              fullWidth
              label="Tên phòng"
              value={room.name}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Loại phòng"
              value={room.type}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Số lượng chỗ ngồi"
              value={room.seats}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
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

function BorrowRoomDetail(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const borrower: BorrowerInfo = {
    teacherId: "GV001",
    teacherName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987654321",
    status: "Đã duyệt", // Test with "đã duyệt" status
  };

  const room: Room = 
    {
      name: "TC-310",
      seats: 50,
      type:"Phòng học"
    }
   
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Chi tiết</Button>
      <BorrowRoomDialog
        open={open}
        onClose={() => setOpen(false)}
        borrower={borrower}
        room={room}
      />
    </>
  );
}

export default BorrowRoomDetail;
