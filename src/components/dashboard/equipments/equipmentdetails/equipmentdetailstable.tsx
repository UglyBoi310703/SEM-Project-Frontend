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
import dayjs from 'dayjs';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import EditEquipmentModal from '../editequipment/editequipment';

export interface EquipmentDetail {
  id: string;
  name: string;
  seri: string;
  purchasedate: Date;
  room: string;
  status: 'used' | 'available' | 'fixing';
  note: string;
}

const statusMap = {
  fixing: { label: 'Đang bảo trì', color: 'secondary' },
  available: { label: 'Sẵn sàng', color: 'success' },
  used: { label: 'Đang được sử dụng', color: 'warning' },
} as const;

const equipmentdetails: EquipmentDetail[] = [
  {
    id: 'E-001',
    name: 'Máy chiếu',
    seri: 'DTLT-3107',
    purchasedate: dayjs().subtract(2, 'hours').toDate(),
    room: 'Kho',
    status: 'available',
    note: 'Thiết bị mới',
  },
  {
    id: 'E-002',
    name: 'Máy tính',
    seri: 'PC-2023',
    purchasedate: dayjs().subtract(5, 'days').toDate(),
    room: 'Phòng Lab',
    status: 'used',
    note: 'Đã qua sử dụng',
  },
  {
    id: 'E-003',
    name: 'Máy in',
    seri: 'PRT-123',
    purchasedate: dayjs().subtract(1, 'year').toDate(),
    room: 'Phòng in',
    status: 'fixing',
    note: 'Hỏng phần cứng',
  },
  // Thêm các thiết bị khác nếu cần
];

export function EquipmentsDetailsTable(): React.JSX.Element {
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
    if (deviceStatus === 'Sẵn có' && row.status === 'available') return true;
    if (deviceStatus === 'Đang sử dụng' && row.status === 'used') return true;
    if (deviceStatus === 'Đang bảo trì' && row.status === 'fixing') return true;
    return false;
  });

  const rowsToDisplay = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
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
        <OutlinedInput
          placeholder="Tìm kiếm"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '500px' }}
        />

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
                  <TableCell>{row.seri}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{dayjs(row.purchasedate).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{row.room}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell>{row.note}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <EditEquipmentModal />
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
