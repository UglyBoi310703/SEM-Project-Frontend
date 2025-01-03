"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
  Chip,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { APIApproveBorrowEquipmentRequest, APIDenyBorrowEquipmentRequest, APIGetBorrowEquipmentDetailsById } from "@/utils/api";

interface BorrowerInfo {
  requestId: number;
  teacherName: string;
  borrowDate: string;
  expectedReturnDate: string;
  comment: string;
  status: "NOT_BORROWED" | "BORROWED" | "OVERDUE" | "PAID" |"REJECTED";
}

interface Device {
  id: number;
  name: string;
  quantity: number;
  conditionBeforeBorrow: string;
  serialNumbers: string[];
}

interface DetailProps {
  requestId: number;
  borrowinfo: BorrowerInfo;
  onPageChanged?: () => void; 

}

const statusMap = {
  NOT_BORROWED: { label: "Chưa mượn", color: "warning" },
  BORROWED: { label: "Đã mượn", color: "success" },
  OVERDUE: { label: "Quá hạn", color: "error" },
  PAID: { label: "Đã trả", color: "info" },
  REJECTED: { label: "Bị từ chối", color: "secondary" },
} as const;

function BorrowEquipmentDetail({ borrowinfo, requestId, onPageChanged }: DetailProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const { label, color } = statusMap[borrowinfo.status] ?? { label: "Unknown", color: "default" };

  useEffect(() => {
    if (open) {
      APIGetBorrowEquipmentDetailsById(requestId)
        .then((response) => {
          const details = response.details.map((item: any) => ({
            id: item.id,
            name: item.equipmentName,
            quantity: item.quantityBorrowed,
            conditionBeforeBorrow: item.conditionBeforeBorrow,
            serialNumbers: item.borrowedEquipmentDetailCodes,
          }));
          setDevices(details);
        })
        .catch((error) => {
          console.error("Failed to fetch equipment details:", error);
        });
    }
  }, [open, requestId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async () => {
    try {
      await Swal.fire({
        title: "Xác nhận phê duyệt?",
        text: `Bạn có chắc chắn muốn phê duyệt đơn mượn mã ${borrowinfo.requestId}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Phê duyệt",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const message = await APIApproveBorrowEquipmentRequest(borrowinfo.requestId);
          Swal.fire(`Đã phê duyệt thành công đơn mượn thiết bị mã ${borrowinfo.requestId}`, message, "success");
          if(onPageChanged){
            onPageChanged();
          }
          handleClose();
        }
      });
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể phê duyệt đơn mượn.", "error");
    }
  };

  const handleDeny = async () => {
    const { value: reason } = await Swal.fire({
      title: "Nhập lý do từ chối",
      input: "textarea",
      inputPlaceholder: "Nhập lý do...",
      inputAttributes: {
        "aria-label": "Nhập lý do từ chối",
      },
      inputValidator: (value) => {
        if (!value || value.trim() === "") {
          return "Lý do không được để trống!";
        }
      },
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });
  
    if (reason) {
      const confirmDeny = await Swal.fire({
        title: "Xác nhận từ chối",
        text: `Bạn có chắc chắn muốn từ chối đơn mượn mã ${borrowinfo.requestId} với lý do: "${reason}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
      });
  
      if (confirmDeny.isConfirmed) {
        try {
          const message = await APIDenyBorrowEquipmentRequest(borrowinfo.requestId, reason);
          Swal.fire("Thành công!", `Đã từ chối đơn mượn với lý do: ${reason}`, "success");
          if(onPageChanged){
            onPageChanged();
          }
          handleClose();
        } catch (error) {
          Swal.fire("Lỗi!", "Không thể từ chối đơn mượn.", "error");
        }
      }
    }
  };
  
  

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Chi tiết
      </Button>
      <Dialog disableEnforceFocus open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Thông tin đơn mượn thiết bị
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                <strong>Mã đơn mượn:</strong> {borrowinfo.requestId}
              </Typography>
              <Typography variant="body1">
                <strong>Tên giáo viên:</strong> {borrowinfo.teacherName}
              </Typography>
              <Typography variant="body1">
                <strong>Ngày mượn:</strong> {borrowinfo.borrowDate}
              </Typography>
              <Typography variant="body1">
                <strong>Ngày hẹn trả:</strong> {borrowinfo.expectedReturnDate}
              </Typography>
              <Typography variant="body1">
                <strong>Ghi chú:</strong> {borrowinfo.comment}
              </Typography>
              <Typography variant="body1">
                <strong>Trạng thái:</strong>
                <Chip color={color} label={label} size="small" sx={{ ml: 1 }} />
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Thông tin thiết bị mượn:
              </Typography>
              <List disablePadding>
                {(devices || []).map((device) => (
                  <Accordion key={device.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <ListItemText
                        primary={`${device.name}`}
                        secondary={`Số lượng mượn: ${device.quantity}`}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Tình trạng trước khi mượn: {device.conditionBeforeBorrow}
                      </Typography>
                      <List disablePadding>
                        {(device.serialNumbers || []).map((serial, idx) => (
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
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleDeny}
            color="error"
            disabled={borrowinfo.status !== "NOT_BORROWED"}
          >
            Từ chối
          </Button>
          <Button
            variant="outlined"
            onClick={handleApprove}
            color="primary"
            disabled={borrowinfo.status !== "NOT_BORROWED"}
          >
            Duyệt đơn
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BorrowEquipmentDetail;
