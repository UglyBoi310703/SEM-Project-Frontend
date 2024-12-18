'use client';
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
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ReporterInfo {
  teacherName: string;
  email: string;
  status: string;
  content: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  reporter: ReporterInfo;
}

function ReportDetailDialog({ open, onClose, reporter }: Props): React.JSX.Element {
  const isApproved = reporter.status === "Đã duyệt";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Dialog Header */}
      <DialogTitle>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Báo Cáo Sự Cố
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
        <Box
          sx={{
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
          <Typography variant="body1">
            <strong>Tên giáo viên:</strong> {reporter.teacherName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {reporter.email}
          </Typography>
          <Typography variant="body1">
            <strong>Trạng thái:</strong> <span style={{ color: isApproved ? "green" : "orange" }}>{reporter.status}</span>
          </Typography>
          <Typography variant="body1">
            <strong>Nội dung:</strong> {reporter.content}
          </Typography>
        </Box>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button
          variant="contained"
          disabled={isApproved} // Disable button if status is "Đã duyệt"
          onClick={() => {
            if (!isApproved) {
              alert("Đơn đã được duyệt!")
            };
          }}
        >
          Duyệt Đơn
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ReportDetail(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const reporter: ReporterInfo = {
    teacherName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    status: "Đã duyệt", // Test with "đã duyệt" status
    content: "Thiết bị máy chiếu mang số seri: DTLT-009 xảy ra sự cố không hoạt động được",
  };

  return (
    <>
      <Button variant="contained" onClick={() =>{ setOpen(true)}}>
       Chi tiết
      </Button>
      <ReportDetailDialog
        open={open}
        onClose={() => {setOpen(false)}}
        reporter={reporter}
      />
    </>
  );
}

export default ReportDetail;
