"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { X } from "@phosphor-icons/react";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { addClassRoom } from "@/utils/api";
import { useState } from "react";
export default function AddClassroomModal() {
  const [open, setOpen] = React.useState(false);

  // value in form
  const [roomName, setRoomName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRoomName("");
    setType("");
    setCapacity("");
  };

  // Update state based on input changes
  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!roomName || !type || !capacity) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    // Create classroom object
    const newClassroom = {
      roomName,
      type,
      capacity: parseInt(capacity, 10),  
    };
    await addClassRoom(newClassroom);
    alert("Phòng học đã được tạo thành công!");
    window.location.reload();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        onClick={handleClickOpen}
      >
        Thêm phòng học
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thêm phòng học
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <X />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Card>
              <Divider />
              <CardContent>
                <Stack spacing={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Tên phòng</InputLabel>
                    <OutlinedInput
                      value={roomName}
                      onChange={handleRoomNameChange}
                      label="RoomName"
                      name="RoomName"
                    />
                  </FormControl>
                  <FormControl fullWidth required>
                    <InputLabel id="room-type-label">Loại phòng</InputLabel>
                    <Select
                      labelId="room-type-label"
                      value={type}
                      onChange={handleTypeChange}
                      label="Loại phòng"
                    >
                      <MenuItem value="CLASSROOM">Phòng học</MenuItem>
                      <MenuItem value="OFFICE">Phòng làm việc</MenuItem>
                      <MenuItem value="LABORATORY">Phòng thí nghiệm</MenuItem>
                      <MenuItem value="WAREHOUSE">Phòng kho</MenuItem>
                      <MenuItem value="MEETING_ROOM">Phòng thí nghiệm</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Số lượng Chỗ ngồi</InputLabel>
                    <OutlinedInput
                      value={capacity}
                      onChange={handleCapacityChange}
                      label="Số lượng Chỗ ngồi"
                      name="seats"
                      type="number"
                    />
                  </FormControl>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
            <DialogActions>
              <Button type="submit" variant="contained">
                Lưu
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}