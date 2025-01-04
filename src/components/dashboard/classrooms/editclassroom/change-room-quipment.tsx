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
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import type { EquipmentDetail } from "./add-classroomequipment";
import { APIGetRoom, APIUpdateEquipmentDetailLocation } from "@/utils/api";
import Swal from "sweetalert2";
import { Classroom } from "../classrooms-card";

 
function ChangeDeviceLocationDialog({ device, room, fetchEquipments }: EquipmentDetail & { room: Classroom }): React.JSX.Element {
  const [selectedRoom, setSelectedRoom] = useState<Classroom | null>(null);
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);




  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchRooms = async (keyword: string) => {
    setLoading(true);
    try {
      const response = await APIGetRoom('', '', keyword)
      const filteredRooms = response.content.filter((r) => r.id !== room.id);
      setRooms(filteredRooms);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm phòng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedRoom) {
      console.error("No room selected!");
      return;
    }

    const confirmation = await Swal.fire({
      title: "Xác nhận chuyển phòng",
      text: `Bạn có chắc muốn chuyển thiết bị đến phòng "${selectedRoom.roomName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });

    if (!confirmation.isConfirmed) {
      console.log("Người dùng đã hủy xác nhận.");
      return;
    }

    const requestData = {
      equipmentDetailIds: [device.id],
    };



    try {
      const respone = await APIUpdateEquipmentDetailLocation(selectedRoom.id, requestData);
      if(respone){
        fetchEquipments()
      }
      
      Swal.fire("Thành công!", `Thiết bị đã được chuyển đến phòng: ${selectedRoom.roomName}`, "success");
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể cập nhật vị trí thiết bị.", "error");
      console.error("Lỗi khi cập nhật vị trí thiết bị:", error);
    }

    handleClose();
  };

  React.useEffect(()=> {
    console.log(selectedRoom);
    
  }, [selectedRoom])

  return (
    <Box sx={{ width: "200px" }}>
      <Button size="small" onClick={handleOpen} variant="contained" color="primary">
        Chuyển phòng
      </Button>
      <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
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
        <DialogContent>
          <Autocomplete
            sx={{ mt: 2 }}
            options={rooms}
            getOptionLabel={(option) => option.roomName || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tìm kiếm phòng"
                variant="outlined"
                onChange={(event) => handleSearchRooms(event.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            value={selectedRoom}
            onChange={(event, newValue) =>setSelectedRoom(newValue)}
            
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
