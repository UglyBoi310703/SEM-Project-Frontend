'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { X } from '@phosphor-icons/react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddRoomEquipments, { EquipmentDetail } from './add-classroomequipment';
import {  APIGetRoom, APIGetRoomByName, APIModifyClassRoom, APIUpdateEquipmentDetailLocation } from '@/utils/api';
import { Classroom } from './classrooms-card';


 
const statusMap = {
  'Có thể sử dụng': { label: 'Có thể sử dụng', color: 'success' },
  'Hỏng': { label: 'Hỏng', color: 'error' },
  'Đang sử dụng': { label: 'Đang sử dụng', color: 'warning' },
} as const;

const schema = yup.object({
  roomName: yup.string().required("Tên phòng là bắt buộc."),
  type: yup.string().required("Loại phòng là bắt buộc."),
  capacity: yup
    .number()
    .required("Sức chứa là bắt buộc.")
    .typeError("Sức chứa phải là số.")
    .positive("Sức chứa phải lớn hơn 0.")
    .integer("Sức chứa phải là số nguyên.")
    .required("Sức chứa là bắt buộc."),
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export interface classRoomId {
  classRoomId: string;
}
interface ClassroomProps {
  room: Classroom;
  onUpdateRoom: (room: Classroom) => Promise<void>;
}
function ClassRoomInformation({ room , onUpdateRoom}: ClassroomProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false); 
  const ClassMapping = {
    "Phòng học": "CLASSROOM",
    "văn phòng cán bộ": "OFFICE",
    "Phòng thí nghiệm": "LABORATORY",
    "Phòng kho": "WAREHOUSE",
    "Phòng họp": "MEETING_ROOM",
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roomName: room.roomName || "",
      type: ClassMapping[room.type],
      capacity: room.capacity || 0,
    },
  });

  const roomName = watch("roomName")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = React.useState(false);
  const [selectedDevices, setSelectedDevices] = React.useState<EquipmentDetail[]>([]);
  const [roomList, setRoomList] = React.useState<Classroom[]>([]);
  const [roomNameError, setRoomNameError] = React.useState("");

  React.useEffect(() => {
    if (open) {
      const fetchRooms = async () => {
        try {
          const data = await APIGetRoom();
          const filteredRooms = data.content.filter((Dataroom) => Dataroom.id !== room.id);
          setRoomList(filteredRooms);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };

      fetchRooms();
    }
  }, [open]);

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

  const handleAddDevice = (device: EquipmentDetail) => {
    if (!selectedDevices.find((d) => d.serialNumber === device.serialNumber)) {
      setSelectedDevices([...selectedDevices, device]);
    }
  };
  const handleRemoveDevice = (seri: string) => {
    setSelectedDevices(selectedDevices.filter((d) => d.serialNumber !== seri));
  };

  const onSubmit = async (data) => {
    const equipmentDetailIds = selectedDevices.map((device) => device.id);
  
    setOpen(false)
    try {
      const isDuplicate = roomList.some(
        (room) => room.roomName.toLowerCase() === data.roomName.trim().toLowerCase()
      );
      if (isDuplicate) {
        toast.error("Tên phòng đã tồn tại, vui lòng chọn tên khác.");
        return;
      }
      setOpen(false)
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

      if (!result.isConfirmed) {
        toast.info("Bạn đã hủy thao tác thêm phòng.");
        return;
      }

      const newClassroom = {
        roomName: data.roomName.trim(),
        type: data.type,
        capacity: parseInt(data.capacity, 10),
      };
      const ClassRoomEquipmentId = {
        equipmentDetailIds : equipmentDetailIds
      }
      await APIUpdateEquipmentDetailLocation(room.id, ClassRoomEquipmentId)
      await APIModifyClassRoom(room.id, newClassroom);

       
      if (newClassroom) {
        onUpdateRoom(newClassroom);
      }

       
      toast.success("Phòng học đã được sửa thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm phòng học.");
      console.error("Error modifying classroom:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Button size='small' variant="outlined" onClick={handleClickOpen}>
        Thông tin
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        maxWidth="lg"
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thông tin phòng học
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <X />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={6}>
                  <Card>
                    <CardHeader title="Thông tin" />
                    <CardContent>
                      <Stack spacing={3} sx={{ maxWidth: "sm" }}>
                        <FormControl fullWidth error={!!errors.roomName}>
                          <InputLabel>Tên phòng</InputLabel>
                          <OutlinedInput
                            {...register("roomName")}

                            label="Tên phòng"
                          />
                          <Typography variant="body2" color="error">
                            {roomNameError && (
                              <p style={{ color: "red" }}>{roomNameError}</p>
                            )}
                            {errors.roomName && (
                              <p style={{ color: "red" }}>{errors.roomName.message}</p>
                            )}
                          </Typography>
                        </FormControl>

                        <FormControl fullWidth error={!!errors.type}>
                          <InputLabel id="room-type-label">Loại phòng</InputLabel>
                          <Select
                            {...register("type")}
                            labelId="room-type-label"

                            label="Loại phòng"
                            // disabled={!isEditing}  
                          >
                            <MenuItem value="CLASSROOM">Phòng học</MenuItem>
                            <MenuItem value="OFFICE">Phòng làm việc</MenuItem>
                            <MenuItem value="LABORATORY">Phòng thí nghiệm</MenuItem>
                            <MenuItem value="WAREHOUSE">Phòng kho</MenuItem>
                            <MenuItem value="MEETING_ROOM">Phòng họp</MenuItem>
                          </Select>
                          <Typography variant="body2" color="error">
                            {errors.type?.message}
                          </Typography>
                        </FormControl>

                        <FormControl fullWidth error={!!errors.capacity}>
                          <InputLabel>Số lượng chỗ ngồi</InputLabel>
                          <OutlinedInput
                            {...register("capacity")}

                            label="Số lượng chỗ ngồi"
                          />
                          <Typography variant="body2" color="error">
                            {errors.capacity?.message}
                          </Typography>
                        </FormControl>
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button type="submit" variant="contained">
                        Lưu
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={10}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ height: 450, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 2 }}>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Danh sách thiết bị
                      </Typography>
                      {selectedDevices.length === 0 ? (
                        <Box sx={{ height: 300 }}>
                          <Typography variant="body2" color="textSecondary">
                            Danh sách trống
                          </Typography>
                        </Box>
                      ) : (
                        <TableContainer sx={{ height: 300 }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Số seri</TableCell>
                                <TableCell>Tên thiết bị</TableCell>
                                <TableCell>Loại thiết bị</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Hành động</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedDevices.map((device) => {
                                const { label, color } = statusMap[device.status];
                                return (
                                  <TableRow key={device.serialNumber}>
                                    <TableCell>{device.serialNumber}</TableCell>
                                    <TableCell>{device.equipmentName}</TableCell>
                                    <TableCell>{device.category}</TableCell>
                                    <TableCell><Chip color={color} label={label} size="small" /></TableCell>
                                    <TableCell>
                                      <Button
                                        color="error"
                                        onClick={() =>
                                          window.confirm('Bạn có chắc chắn muốn xóa?') &&
                                          handleRemoveDevice(device.serialNumber)
                                        }
                                      >
                                        Xóa
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                      <Button
                        variant="outlined"
                        onClick={() => setAddDeviceDialogOpen(true)}
                        sx={{ mt: 2 }}
                      >
                        Thêm thiết bị
                      </Button>
                    </Box>

                    {/* Add device dialog */}
                    <Dialog fullWidth maxWidth="md"
                      open={addDeviceDialogOpen}
                      onClose={() => setAddDeviceDialogOpen(false)}
                    >
                      <DialogTitle>Thêm thiết bị</DialogTitle>
                      <DialogContent>
                        <AddRoomEquipments
                          room  = {room}
                          open={addDeviceDialogOpen}
                          onClose={() => setAddDeviceDialogOpen(false)}
                          onAdd={handleAddDevice}
                          selectedDeviceIds={selectedDevices.map((d) => d.id)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setAddDeviceDialogOpen(false)}>Xong</Button>
                      </DialogActions>
                    </Dialog>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ClassRoomInformation;
