import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Autocomplete,
  TextField,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { EquipmentDetail } from "./add-classroomequipment";

interface Room {
  id: number;
  name: string;
}

const rooms: Room[] = [
  { id: 1, name: "Room 101" },
  { id: 2, name: "Room 102" },
  { id: 3, name: "Room 103" },
];

function ChangeDeviceLocationDialog({ EquipmentChange }: EquipmentDetail): React.JSX.Element {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    if (selectedRoom) {
      console.log(`Device moved to: ${selectedRoom.name}`);
    } else {
      console.error("No room selected!");
    }
    handleClose();
  };

  return (
    <Box sx={{
        width:"200px"
       }}>
      <Button size="small" onClick={handleOpen} variant="contained" color="primary">
        Chuyển phòng
      </Button>
      <Dialog maxWidth="xs" fullWidth open={open}  onClose={handleClose}>
        <DialogTitle>
          Đổi vị trí thiết bị
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
       >
          <Autocomplete
          sx={{
            mt:2
          }}
            options={rooms}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Chọn phòng" variant="outlined" />}
            value={selectedRoom}
            onChange={(event, newValue) => setSelectedRoom(newValue)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChangeDeviceLocationDialog;
