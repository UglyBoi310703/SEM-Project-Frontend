"use client";
import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { APIGetBorrowEquipmentDetailsById } from "@/utils/api";

interface BorrowerInfo {
  borrowId: number;
  teacherName: string;
  borrowDate: string;
  expectedReturnDate: string;
  comment: string;
  status: "NOT_BORROWED" | "BORROWED" | "OVERDUE" | "RETURNED" |"REJECTED";
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

}

const statusMap = {
  NOT_BORROWED: { label: "Chưa mượn", color: "warning" },
  BORROWED: { label: "Đã mượn", color: "success" },
  OVERDUE: { label: "Quá hạn", color: "error" },
  RETURNED: { label: "Đã trả", color: "info" },
  REJECTED: { label: "Bị từ chối", color: "secondary" },
} as const;

function BorrowEquipmentDetail({ borrowinfo, requestId }: DetailProps): React.JSX.Element {
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

  return (
    <Box>
      <Button size="small" variant="contained" style={{ marginRight: 8 }} onClick={() => setOpen(true)}>
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
                <strong>Mã đơn mượn:</strong> {borrowinfo.borrowId}
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
                        primary={device.name}
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
      </Dialog>
    </Box>
  );
}

export default BorrowEquipmentDetail;
