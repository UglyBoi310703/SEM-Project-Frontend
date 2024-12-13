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


interface ReporterInfo {
  teacherId: string;
  teacherName: string;
  email: string;
  phone: string;
  status: string;
  content: string;
}



interface Props {
  open: boolean;
  onClose: () => void;
  reporter: ReporterInfo;
}

function ReportDetailDialog({ open, onClose, reporter}: Props): React.JSX.Element{
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Dialog Header */}
      <DialogTitle>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Thông tin báo cáo sự cố
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
         
            <TextField
              fullWidth
              label="Mã giáo viên"
              value={reporter.teacherId}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Tên giáo viên"
              value={reporter.teacherName}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Email"
              value={reporter.email}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              value={reporter.phone}
              variant="outlined"
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Trạng thái</InputLabel>
              <Select value={reporter.status} readOnly>
                <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
                <MenuItem value="Chưa duyệt">Chưa duyệt</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Nội dung"
              value={reporter.content}
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
          disabled={reporter.status !== "Chưa duyệt"}  // Disable button if status is not "Chưa duyệt"
        >
          Duyệt đơn
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ReportDetail(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const reporter: ReporterInfo = {
    teacherId: "GV001",
    teacherName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987654321",
    status: "Đã duyệt", // Test with "đã duyệt" status
    content:" Thiết bị máy chiếu mang số seri: DTLT-009 xảy ra sự cố không hoạt động được"
  };

 
   
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Chi tiết</Button>
      <ReportDetailDialog
        open={open}
        onClose={() => setOpen(false)}
        reporter={reporter}
      />
    </>
  );
}

export default ReportDetail;
