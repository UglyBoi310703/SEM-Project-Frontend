"use client"
import * as React from 'react';

import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import EquipmentDetails from './equipmentdetails/equipmentdetails-page';
import EditEquipmentCategoryModal from './editequipment/editcategoryequipment';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import AddCategoryEquipmentModal from './addequipment/add-categoryequipment';
import { APIGetAllEquipment, NewEquipmentCategoryRequest } from '@/utils/api';


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
  const [equipmentCategories, setEquipmentCategories] = React.useState<Equipment[]>([]);
  const [totalPage, setTotalPage] = React.useState<number>()
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const handleUpdateEquipmentCategory = async (newEquipment: NewEquipmentCategoryRequest) => {
    if (newEquipment) {
      try {
        const data = await APIGetAllEquipment();
        setEquipmentCategories(data.content);

      } catch (err) {
        console.error("Error fetching rooms", err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  // State for pagination
  const [page, setPage] = React.useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = React.useState(2); // Rows per page
  React.useEffect(() => {
    const fetchRooms = async (pageSize:number = 0, ItemPerPage:number = 6) => {
      try {
        const data = await APIGetAllEquipment('', '', pageSize, ItemPerPage);
        // console.log(data.page.totalPages);
        setTotalPage(data.page.totalPages)
        setTotalElements(data.page.totalElements)
        // setTotalPage()
        setEquipmentCategories(data.content)
      } catch (err) {
        console.error("Error fetching rooms", err);
      } finally {
        setIsLoading(false)
      }
    };
    fetchRooms(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() !== "") {
      try {
        const response = await APIGetAllEquipment('', keyword)
        setEquipmentCategories(response.content);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    }
  };
  const [EquipmentType, setEquipmentType] = React.useState("Tất cả");
  const handleApplyFilter = async () => {
    try {

      const CategoryFilter = EquipmentType === "All" ? "" : EquipmentType;



      const response = await APIGetAllEquipment(CategoryFilter);


      setEquipmentCategories(response.content || []);
    } catch (error) {
      console.error("Lỗi khi áp dụng bộ lọc:", error);
    }
  };


  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEquipmentType(event.target.value as string);
  };
  
  // Handle change page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  // Handle change rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  
  };

  // // Calculate the rows for the current page
  // const paginatedRows = equipmentCategories.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  return (
    <Box>
      {/* Search, Filter and Add category equipment modal */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2
        }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,

        }}>
          {/* Search */}
          <OutlinedInput
            placeholder="Tìm kiếm"
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ maxWidth: '500px' }}
          />
          {/* Filter */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Bộ lọc:
            </Typography>

            {/* Trường Loại thiết bị */}
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel>Loại thiết bị</InputLabel>
              <Select
                value={EquipmentType}
                onChange={handleFilterChange}
                name="EquipmentType"
                label="Loại thiết bị"
              >
                <MenuItem value="All">Tất cả</MenuItem>
                <MenuItem value="TEACHING_EQUIPMENT">Thiết bị giảng dạy</MenuItem>
                <MenuItem value="ELECTRIC_EQUIPMENT">Thiết bị điện</MenuItem>
                <MenuItem value="SPORTS_EQUIPMENT">Thiết bị thể thao</MenuItem>
                <MenuItem value="LABORATORY_EQUIPMENT">Thiết bị phòng thí nghiệm</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              sx={{ whiteSpace: "nowrap" }}
            >
              Áp dụng
            </Button>
          </Box>
        </Box>
        <AddCategoryEquipmentModal onUpdateEquipmentCategory={handleUpdateEquipmentCategory} />
      </Box>

      {/* Bảng danh sách các danh mục thiết bị */}
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
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
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Typography variant="subtitle2">{row.equipmentName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.totalQuantity}</TableCell>
                <TableCell>{row.usableQuantity}</TableCell>
                <TableCell>{row.inUseQuantity}</TableCell>
                <TableCell>{row.brokenQuantity}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <EquipmentDetails equipmentCategory={row} />
                    <EditEquipmentCategoryModal equipmentCategory={row} onUpdateEquipmentCategory={handleUpdateEquipmentCategory} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
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
