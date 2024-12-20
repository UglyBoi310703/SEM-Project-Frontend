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
import AddRoomEquipments from './add-classroomequipment';

import type { Classroom } from './classrooms-card';
 

interface Device {
  seri: string;
  name: string;
  category: string;
  status: 'available' | 'fixing';
}
const statusMap = {
  fixing: { label: 'Đang bảo trì', color: 'secondary' },
  available: { label: 'Sẵn sàng', color: 'success' },
} as const;

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
}

function ClassRoomInformation({ room }:ClassroomProps): React.JSX.Element{

  const [roomName, setRoomName] = React.useState(room.roomName);
  const [roomType, setRoomType] = React.useState(room.type);
  const [isEditing, setIsEditing] = React.useState(false); // Thêm state để quản lý chế độ chỉnh sửa
  const [open, setOpen] = React.useState(false);

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleRoomTypeChange = (event: SelectChangeEvent<string>) => {
    setRoomType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Gửi thông tin cập nhật đến backend tại đây, nếu cần
    console.log('Saved room info:', { roomName, roomType });
  };
 

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = React.useState(false);
  const [selectedDevices, setSelectedDevices] = React.useState<Device[]>([]);
  
  const handleAddDevice = (device: Device) => {
    if (!selectedDevices.find((d) => d.seri === device.seri)) {
      setSelectedDevices([...selectedDevices, device]);
    }
  };
  const handleRemoveDevice = (seri: string) => {
    setSelectedDevices(selectedDevices.filter((d) => d.seri !== seri));
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={6}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                   <Card>
                    <CardHeader title="Thông tin" />
                    <CardContent>
                      <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
                        <FormControl fullWidth>
                          <InputLabel>Tên phòng</InputLabel>
                          <OutlinedInput
                            value={roomName}
                            onChange={handleRoomNameChange}
                            label="Tên phòng"
                            disabled={!isEditing} // Disable nếu không ở chế độ chỉnh sửa
                          />
                        </FormControl>
                        <FormControl fullWidth required>
                          <InputLabel id="room-type-label">Loại phòng</InputLabel>
                          <Select
                            value={roomType}
                            labelId="room-type-label"
                            onChange={handleRoomTypeChange}
                            label="Loại phòng"
                            disabled={!isEditing} // Disable nếu không ở chế độ chỉnh sửa
                          >
                            <MenuItem value="CLASSROOM">Phòng học</MenuItem>
                            <MenuItem value="OFFICE">Phòng làm việc</MenuItem>
                            <MenuItem value="LABORATORY">Phòng thí nghiệm</MenuItem>
                            <MenuItem value="WAREHOUSE">Phòng kho</MenuItem>
                            <MenuItem value="MEETING_ROOM">Phòng họp</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel>Số lượng chỗ ngồi</InputLabel>
                          <OutlinedInput
                            value="40"
                            label="Số lượng chỗ ngồi"
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      {isEditing ? (
                        <Button variant="contained" onClick={handleSaveClick}>
                          Lưu
                        </Button>
                      ) : (
                        <Button variant="outlined" onClick={handleEditClick}>
                          Sửa
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </form>
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
                                <TableRow key={device.seri}>
                                  <TableCell>{device.seri}</TableCell>
                                  <TableCell>{device.name}</TableCell>
                                  <TableCell>{device.category}</TableCell>
                                  <TableCell><Chip color={color} label={label} size="small" /></TableCell>
                                  <TableCell>
                                    <Button
                                      color="error"
                                      onClick={() =>
                                        window.confirm('Bạn có chắc chắn muốn xóa?') &&
                                        handleRemoveDevice(device.seri)
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
                        open={addDeviceDialogOpen}
                        onClose={() => setAddDeviceDialogOpen(false)}
                        onAdd={handleAddDevice}
                        selectedDeviceIds={selectedDevices.map((d) => d.seri)}
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
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ClassRoomInformation;
