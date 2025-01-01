import * as React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import EditEquipmentModal from '../editequipment/editequipment';
import { APIgetAllEquipmentDetailByEquipmentID, APIgetEquipmentDetail } from '@/utils/api';
import { EquipmentDetail } from '../../classrooms/add-classroomequipment';



const statusMap = {
  'Có thể sử dụng': { label: 'Có thể sử dụng', color: 'success' },
  'Hỏng': { label: 'Hỏng', color: 'error' },
  'Đang sử dụng': { label: 'Đang sử dụng', color: 'warning' },
} as const;

export function EquipmentsDetailsTable({ equipmentCategory, updated, setUpdated }): React.JSX.Element {
  const [equipmentdetails, setEquipmentDetail] = React.useState<EquipmentDetail[]>([])
  React.useEffect(() => {
    const fetchEquipmentDetail = async (id: number) => {
      const data = await APIgetAllEquipmentDetailByEquipmentID(id)
      setEquipmentDetail(data.content)
      setTotalElements(data.page.totalElements)
      setRowsPerPage(data.page.size)
      setTotalPage(data.page.totalPages)
    };
    fetchEquipmentDetail(equipmentCategory.id)
  }, [equipmentCategory])

  React.useEffect(() => {
    if (updated) {
      const fetchEquipmentDetail = async (id: number) => {
        const data = await APIgetAllEquipmentDetailByEquipmentID(id)
        setEquipmentDetail(data.content)
        // setTotalPage(data.totalPage)
        setUpdated(false);
      };
      fetchEquipmentDetail(equipmentCategory.id)
    }
  }, [updated])

  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState<number>()
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deviceStatus, setDeviceStatus] = React.useState('');
  const handleFilterChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const status = event.target.value as string;
    const CategoryFilter = status === "All" ? "" : status;
    setDeviceStatus(CategoryFilter);

    const response = await APIgetEquipmentDetail(equipmentCategory.id, '', CategoryFilter);
    setEquipmentDetail(response.content);
    setTotalElements(response.page.totalElements);  
    setTotalPage(response.page.totalPages); 
  };


  const handlePageChange = async (event: unknown, newPage: number) => {
    try {
      const response = await APIgetEquipmentDetail(equipmentCategory.id, searchKeyword, deviceStatus, newPage, rowsPerPage);
      setEquipmentDetail(response.content);
      setPage(newPage); 
      setTotalElements(response.page.totalElements); 
      setTotalPage(response.page.totalPages);
    } catch (error) {
      console.error("Lỗi khi chuyển trang:", error);
    }
  };
  



  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() !== "") {
      try {
        const response = await APIgetEquipmentDetail(equipmentCategory.id, keyword)
        setEquipmentDetail(response.content);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    }
  };


  const handleRowsPerPageChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const itemPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(itemPerPage);
    const response = await APIgetEquipmentDetail(equipmentCategory.id, '', '', 0, itemPerPage);
    setEquipmentDetail(response.content);
    setPage(0);
    console.log(response);
    
    setTotalElements(response.page.totalElements);  
    setTotalPage(response.page.totalPages);  
  };


  const filteredRows = equipmentdetails.filter((row) => {
    if (deviceStatus === '') return true;
    if (deviceStatus === 'USABLE' && row.status === 'Có thể sử dụng') return true;
    if (deviceStatus === 'OCCUPIED' && row.status === 'Đang sử dụng') return true;
    if (deviceStatus === 'BROKEN' && row.status === 'Hỏng') return true;
    return false;
  });

  // const rowsToDisplay = filteredRows.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );
  React.useEffect(()=> {
    // console.log(equipmentdetails);
    
    // console.log(page);
    // console.log(rowsPerPage);
    
    
    // console.log(filteredRows);
    console.log(totalElements);
    
    
  }, [filteredRows, page, rowsPerPage, equipmentdetails])

  React.useEffect(() => {
    console.log('Filtered Rows:', filteredRows);
    console.log('Device Status:', deviceStatus);
    console.log('Equipment Details:', equipmentdetails);
  }, [filteredRows, deviceStatus, equipmentdetails]);
  

  return (
    <Box>
      {/* Search and Filter */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bộ lọc:
          </Typography>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={deviceStatus}
              onChange={handleFilterChange}
              name="equipmentstatus"
              label="Trạng thái"
            >
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="USABLE">Sẵn có</MenuItem>
              <MenuItem value="OCCUPIED">Đang sử dụng</MenuItem>
              <MenuItem value="BROKEN">Đang bảo trì</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Bảng danh sách thiết bị */}
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Số seri</TableCell>
              <TableCell>Tên thiết bị</TableCell>
              <TableCell>Ngày mua</TableCell>
              <TableCell>Phòng chứa</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ghi chú</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              const { label, color } = statusMap[row.status];
              return (
                <TableRow hover key={row.id}>
                  <TableCell>{row.serialNumber}</TableCell>
                  <TableCell>{row.equipmentName}</TableCell>
                  <TableCell>{row.purchaseDate}</TableCell>
                  <TableCell>{row.roomName}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <EditEquipmentModal equipmentCategory={equipmentCategory} equipmentDetail={row} setUpdated={setUpdated} />
                      <Button variant="outlined" color="error">
                        Xoá
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Divider />
      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
}
