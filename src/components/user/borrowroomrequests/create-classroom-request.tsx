
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
  Grid, // Sử dụng Grid để bố trí các phần tử
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const roomCategories = [
  { category: 'Phòng học', rooms: ['Room 101', 'Room 102', 'Room 103'] },
  { category: 'Phòng máy tính', rooms: ['Computer Lab 201', 'Computer Lab 202'] },
  { category: 'Phòng thí nghiệm', rooms: ['Lab 301', 'Lab 302'] },
  { category: 'Phòng hội đồng', rooms: ['Meeting Room 401', 'Meeting Room 402'] },
];

const periodCategories = [
  {
    category: 'Buổi sáng',
    periods: [
      '7:00 - 7:45',
      '7:55 - 8:40',
      '8:50 - 9:35',
      '9:45 - 10:30',
      '10:40 - 11:25',
    ],
  },
  {
    category: 'Buổi chiều',
    periods: ['14:00 - 15:30', '15:40 - 16:25'],
  },
];

function CreateBorrowRoomRequest(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);

  const handleSubmit = () => {
    const formData = {
      //Teacher name
      date: selectedDate,
      room: selectedRoom,
      periods: selectedPeriods,
    };
    console.log('Form Data:', formData);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Tạo đơn mượn phòng
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
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
        <form>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Bố trí Tên giáo viên và Ngày mượn ở dòng đầu tiên */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên giáo viên"
                  value="UglyBoi"
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày mượn"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField className='test' fullWidth {...params} />}
                />
              </Grid>
            </Grid>

            {/* Bố trí Phòng muốn mượn và Tiết học ở dòng tiếp theo */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={roomCategories.flatMap((category) =>
                    category.rooms.map((room) => ({ group: category.category, value: room }))
                  )}
                  groupBy={(option) => option.group}
                  getOptionLabel={(option) => option.value}
                  value={selectedRoom ? { group: '', value: selectedRoom } : null}
                  onChange={(event, newValue) => setSelectedRoom(newValue?.value || null)}
                  renderInput={(params) => <TextField {...params} label="Phòng muốn mượn" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  options={periodCategories.flatMap((category) =>
                    category.periods.map((period) => ({ group: category.category, value: period }))
                  )}
                  disableCloseOnSelect
                  groupBy={(option) => option.group}
                  getOptionLabel={(option) => option.value}
                  value={selectedPeriods.map((period) => ({ group: '', value: period }))}
                  onChange={(event, newValue) => {
                    const uniquePeriods = Array.from(new Set(newValue.map((option) => option.value)));
                    setSelectedPeriods(uniquePeriods);
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.value}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} label="Tiết học" variant="outlined" />}
                  filterOptions={(options) => {
                    return options.filter(option => !selectedPeriods.includes(option.value));
                  }}
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
        </form>
      </Dialog>
    </div>
  );
};

export default CreateBorrowRoomRequest;
