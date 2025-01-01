"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Warning } from "@phosphor-icons/react";
import { APISendAlertNotify } from "@/utils/api";

function CreateCrashReport(): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [reportContent, setReportContent] = useState<string>("");

  // Mở dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Đóng dialog
  const handleClose = () => {
    setOpen(false);
    setReportContent(""); // Xóa nội dung báo cáo khi đóng dialog
  };

  // Xử lý thay đổi nội dung báo cáo
  const handleReportContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportContent(event.target.value);
  };

  // Gửi báo cáo
  const handleSubmit = async () => {
    if (!reportContent.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nội dung rỗng!",
        text: "Vui lòng nhập nội dung báo cáo trước khi gửi.",
        confirmButtonText: "Đã hiểu",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Xác nhận gửi báo cáo",
      text: "Bạn có chắc chắn muốn gửi báo cáo này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Gửi",
      cancelButtonText: "Hủy",
    });

    if (confirmResult.isConfirmed) {
      try {
        await APISendAlertNotify(reportContent);
        Swal.fire({
          icon: "success",
          title: "Gửi thành công!",
          text: "Báo cáo của bạn đã được gửi thành công.",
          confirmButtonText: "Đóng",
        });
        handleClose(); // Đóng dialog
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gửi thất bại!",
          text: "Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại.",
          confirmButtonText: "Đóng",
        });
      }
    }
  };

  // Hủy báo cáo
  const handleCancel = () => {
    setReportContent(""); // Xóa nội dung khi hủy
    handleClose(); // Đóng dialog
  };

  return (
    <Box>
      <Tooltip title="Báo cáo sự cố">
        <IconButton onClick={handleOpen}>
          <Warning />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Báo cáo sự cố
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <DialogContent>
            <Box component="form" mt={2}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Nội dung báo cáo"
                variant="outlined"
                value={reportContent}
                onChange={handleReportContentChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Hủy
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Gửi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default CreateCrashReport;
