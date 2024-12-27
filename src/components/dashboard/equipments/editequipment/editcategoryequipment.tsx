import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Equipment } from '../equipment-categories-table';
import { APIGetAllEquipment, APIUpdateEquipmentCategory } from '@/utils/api';

function EditEquipmentCategoryModal({
  equipmentCategory,
  onUpdateEquipmentCategory,
}) {
  const ClassMapping: Record<
    "Thiết bị giảng dạy" | "Thiết bị điện" | "Thiết bị thể thao" | "Thiết bị phòng thí nghiệm",
    string
  > = {
    "Thiết bị giảng dạy": "TEACHING_EQUIPMENT",
    "Thiết bị điện": "ELECTRIC_EQUIPMENT",
    "Thiết bị thể thao": "SPORTS_EQUIPMENT",

    "Thiết bị phòng thí nghiệm": "LABORATORY_EQUIPMENT",
  };
  const equipmentCategoryId = equipmentCategory.id
  const [open, setOpen] = useState(false);
  const [existingCategories, setExistingCategories] = React.useState<Equipment[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState(ClassMapping[equipmentCategory.category as keyof typeof ClassMapping]);

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await APIGetAllEquipment();
        const filteredRooms = response.content.filter((equipmentCategoryData) => equipmentCategoryData.id !== equipmentCategory.id);
        setExistingCategories(filteredRooms);
      } catch (error) {
        console.error("Lỗi khi tải danh sách loại thiết bị:", error);
        toast.error("Không thể tải danh sách loại thiết bị.");
      }
    };
    fetchCategories();



  }, []);


  const handleCateogyChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };
  // Schema xác thực
  const schema = yup.object({
    equipmentName: yup
      .string()
      .required('Tên loại thiết bị là bắt buộc.')
      .test('unique-name', 'Tên thiết bị đã tồn tại.', (value) =>
        value
          ? !existingCategories.some(
            (category) =>
              category.equipmentName === value
          )
          : true
      ),
    category: yup.string().required('Loại thiết bị là bắt buộc.'),
    code: yup.string().required('Code loại thiết bị là bắt buộc.').test('unique-code', 'Code loại thiết bị đã tồn tại.', (value) =>
      value
        ? !existingCategories.some(
          (category) =>
            category.code === value
        )
        : true
    )
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      equipmentName: equipmentCategory.name || '',
      category: ClassMapping[equipmentCategory.category as keyof typeof ClassMapping] || '',
      code: equipmentCategory.code || '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        equipmentName: equipmentCategory.equipmentName || '',
        category: ClassMapping[equipmentCategory.category as keyof typeof ClassMapping] || '',
        code: equipmentCategory.code || '',
      });
    }
  }, [equipmentCategory, open, reset]);
  


  const onSubmit = async (data) => {
    console.log(data);
    console.log(selectedCategory);
    setOpen(false)
    const nameExists = existingCategories.some(
      (cat) => cat.equipmentName === data.equipmentName && cat.id !== equipmentCategoryId
    );

    if (nameExists) {
      toast.error('Tên thiết bị đã tồn tại.');
      return;
    }

    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Dữ liệu sẽ được cập nhật!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await APIUpdateEquipmentCategory(equipmentCategoryId, data)
          toast.success('Cập nhật danh mục thiết bị thành công!');
          onUpdateEquipmentCategory(data)
        } catch (error) {
          console.error('Lỗi khi cập nhật danh mục:', error);
          toast.error('Có lỗi xảy ra khi cập nhật danh mục.');
        }
      }
    });
  };

  const handleReset = () => {
    reset();
    toast.info('Dữ liệu đã được đặt lại.');
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Sửa
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6">Sửa danh mục thiết bị</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Tên thiết bị"
                  {...register('equipmentName')}
                  error={!!errors.equipmentName}
                  helperText={errors.equipmentName?.message}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel id="room-type-label">Loại thiết bị</InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        labelId="room-type-label"
                        label="Loại thiết bị"
                      >
                        <MenuItem value="TEACHING_EQUIPMENT">Thiết bị giảng dạy</MenuItem>
                        <MenuItem value="ELECTRIC_EQUIPMENT">Thiết bị điện</MenuItem>
                        <MenuItem value="SPORTS_EQUIPMENT">Thiết bị thể thao</MenuItem>
                        <MenuItem value="LABORATORY_EQUIPMENT">Thiết bị phòng thí nghiệm</MenuItem>
                      </Select>
                    )}
                  />
                  <Typography variant="body2" color="error">
                    {errors.category?.message}
                  </Typography>
                </FormControl>

              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="code"
                  {...register('code')}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
              }}
            >
              <Button onClick={handleReset} variant="outlined" sx={{ mr: 2 }}>
                Đặt lại
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Lưu
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default EditEquipmentCategoryModal;
