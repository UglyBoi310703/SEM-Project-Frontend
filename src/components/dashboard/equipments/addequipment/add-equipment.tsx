import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete } from '@mui/material'; // Import Autocomplete từ MUI
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { APIAddNewEquipmentDetail, APIGetRoom } from '@/utils/api';
import { Classroom } from '../../classrooms/classrooms-card';

const validationSchema = Yup.object({
  purchaseDate: Yup.date().required('Ngày mua không được để trống'),
  containRoom: Yup.object()
    .nullable()
    .required('Phòng chứa không được để trống'),
  notes: Yup.string().max(200, 'Ghi chú không được vượt quá 200 ký tự'),
});

function AddEquipmentDialog({ equipmentCategory , setUpdated}) {
  const [open, setOpen] = useState(false);
  const [roomOptions, setRoomOptions] = useState<Classroom[]>([]);

  const fetchRoomOptions = async (query) => {
    try {
      const response = await APIGetRoom('', '', query);
      setRoomOptions(response.content);  
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  React.useEffect(() => {
    // Gọi API lấy danh sách phòng mặc định
    fetchRoomOptions('');
  }, []);

  const formik = useFormik({
    initialValues: {
      purchaseDate: null,
      containRoom: null,
      notes: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          description: values.notes,
          purchaseDate: dayjs(values.purchaseDate.toDate()).format("DD-MM-YYYY"),
          equipmentId: equipmentCategory.id,
          roomId: values.containRoom?.id || null,  
        } 
  
        // Gọi API để thêm thiết bị mới
        await APIAddNewEquipmentDetail(data);
        toast.success('Thiết bị đã được lưu thành công!');
        
        // Reset form sau khi thêm thành công
        formik.resetForm();
        if (setUpdated) {
          setUpdated(true);
        }
        // Đóng dialog
        setOpen(false);
      } catch (error) {
        console.error('Lỗi khi thêm thiết bị mới:', error);
        toast.error('Lỗi khi thêm thiết bị. Vui lòng thử lại!');
      }
    },
  });
  

  return (
    <>
      <Button
        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Thêm thiết bị
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Thêm thiết bị</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Stack mt={2} spacing={2}>
              {/* Ngày mua */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày mua"
                  value={formik.values.purchaseDate}
                  onChange={(value) => formik.setFieldValue('purchaseDate', value)}
                  onBlur={() => formik.setFieldTouched('purchaseDate', true)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!formik.errors.purchaseDate && formik.touched.purchaseDate}
                      helperText={formik.touched.purchaseDate && formik.errors.purchaseDate}
                    />
                  )}
                />
              </LocalizationProvider>

              {/* Phòng chứa */}
              <Autocomplete
                options={roomOptions}
                getOptionLabel={(option) => option.roomName || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(event, value) => fetchRoomOptions(value)} // Gọi API khi tìm kiếm
                value={formik.values.containRoom}
                onChange={(event, value) => formik.setFieldValue('containRoom', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Phòng chứa"
                    placeholder="Chọn hoặc tìm phòng"
                    fullWidth
                    error={!!formik.errors.containRoom && formik.touched.containRoom}
                    helperText={formik.touched.containRoom && formik.errors.containRoom}
                  />
                )}
              />

              {/* Ghi chú */}
              <TextField
                label="Ghi chú"
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={3}
                error={!!formik.errors.notes && formik.touched.notes}
                helperText={formik.touched.notes && formik.errors.notes}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => formik.resetForm()} variant="outlined">
              Đặt lại
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddEquipmentDialog;
