import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Autocomplete,
  Box,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import { APIGetRoom } from '@/utils/api';
import { APICreateBorrowRoomRequest } from '@/utils/api';

interface RoomOption {
  group: string;
  value: number;
  label: string;
}
interface CreateBorrowRoomRequestProps {
  onBorrowRequestCreated?: () => void; // Optional callback prop
}
function CreateBorrowRoomRequest({ onBorrowRequestCreated }: CreateBorrowRoomRequestProps): React.JSX.Element {
  const [classrooms, setClassrooms] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [message,Setmessage] = useState<string>("")

  const processRoomData = (rooms) => {
    //  Lấy danh sách các nhóm (type) không trùng lặp
    const uniqueGroups = [...new Set(rooms.map((room) => room.type))];
  
    // Gom nhóm các phòng theo type
    const groupedRooms = uniqueGroups.map((group) => ({
      group,
      rooms: rooms.filter((room) => room.type === group)
        .map((room) => ({
          value: room.id, // ID của phòng
          label: room.roomName, // Tên phòng
        })),
    }));
  
    return groupedRooms;
  };

  const fetchRooms = async () => {
    try {
      const data = await APIGetRoom('', 'AVAILABLE', '', 0, 20);
      console.log("API Response:", data.content);
  
      // Gọi hàm xử lý logic
      const formattedClassrooms = processRoomData(data.content);
      console.log("Processed Rooms:", formattedClassrooms);
  
      setClassrooms(formattedClassrooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };
  


  const arePeriodsConsecutive = (periods: string[]): boolean => {
    const periodTimes = periods.map((period) => {
      const [start, end] = period.split(" - ");
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);

      return {
        start: startHour * 60 + startMinute,
        end: endHour * 60 + endMinute,
      };
    });

    for (let i = 1; i < periodTimes.length; i++) {
      if (periodTimes[i - 1].end + 10 !== periodTimes[i].start) {
        return false;
      }
    }

    return true;
  };

  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}:00`;
  };

  const handleSubmit = async () => {
    if (!selectedDate || selectedPeriods.length === 0 || !selectedRoom) {
      Swal.fire('Lỗi', 'Vui lòng chọn ngày, phòng và tiết học.', 'error');
      return;
    }
  
    if (!arePeriodsConsecutive(selectedPeriods)) {
      Swal.fire('Lỗi', 'Vui lòng chọn các tiết liền nhau (có 10 phút giải lao).', 'error');
      return;
    }
  
    const confirmResult = await Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn gửi yêu cầu mượn phòng?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
    });
  
    if (!confirmResult.isConfirmed) return;
  
    const user = localStorage.getItem("user");
    if (!user) {
      Swal.fire('Lỗi', 'Không tìm thấy thông tin người dùng.', 'error');
      return;
    }
    const userId = JSON.parse(user).id;
  
    const dateObj = selectedDate.$d || selectedDate;
    const dateString = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  
    const periodTimes = selectedPeriods.map((period) => period.split(" - "));
    const startTime = `${dateString}T${formatTime(periodTimes[0][0])}.000Z`;
    const endTime = `${dateString}T${formatTime(periodTimes[periodTimes.length - 1][1])}.000Z`;
  
    const formData = {
      userId,
      roomId: selectedRoom.value,
      startTime,
      endTime,
      comment: message,
    };
  
    try {
      await APICreateBorrowRoomRequest(formData);
      Swal.fire('Thành công', 'Yêu cầu mượn phòng thành công.', 'success');
  
      // Đóng dialog
      setOpen(false);
      if(onBorrowRequestCreated){
        onBorrowRequestCreated();
      };
      // Gọi callback onBorrowRequestCreated nếu được truyền
    } catch (error: any) {
      console.error("Lỗi khi gửi yêu cầu mượn phòng:", error);
  
      if (error.response && error.response.status === 400) {
        Swal.fire('Lỗi', 'Vui lòng chọn đúng thời gian ở tương lai.', 'error');
      } else if (error.response && error.response.status === 409) {
        Swal.fire('Lỗi', 'Không thể đặt phòng do phòng đã được đặt trong khoảng thời gian bạn chọn.', 'error');
      } else {
        Swal.fire('Lỗi', 'Đã xảy ra lỗi khi gửi yêu cầu mượn phòng.', 'error');
      }
    }
  };
  

  React.useEffect(() => {
    fetchRooms();
  }, []);
  
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Tạo đơn mượn phòng
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Tạo đơn mượn phòng
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày mượn"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Autocomplete
                  options={classrooms.flatMap((group) => group.rooms)} // Trộn tất cả các phòng từ các nhóm
                  groupBy={(option) => {
                    const group = classrooms?.find((grp) =>
                      grp.rooms?.some((room) => room.value === option.value)
                    );
                    return group ? group.group : 'Khác';
                  }}
                  getOptionLabel={(option) => option.label}
                  value={selectedRoom}
                  onChange={(event, newValue) => setSelectedRoom(newValue as RoomOption | null)}
                  renderInput={(params) => (
                    <TextField {...params} label="Phòng muốn mượn" variant="outlined" />
                  )}
                />

              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  options={[
                    { group: "Buổi sáng", value: "7:00 - 7:45" },
                    { group: "Buổi sáng", value: "7:55 - 8:40" },
                    { group: "Buổi sáng", value: "8:50 - 9:35" },
                    { group: "Buổi sáng", value: "9:45 - 10:30" },
                    { group: "Buổi sáng", value: "10:40 - 11:25" },
                    { group: "Buổi chiều", value: "14:00 - 15:30" },
                    { group: "Buổi chiều", value: "15:40 - 16:25" },
                  ]}
                  disableCloseOnSelect
                  groupBy={(option) => option.group}
                  getOptionLabel={(option) => option.value}
                  value={selectedPeriods.map((period) => ({ group: "", value: period }))}
                  onChange={(event, newValue) => {
                    const uniquePeriods = Array.from(new Set(newValue.map((option) => option.value)));
                    setSelectedPeriods(uniquePeriods);
                  }}
                  renderOption={(props, option) => <li {...props}>{option.value}</li>}
                  renderInput={(params) => (
                    <TextField {...params} label="Tiết học" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Tin nhắn"
                    value={message}
                    onChange={(e) => Setmessage(e.target.value)}
                    multiline
                 
                  />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            Tạo đơn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBorrowRoomRequest;
