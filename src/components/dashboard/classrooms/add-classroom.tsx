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
export default function AddClassroomModal() {
  const [open, setOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState(""); // State for room type

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // Add logic to handle form submission
              console.log({ roomType });
            }}
          >
            <Card>
              <Divider />
              <CardContent>
                <Stack spacing={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Tên phòng</InputLabel>
                    <OutlinedInput
                      defaultValue=""
                      label="RoomName"
                      name="RoomName"
                    />
                  </FormControl>
                  <FormControl fullWidth required>
                    <InputLabel id="room-type-label">Loại phòng</InputLabel>
                    <Select
                      labelId="room-type-label"
                      value={roomType}
                      onChange={handleRoomTypeChange}
                      label="Loại phòng"
                    >
                      <MenuItem value="Phòng học">Phòng học</MenuItem>
                      <MenuItem value="Phòng máy tính">Phòng máy tính</MenuItem>
                      <MenuItem value="Phòng thí nghiệm">Phòng thí nghiệm</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Số lượng Chỗ ngồi</InputLabel>
                    <OutlinedInput
                      label="Số lượng Chỗ ngồi"
                      name="seats"
                      type="number"
                    />
                  </FormControl>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
