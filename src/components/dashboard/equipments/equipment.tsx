'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';


import { useSelection } from '@/hooks/use-selection';
import { display } from '@mui/system';

function noop(): void {
  // do nothing
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  totalQuantity: number;
  usableQuantity:number;
  usingQuantity:number;
  brokenQuantity:number;

}

interface EquipmentTableProps {
  count?: number;
  page?: number;
  rows?: Equipment[];
  rowsPerPage?: number;
}

export function EquipmentsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: EquipmentTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((borrow) => borrow.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
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
        
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
      
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                 
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                
                  <TableCell>{row.totalQuantity}</TableCell>
                  <TableCell>{row.usableQuantity}</TableCell>
                  <TableCell>{row.usingQuantity}</TableCell>
                  <TableCell>{row.brokenQuantity}</TableCell>
                  <TableCell>
                    <Box>
                    <Button variant="contained">Chi tiết</Button>
                    <Button variant="outlined">Sửa</Button>
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
