"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Divider,
  Box,
  Button,
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
  type: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  borrower: BorrowerInfo;
  room: Room;
}

function BorrowRoomDialog({ open, onClose, borrower, room }: Props): React.JSX.Element {
  const isApproved = borrower.status === "Đã duyệt";
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Hóa đơn Header */}
      <DialogTitle>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Thông tin đơn mượn phòng
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      {/* Nội dung đơn mượn */}
      <DialogContent>
        {/* Phần thông tin người mượn */}
  
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            p: 2,
            bgcolor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 1,
          }}>
           <Typography variant="body1">
                      <strong>Tên giáo viên:</strong> {borrower.teacherName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {borrower.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Trạng thái:</strong> <span style={{ color: isApproved ? "green" : "orange" }}>{borrower.status}</span>
                    </Typography>
                 
        </Box>

        {/* Phần thông tin phòng */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Thông tin phòng học:
        </Typography>
        <Box  sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            p: 2,
            bgcolor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 1,
          }}>
          <Typography><strong>Tên phòng:</strong> {room.name}</Typography>
          <Typography><strong>Loại phòng:</strong> {room.type}</Typography>
          <Typography><strong>Số lượng chỗ ngồi:</strong> {room.seats}</Typography>
        </Box>
      </DialogContent>

      {/* Chân hóa đơn */}
      <Divider />
      <DialogActions>
        <Button
          variant="contained"
          disabled={borrower.status !== "Chưa duyệt"} // Disable button nếu không phải "Chưa duyệt"
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
    status: "Đã duyệt",
  };

  const room: Room = {
    name: "TC-310",
    seats: 50,
    type: "Phòng học",
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Thông tin
      </Button>
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
