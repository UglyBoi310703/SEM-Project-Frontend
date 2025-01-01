"use client";
import React from "react";
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
  Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface BorrowerInfo {
  teacherName: string;
  status: keyof typeof statusMap;
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

const statusMap = {
  BORROWED: { label: 'Đã duyệt', color: 'success' },
  NOT_BORROWED: { label: 'Chờ duyệt', color: 'warning' },
  RETURNED: { label: 'Đã trả', color: 'info' },
} as const;

function BorrowEquipmentDetail({ open, onClose, borrower, devices }: Props): React.JSX.Element {
  const { label, color } = statusMap[borrower.status] ?? { label: 'Unknown', color: 'default' };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
              <strong>Tên giáo viên:</strong> {borrower.teacherName}
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
              {devices.map((device, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <ListItemText
                      primary={device.name}
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
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BorrowEquipmentDetail;
