'use client';

import * as React from 'react';
import { Button } from '@mui/material';
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

import dayjs from 'dayjs';
import Card from "@mui/material/Card";

import { useSelection } from '@/hooks/use-selection';
import EditEquipmentModal from '../editequipment/editequipment';
import Chip from '@mui/material/Chip';

function noop(): void {
  // do nothing
}

export interface EquipmentDetail {
  id: string;
  name: string;
  seri: string;
  local: string;
  manufactureyear:number;
  purchasedate: Date;
  status:'used' | 'available' | 'fixing';
  note:string;
}
interface EquipmentDetailTableProps {
  count?: number;
  page?: number;
  rows?: EquipmentDetail[];
  rowsPerPage?: number;
}
const statusMap = {
  fixing: { label: 'Đang bảo trì', color: 'secondary' },
  available: { label: 'Sẵn sàng', color: 'success' },
  used: { label: 'Đang được sử dụng', color: 'warning' },
} as const;

export function EquipmentsDetailsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: EquipmentDetailTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((borrow) => borrow.id);
  }, [rows]);
  const {  selected } = useSelection(rowIds);
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Số seri</TableCell>
              <TableCell>Tên thiết bị</TableCell>
              <TableCell>Hãng</TableCell>
              <TableCell>Năm sản suất</TableCell>
              <TableCell>Ngày mua</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ghi chú</TableCell>
        
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const { label, color } = statusMap[row.status] ?? { label: 'Unknown', color: 'default' };
              const isSelected = selected?.has(row.id);
              return (
                <TableRow hover key={row.seri} selected={isSelected}>
                  <TableCell>{row.seri}</TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                 
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.local}</TableCell>
                
                  <TableCell>{row.manufactureyear}</TableCell>
                  <TableCell>{dayjs(row.purchasedate).format('MMM D, YYYY')}</TableCell>
                  <TableCell><Chip color={color} label={label} size="small" /></TableCell>
                  <TableCell>{row.note}</TableCell>
                  <TableCell>
                    <Box   sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}>
                    <EditEquipmentModal/>
                    <Button variant="outlined" color='error'>Xoá</Button>
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
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
