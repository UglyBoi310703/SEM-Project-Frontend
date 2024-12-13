"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import ReportDetail from './reportdetail';

const statusMap = {
  pending: { label: 'Chờ phê duyệt', color: 'warning' },
  approved: { label: 'Đã phê duyệt', color: 'success' },
} as const;

export interface ReportInfo {
  id: string;
  user: { name: string };
  status: 'pending' | 'approved';
  idEquip: string;
  nameEquip: string;
  createdAt: Date;
}

export interface ReportInfoProps {
  reports?: ReportInfo[];

}

export function Reports({ reports = [] }: ReportInfoProps): React.JSX.Element {
  // State quản lý phân trang
  const [page, setPage] = React.useState(0); // Trang hiện tại (bắt đầu từ 0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Số hàng trên mỗi trang

  // Tính toán vị trí bắt đầu và kết thúc của dữ liệu hiển thị
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedReports = reports.slice(startIndex, endIndex);

  // Xử lý khi thay đổi trang
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Xử lý khi thay đổi số hàng trên mỗi trang
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Quay về trang đầu khi thay đổi số hàng
  };

  return (
    <Box >
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Mã báo cáo</TableCell>
            <TableCell>Người Báo cáo</TableCell>
            <TableCell>Mã thiết bị</TableCell>
            <TableCell>Tên thiết bị</TableCell>
            <TableCell sortDirection="desc">Thời gian</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReports.map((report) => {
            const { label, color } = statusMap[report.status] ?? { label: 'Unknown', color: 'default' };

            return (
              <TableRow hover key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.user.name}</TableCell>
                <TableCell>{report.idEquip}</TableCell>
                <TableCell>{report.nameEquip}</TableCell>
                <TableCell>{dayjs(report.createdAt).format('MMM D, YYYY')}</TableCell>
                <TableCell>
                  <Chip color={color} label={label} size="small" />
                </TableCell>
                <TableCell>
                  <ReportDetail />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Thành phần phân trang */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Các tùy chọn số hàng mỗi trang
        component="div"
        count={reports.length} // Tổng số hàng
        rowsPerPage={rowsPerPage} // Số hàng mỗi trang
        page={page} // Trang hiện tại
        onPageChange={handleChangePage} // Xử lý thay đổi trang
        onRowsPerPageChange={handleChangeRowsPerPage} // Xử lý thay đổi số hàng mỗi trang
      />
    </Box>
  );
}
