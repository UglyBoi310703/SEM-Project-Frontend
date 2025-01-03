"use client"
import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react";
import EquipmentDetails from "./equipmentdetails/equipmentdetails-page";
import EditEquipmentCategoryModal from "./editequipment/editcategoryequipment";
import AddCategoryEquipmentModal from "./addequipment/add-categoryequipment";
import { APIGetAllEquipment } from "@/utils/api";

export interface Equipment {
  id: number;
  equipmentName: string;
  code: string;
  category: string;
  totalQuantity: number;
  usableQuantity: number;
  inUseQuantity: number;
  brokenQuantity: number;
}

export function EquipmentsTable(): React.JSX.Element {
  const [equipmentCategories, setEquipmentCategories] = useState<Equipment[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [equipmentType, setEquipmentType] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch data
  useEffect(() => {
    const fetchEquipments = async () => {
      setIsLoading(true);
      try {
        const response = await APIGetAllEquipment({
          category: equipmentType === "All" ? "" : equipmentType,
          keyword: searchKeyword,
          page,
          size: rowsPerPage,
        });
        setEquipmentCategories(response.content || []);
        setTotalElements(response.page.totalElements || 0);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipments();
  }, [searchKeyword, equipmentType, page, rowsPerPage]);

  // Search handling
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setPage(0);
  };

  // Filter handling
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEquipmentType(event.target.value as string);
    setPage(0);
  };

  // Pagination handling
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {/* Search and Filters */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search */}
          <OutlinedInput
            placeholder="Tìm kiếm"
            value={searchKeyword}
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ maxWidth: "500px" }}
          />
          {/* Filter */}
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Loại thiết bị</InputLabel>
            <Select value={equipmentType} onChange={handleFilterChange} label="Loại thiết bị">
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="TEACHING_EQUIPMENT">Thiết bị giảng dạy</MenuItem>
              <MenuItem value="ELECTRIC_EQUIPMENT">Thiết bị điện</MenuItem>
              <MenuItem value="SPORTS_EQUIPMENT">Thiết bị thể thao</MenuItem>
              <MenuItem value="LABORATORY_EQUIPMENT">Thiết bị phòng thí nghiệm</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <AddCategoryEquipmentModal />
      </Box>

      {/* Equipment Table */}
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "900px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Mã thiết bị</TableCell>
              <TableCell>Tên thiết bị</TableCell>
              <TableCell>Loại thiết bị</TableCell>
              <TableCell>Tổng số lượng</TableCell>
              <TableCell>Có thể sử dụng</TableCell>
              <TableCell>Đang được sử dụng</TableCell>
              <TableCell>Bị hỏng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipmentCategories.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="subtitle2">{row.equipmentName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.totalQuantity}</TableCell>
                <TableCell>{row.usableQuantity}</TableCell>
                <TableCell>{row.inUseQuantity}</TableCell>
                <TableCell>{row.brokenQuantity}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EquipmentDetails equipmentCategory={row} />
                    <EditEquipmentCategoryModal equipmentCategory={row} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Pagination */}
      <Divider />
      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 5, 10]}
      />
    </Box>
  );
}
