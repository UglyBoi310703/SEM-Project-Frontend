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
import ReportDetail from "./reportdetail";
import CreateCrashReport from "./create-crashreport";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react";

const statusMap = {
  pending: { label: "Chờ phê duyệt", color: "warning" },
  approved: { label: "Đã phê duyệt", color: "success" },
  refunded: { label: "Refunded", color: "error" },
} as const;

export interface CrashReports {
  id: string;
  customer: { name: string };
  status: "pending" | "approved";
  idEquip: string;
  nameEquip: string;
  createdAt: Date;
}

const crashreports: CrashReports[] = [
  {
    id: "ORD-009",
    customer: { name: "Đỗ Văn Vương" },
    idEquip: "DTLT-E001",
    nameEquip: "Mic",
    status: "pending",
    createdAt: dayjs().subtract(10, "minutes").toDate(),
  },
  {
    id: "ORD-006",
    customer: { name: "Chiến LV" },
    idEquip: "DTLT-E002",
    nameEquip: "Máy chiếu",
    status: "approved",
    createdAt: dayjs().subtract(1, "day").toDate(),
  },
  {
    id: "ORD-004",
    customer: { name: "Lê Phúc Lâm" },
    idEquip: "DTLT-E003",
    nameEquip: "Loa",
    status: "approved",
    createdAt: dayjs().subtract(2, "days").toDate(),
  },
  {
    id: "ORD-001",
    customer: { name: "Vũ Đình Trường" },
    idEquip: "DTLT-E004",
    nameEquip: "Máy chiếu",
    status: "approved",
    createdAt: dayjs().subtract(3, "days").toDate(),
  },
];

export function Reports(): React.JSX.Element {
  const [filterStatus, setFilterStatus] = React.useState<string>("Tất cả");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Xử lý lọc trạng thái
  const filteredReports = crashreports.filter((report) => {
    if (filterStatus === "Tất cả") return true;
    return (
      (filterStatus === "Chưa duyệt" && report.status === "pending") ||
      (filterStatus === "Đã duyệt" && report.status === "approved")
    );
  });

  // Xử lý phân trang
  const paginatedReports = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box 
    >
      {/*Search , Filter và Create Report */}
      <Box
      sx={{
        display: "flex",
        justifyContent:"space-between",
        gap: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
        mb:2
      }}
      >
        {/* Search and Filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
        }}
      >
        {/* Search */}
        <OutlinedInput
          placeholder="Tìm kiếm báo cáo"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: "500px" }}
        />
        {/* Filter */}
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => {setFilterStatus(e.target.value)}}
            label="Trạng thái"
          >
            <MenuItem value="Tất cả">Tất cả</MenuItem>
            <MenuItem value="Chưa duyệt">Chưa duyệt</MenuItem>
            <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Create Report */}
      <CreateCrashReport/> 
      </Box>
        
      {/* Bảng hiển thị dữ liệu */}
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Mã báo cáo</TableCell>
            <TableCell>Người báo cáo</TableCell>
            <TableCell>Mã thiết bị</TableCell>
            <TableCell>Tên thiết bị</TableCell>
            <TableCell>Thời gian</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReports.map((report) => {
            const { label, color } =
              statusMap[report.status] ?? { label: "Không xác định", color: "default" };

            return (
              <TableRow hover key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.customer.name}</TableCell>
                <TableCell>{report.idEquip}</TableCell>
                <TableCell>{report.nameEquip}</TableCell>
                <TableCell>
                  {dayjs(report.createdAt).format("DD-MM-YYYY")}
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
