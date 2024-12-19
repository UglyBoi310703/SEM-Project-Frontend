"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import dayjs from "dayjs";
import ReportDetail from "./crashreport-detail";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

const statusMap = {
  pending: { label: "Chờ phê duyệt", color: "warning" },
  approved: { label: "Đã phê duyệt", color: "success" },
} as const;

export interface ReportInfo {
  id: string;
  user: { name: string };
  status: "pending" | "approved";
  idEquip: string;
  nameEquip: string;
  createdAt: Date;
}

const crashReports: ReportInfo[] = [
  {
    id: "ORD-009",
    user: { name: "Đỗ Văn Vương" },
    idEquip: "DTLT-E001",
    nameEquip: "Mic",
    status: "pending",
    createdAt: dayjs().subtract(10, "minutes").toDate(),
  },
  {
    id: "ORD-006",
    user: { name: "Chiến LV" },
    idEquip: "DTLT-E002",
    nameEquip: "Máy chiếu",
    status: "approved",
    createdAt: dayjs().subtract(10, "minutes").toDate(),
  },
  {
    id: "ORD-004",
    user: { name: "Lê Phúc Lâm" },
    idEquip: "DTLT-E003",
    nameEquip: "Loa",
    status: "approved",
    createdAt: dayjs().subtract(10, "minutes").toDate(),
  },
  {
    id: "ORD-001",
    user: { name: "Vũ Đình Trường" },
    idEquip: "DTLT-E004",
    nameEquip: "Máy chiếu",
    status: "approved",
    createdAt: dayjs().subtract(10, "minutes").toDate(),
  },
];

export function Reports(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("Tất cả");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Xử lý thay đổi bộ lọc trạng thái
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string);
    setPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  // Lọc dữ liệu dựa trên tìm kiếm và trạng thái
  const filteredReports = crashReports.filter((report) => {
    const matchesSearch =
      report.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.idEquip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.nameEquip.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "Tất cả" ||
      (statusFilter === "Chưa duyệt" && report.status === "pending") ||
      (statusFilter === "Đã duyệt" && report.status === "approved");

    return matchesSearch && matchesStatus;
  });

  // Dữ liệu phân trang
  const paginatedReports = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Xử lý thay đổi trang
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số hàng mỗi trang
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu tiên khi thay đổi số hàng
  };

  return (
    <Box>
      {/* Tìm kiếm và bộ lọc */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          mb:2
        }}
      >
        <OutlinedInput
          placeholder="Tìm kiếm báo cáo"
          value={searchTerm}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: "500px" }}
        />
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleFilterChange}
            name="reportstatus"
            label="Trạng thái"
          >
            <MenuItem value="Tất cả">Tất cả</MenuItem>
            <MenuItem value="Chưa duyệt">Chưa duyệt</MenuItem>
            <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bảng dữ liệu */}
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Mã báo cáo</TableCell>
            <TableCell>Người Báo cáo</TableCell>
            <TableCell>Mã thiết bị</TableCell>
            <TableCell>Tên thiết bị</TableCell>
            <TableCell>Thời gian</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReports.map((report) => {
            const { label, color } = statusMap[report.status] ?? {
              label: "Unknown",
              color: "default",
            };
            return (
              <TableRow hover key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.user.name}</TableCell>
                <TableCell>{report.idEquip}</TableCell>
                <TableCell>{report.nameEquip}</TableCell>
                <TableCell>
                  {dayjs(report.createdAt).format("MMM D, YYYY")}
                </TableCell>
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

      {/* Phân trang */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredReports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
