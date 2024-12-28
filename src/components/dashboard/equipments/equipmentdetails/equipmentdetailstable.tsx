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
import { APIgetAllEquipmentDetailByEquipmentID } from '@/utils/api';
import { EquipmentDetail } from '../../classrooms/add-classroomequipment';

 

const statusMap = {
  'Có thể sử dụng': { label: 'Có thể sử dụng', color: 'success' },
  'Hỏng': { label: 'Hỏng', color: 'error' },
  'Đang sử dụng': { label: 'Đang sử dụng', color: 'warning' },
} as const;

export function EquipmentsDetailsTable({equipmentCategory, updated}): React.JSX.Element {
  const [equipmentdetails, setEquipmentDetail] = React.useState<EquipmentDetail[]>([])
  React.useEffect(()=> {
     const fetchEquipmentDetail = async (id:number) => {
          const data = await APIgetAllEquipmentDetailByEquipmentID(id)
          console.log(data.content);
          
          setEquipmentDetail(data.content)
       };
       fetchEquipmentDetail(equipmentCategory.id)
  }, [equipmentCategory])

  React.useEffect(()=> {
    if(updated){
      const fetchEquipmentDetail = async (id:number) => {
        const data = await APIgetAllEquipmentDetailByEquipmentID(id)
        setEquipmentDetail(data.content)
     };
     fetchEquipmentDetail(equipmentCategory.id)
    }
  }, [updated])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deviceStatus, setDeviceStatus] = React.useState('Tất cả');
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeviceStatus(event.target.value as string);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = equipmentdetails.filter((row) => {
    if (deviceStatus === 'Tất cả') return true;
    if (deviceStatus === 'Sẵn có' && row.status === 'Có thể sử dụng') return true;
    if (deviceStatus === 'Đang sử dụng' && row.status === 'Đang sử dụng') return true;
    if (deviceStatus === 'Đang bảo trì' && row.status === 'Hỏng') return true;
    return false;
  });

  const rowsToDisplay = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="Sẵn có">Sẵn có</MenuItem>
              <MenuItem value="Đang sử dụng">Đang sử dụng</MenuItem>
              <MenuItem value="Đang bảo trì">Đang bảo trì</MenuItem>
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
            {rowsToDisplay.map((row) => {
              const { label, color } = statusMap[row.status];
              return (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
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
                      <EditEquipmentModal equipmentCategory = {equipmentCategory} equipmentDetail = {row}/>
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
        count={filteredRows.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
}
