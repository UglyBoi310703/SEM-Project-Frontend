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
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import AddCategoryEquipmentModal from './addequipment/add-categoryequipment';
import { APIGetAllEquipment, NewEquipmentCategoryRequest } from '@/utils/api';
 

export interface Equipment {
  id: string;
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
  const [isLoading, setIsLoading] = React.useState(true);
   const handleUpdateEquipmentCategory = async (newEquipment:NewEquipmentCategoryRequest) => {
      if(newEquipment){
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
  
  
   React.useEffect(() => {
       const fetchRooms = async () => {
         try {
           const data = await APIGetAllEquipment();
           setEquipmentCategories(data.content)
         } catch (err) {
           console.error("Error fetching rooms", err);
         } finally {
          setIsLoading(false)
         }
       };
       fetchRooms();
     }, []);

   const [EquipmentType, setEquipmentType] = React.useState("Tất cả");
   const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setEquipmentType(event.target.value as string);
    };
  // State for pagination
  const [page, setPage] = React.useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = React.useState(2); // Rows per page

  // Handle change page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  // Handle change rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate the rows for the current page
  const paginatedRows = equipmentCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* Search, Filter and Add category equipment modal */}
      <Box
      sx={{
        display: "flex",
        justifyContent:"space-between",
        mb:2
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
          label = "Loại thiết bị"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Phòng học">Phòng học</MenuItem>
          <MenuItem value="Hỗ trợ">Hỗ trợ</MenuItem>
          <MenuItem value="Thể dục">Thể dục</MenuItem>
        </Select>
      </FormControl>
      </Box>
       </Box>
      <AddCategoryEquipmentModal onUpdateEquipmentCategory={handleUpdateEquipmentCategory}/>
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
            {paginatedRows.map((row) => (
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
                    <EquipmentDetails equipmentCategory = {row} />
                    <EditEquipmentCategoryModal equipmentCategory = {row} onUpdateEquipmentCategory={handleUpdateEquipmentCategory}/>
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
        count={equipmentCategories.length} // Total rows
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 5, 10]} 
      />
    </Box>
  );
}
