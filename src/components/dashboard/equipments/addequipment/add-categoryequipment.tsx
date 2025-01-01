"use client";
import React, { useState, useEffect } from "react";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { APIAddNewEquipmentCategory, APIGetAllEquipment } from "@/utils/api";
import { Equipment } from "../equipment-categories-table";

function AddCategoryEquipmentModal({ onUpdateEquipmentCategory }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [existingCategories, setExistingCategories] = React.useState<Equipment[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await APIGetAllEquipment();
        setExistingCategories(response.content || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách loại thiết bị:", error);
        toast.error("Không thể tải danh sách loại thiết bị.");
      }
    };
    fetchCategories();
  }, []);


  const schema = yup.object({
    equipmentName: yup
      .string()
      .required("Tên danh mục thiết bị là bắt buộc.")
      .test("unique-name", "Tên danh mục thiết bị đã tồn tại.", (value) =>
        value ? !existingCategories.some((cat) => cat.equipmentName === value) : true
      ),
    category: yup.string().required("Loại thiết bị là bắt buộc."),
    code: yup
      .string()
      .required("Code là bắt buộc.")
      .test("unique-code", "Code đã tồn tại.", (value) =>
        value ? !existingCategories.some((cat) => cat.code === value) : true
      ),
  });
  const closeAndReset = () => {
    setOpen(false);
    reset()
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      equipmentName: "",
      category: "",
      code: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    // Kiểm tra lại trước khi gửi
    const nameExists = existingCategories.some((cat) => cat.name === data.equipmentName);
    const codeExists = existingCategories.some((cat) => cat.code === data.code);

    if (nameExists || codeExists) {
      if (nameExists) toast.error("Tên danh mục thiết bị đã tồn tại.");
      if (codeExists) toast.error("Code đã tồn tại.");
      return; // Dừng việc gửi
    }

    // Xác nhận trước khi gửi
    setOpen(false);
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Xác nhận thêm danh mục thiết bị!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await APIAddNewEquipmentCategory(data);
          if (data) {
            onUpdateEquipmentCategory(data);
          }
          toast.success("Thêm danh mục thiết bị thành công!");
          reset();
        } catch (error) {
          console.error("Lỗi khi thêm danh mục thiết bị:", error);
          toast.error("Có lỗi xảy ra khi thêm danh mục thiết bị. Vui lòng thử lại!");
        }
      }
    });
  };
  const handleReset = () => {
    reset({
      equipmentName: "",
      category: "",
      code: "",
    });
    toast.info("Dữ liệu đã được đặt lại.");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button
        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Thêm danh mục thiết bị
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Thêm danh mục thiết bị</Typography>
              <IconButton onClick={closeAndReset}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Form */}
            <Stack spacing={3}>
              <TextField
                label="Tên thiết bị"
                {...register("equipmentName")}
                error={!!errors.equipmentName}
                helperText={errors.equipmentName?.message}
                fullWidth
              />
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Loại thiết bị</InputLabel>
                <Select
                  value={watch("category")} // Đồng bộ giá trị
                  onChange={(e) => setValue("category", e.target.value)} // Cập nhật giá trị
                >
                  <MenuItem value="TEACHING_EQUIPMENT">Phòng học</MenuItem>
                  <MenuItem value="ELECTRIC_EQUIPMENT">Điện</MenuItem>
                  <MenuItem value="SPORTS_EQUIPMENT">Thể dục</MenuItem>
                  <MenuItem value="LABORATORY_EQUIPMENT">Thí nghiệm</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {errors.category?.message}
                </Typography>
              </FormControl>
              <TextField
                label="Code"
                {...register("code")}
                error={!!errors.code}
                helperText={errors.code?.message}
                fullWidth
              />
            </Stack>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 4,
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
    </Box>
  );
}

export default AddCategoryEquipmentModal;
