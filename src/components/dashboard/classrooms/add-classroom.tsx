"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DialogActions } from "@mui/material";

import Divider from '@mui/material/Divider';
import { addClassRoom, APIGetAllRoom } from "@/utils/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Classroom } from "./classrooms-card";

const schema = yup.object({
  roomName: yup.string().required("Tên phòng là bắt buộc."),
  type: yup.string().required("Loại phòng là bắt buộc."),
  capacity: yup
    .number()
    .typeError("Sức chứa phải là số.")
    .positive("Sức chứa phải lớn hơn 0.")
    .integer("Sức chứa phải là số nguyên.")
    .required("Sức chứa là bắt buộc.")
});

export default function AddClassroomModal({ onUpdateRoom }) {
  const [open, setOpen] = React.useState(false);
  const [roomList, setRoomList] =  React.useState<Classroom[]>([]);
  const [roomNameError, setRoomNameError] = React.useState("");

  // Gọi API để lấy danh sách phòng
  React.useEffect(() => {
    if (open) {
      const fetchRooms = async () => {
        try {
          const data = await APIGetAllRoom();
          setRoomList(data.content);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };

      fetchRooms();
    }
  }, [open]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const roomName = watch("roomName");

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  React.useEffect(() => {
    if (roomName?.trim() && roomList.length > 0) {
      const isDuplicate = roomList.some(
        (room) => room.roomName.toLowerCase() === roomName.trim().toLowerCase()
      );
      setRoomNameError(isDuplicate ? "Tên phòng đã tồn tại." : "");
    } else {
      setRoomNameError("");
    }
  }, [roomName, roomList]);

  const onSubmit = async (data) => {
    setOpen(false)
    try {
      const isDuplicate = roomList.some(
        (room) => room.roomName.toLowerCase() === data.roomName.trim().toLowerCase()
      );

      if (isDuplicate) {
        toast.error("Tên phòng đã tồn tại, vui lòng chọn tên khác.");
        return;  
      }

      const result = await Swal.fire({
        title: "Xác nhận thêm phòng",
        text: "Bạn có chắc muốn thêm phòng học này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        const newClassroom = {
          roomName: data.roomName.trim(),
          type: data.type,
          capacity: parseInt(data.capacity, 10),
        };

        await addClassRoom(newClassroom);

        const mapping = {
          CLASSROOM: "Phòng học",
          OFFICE: "Phòng làm việc",
          LABORATORY: "Phòng thí nghiệm",
          WAREHOUSE: "Phòng kho",
          MEETING_ROOM: "Phòng họp",
        };
        newClassroom.type = mapping[data.type];

        if (onUpdateRoom) {
          onUpdateRoom(newClassroom);
        }

        toast.success("Phòng học đã được tạo thành công!");
      } else {
        toast.info("Bạn đã hủy thao tác thêm phòng.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm phòng học.");
      console.error("Error adding classroom:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={() => setOpen(true)}>
        Thêm phòng học
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>
        Thêm phòng học
        </DialogTitle>
        <Divider/>
      <form onSubmit={handleSubmit(onSubmit)}>

        <DialogContent>
          
        <Stack spacing={2}>
              <FormControl fullWidth error={!!errors.roomName || !!roomNameError}>
                <InputLabel >Tên phòng</InputLabel>
                <OutlinedInput label="Tên phòng" {...register("roomName")} />
                {roomNameError && (
                  <p style={{ color: "red" }}>{roomNameError}</p>
                )}
                {errors.roomName && (
                  <p style={{ color: "red" }}>{errors.roomName.message}</p>
                )}
              </FormControl>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Loại phòng</InputLabel>
                <Select label ="Loại phòng" {...register("type")}>
                  <MenuItem value="CLASSROOM">Phòng học</MenuItem>
                  <MenuItem value="OFFICE">Văn phòng cán bộ</MenuItem>
                  <MenuItem value="LABORATORY">Phòng thí nghiệm</MenuItem>
                  <MenuItem value="WAREHOUSE">Phòng kho</MenuItem>
                  <MenuItem value="MEETING_ROOM">Phòng họp</MenuItem>
                </Select>
                {errors.type && (
                  <p style={{ color: "red" }}>{errors.type.message}</p>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.capacity}>
                <InputLabel>Số lượng chỗ ngồi</InputLabel>
                <OutlinedInput label ="Số lượng chỗ ngồi" type="number" {...register("capacity")} />
                {errors.capacity && (
                  <p style={{ color: "red" }}>{errors.capacity.message}</p>
                )}
              </FormControl>
            </Stack>
          <DialogActions>
            <Button type="submit" variant="contained">
                Lưu
            </Button>
          </DialogActions>
        </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
