import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers';
import { Autocomplete } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EquipmentDetail } from '../../classrooms/add-classroomequipment';
import { Classroom } from '../../classrooms/classrooms-card';
import { APIGetRoom, APIUpdateEquipmentDetail, NewEquipmentCategoryRequest, NewEquipmentRequest } from '@/utils/api';
import _ from 'lodash';
import { Equipment } from '../equipment-categories-table';

const validationSchema = yup.object().shape({
  purchaseDate: yup
    .mixed<Dayjs>()
    .test('isValidDate', 'Ngày không hợp lệ', (value) => value?.isValid() || false)
    .required('Ngày mua là bắt buộc'),
  roomName: yup.string().required('Tên phòng chứa là bắt buộc'),
  status: yup.string().required('Trạng thái là bắt buộc'),
  notes: yup.string().max(500, 'Ghi chú không được vượt quá 500 ký tự'),
});

function EditEquipmentDialog({equipmentCategory, equipmentDetail }: { equipmentDetail: EquipmentDetail, equipmentCategory:Equipment }): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [roomCategories, setRoomCategories] = useState<Classroom[]>([])

  const {
    getValues,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      purchaseDate: equipmentDetail.purchaseDate
        ? dayjs(equipmentDetail.purchaseDate, 'DD-MM-YYYY')
        :  '',
      roomName: equipmentDetail.roomName,
      status: equipmentDetail.status,
      notes: equipmentDetail.description,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (equipmentDetail) {
      reset({
        purchaseDate: equipmentDetail.purchaseDate
          ? dayjs(equipmentDetail.purchaseDate, 'DD-MM-YYYY')
          : '',
        roomName: equipmentDetail.roomName,
        status: equipmentDetail.status,
        notes: equipmentDetail.description,
      });
    }
  }, [equipmentDetail, reset]);
  const fetchRoomOptions = async (query: string) => {
    if (!query) {
      setRoomCategories([]);
      return;
    }

    try {
      const [classrooms, meetingRooms, laboratories, offices] = await Promise.all([
        APIGetRoom('CLASSROOM', '', query),
        APIGetRoom('MEETING_ROOM', '', query),
        APIGetRoom('LABORATORY', '', query),
        APIGetRoom('OFFICE', '', query),
      ]);

      const roomCategories = [
        {
          category: 'Phòng học',
          options: classrooms.content || [],
        },
        {
          category: 'Phòng hội đồng',
          options: meetingRooms.content || [],
        },
        {
          category: 'Kho',
          options: laboratories.content || [],
        },
        {
          category: 'Văn phòng',
          options: offices.content || [],
        },
      ];
      setRoomCategories(roomCategories);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      toast.error('Không thể tải danh sách phòng.');
    }
  };
  const debounceFetchRooms = React.useCallback(_.debounce(fetchRoomOptions, 300), []);
  const groupedRoomOptions = roomCategories.flatMap((category) =>
    category.options.map((option) => ({
      label: option.roomName,   
      value: option.id,         
      category: category.category,
    }))
  );
  const onSubmit = async (data: any) => {
    console.log(data);
    
    try {
      // Gọi API để lấy danh sách phòng dựa trên roomName
      const response = await APIGetRoom('', '', data.roomName);
      
      // Kiểm tra nếu tìm thấy phòng
      if (response.content && response.content.length > 0) {
        const roomId = response.content[0].id;  // Lấy id của phòng đầu tiên khớp với roomName
        
        // Định dạng lại ngày mua
        const purchaseDate = data.purchaseDate
          ? dayjs(data.purchaseDate.toDate()).format("DD-MM-YYYY")
          :  '';
  
        // Tạo đối tượng dữ liệu chỉnh sửa
        const EditedData = {
          "description": data.notes, 
          "purchaseDate": purchaseDate,
          "equipmentId": equipmentCategory.id,
          "roomId": roomId  
        }  ;
   
        
        await APIUpdateEquipmentDetail(equipmentDetail.id, EditedData)
        // Gửi dữ liệu đến API hoặc thực hiện xử lý tiếp theo
        console.log("Dữ liệu chỉnh sửa:", EditedData);
  
        toast.success('Lưu thông tin thành công!');
        setOpen(false);
      } else {
        // Trường hợp không tìm thấy phòng
        toast.error('Không tìm thấy phòng. Vui lòng kiểm tra lại tên phòng.');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      toast.error('Lỗi khi lấy thông tin phòng. Vui lòng thử lại.');
    }
  };
  

  const handleReset = () => {
    reset({
      purchaseDate: equipmentDetail.purchaseDate
        ? dayjs(equipmentDetail.purchaseDate, 'DD-MM-YYYY')
        : null,
      roomName: equipmentDetail.roomName,
      status: equipmentDetail.status,
      notes: equipmentDetail.description,
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Sửa thông tin
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>
          <Typography variant="h6">Sửa thông tin thiết bị</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <DatePicker
              label="Ngày mua"
              value={getValues('purchaseDate') || null}
              onChange={(date) => setValue('purchaseDate', date || null, { shouldValidate: true })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!errors.purchaseDate}
                  helperText={errors.purchaseDate?.message}
                />
              )}
            />

            <Autocomplete
              options={groupedRoomOptions}
              groupBy={(option) => option.category}
              getOptionLabel={(option) => option.label}
              defaultValue={
                equipmentDetail.roomName
                  ? { label: equipmentDetail.roomName, category: 'Unknown' }
                  : null
              }
              
              onInputChange={(event, value) => debounceFetchRooms(value)}
              onChange={(_, value) => setValue('roomName', value?.value || '', { shouldValidate: true })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tên phòng chứa"
                  fullWidth
                  margin="normal"
                  error={!!errors.roomName}
                  helperText={errors.roomName?.message}
                  {...register('roomName')}
                />
              )}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Trạng thái</InputLabel>
              <Select
                defaultValue={equipmentDetail.status || 'Có thể sử dụng'}
                {...register('status')}
                error={!!errors.status}
              >
                <MenuItem value="Có thể sử dụng">Có thể sử dụng</MenuItem>
                <MenuItem value="Hỏng">Hỏng</MenuItem>
                <MenuItem value="Đang sử dụng">Đang sử dụng</MenuItem>
              </Select>
              <Typography variant="caption" color="error">
                {errors.status?.message}
              </Typography>
            </FormControl>
            <TextField
              label="Ghi chú"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              error={!!errors.notes}
              helperText={errors.notes?.message}
              {...register('notes')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReset} variant="outlined">
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

export default EditEquipmentDialog;
