import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Pagination,
  Grid,
} from "@mui/material";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { ClassroomCard } from "@/components/dashboard/classrooms/classrooms-card";
import { APIGetRoom } from "@/utils/api";

export default function ClassRoomList({data, rooms, isLoading, onUpdateRoom ,  onPageChange}) {
  const [filterRooms, setFilteredRooms] = React.useState(rooms)
  const [RoomStatus, setRoomStatus] = React.useState("");
  const [RoomType, setRoomType] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(0);  
  const [searchKeyword, setSearchKeyword] = React.useState("");
  React.useEffect(()=> {
    setFilteredRooms(rooms)
  }, [rooms])
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() !== "") {
      try {
        const response = await APIGetRoom('', '', keyword)
        setFilteredRooms(response.content);  
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    } else {
      setFilteredRooms(rooms);  
    }
  };

  // Xử lý thay đổi trạng thái
  const handleRoomStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRoomStatus(event.target.value as string);
  };

  // Xử lý thay đổi loại phòng
  const handleRoomTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRoomType(event.target.value as string);
  };

  const handleApplyFilter = async () => {
    try {
      
      const roomTypeFilter = RoomType === "All" ? "" : RoomType;
      const roomStatusFilter = RoomStatus === "All" ? "" : RoomStatus;
  
   
      const response = await APIGetRoom(roomTypeFilter, roomStatusFilter);
      
   
      setFilteredRooms(response.content || []);
    } catch (error) {
      console.error("Lỗi khi áp dụng bộ lọc:", error);
    }
  };
  

 
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const newPage = page - 1;  
    setCurrentPage(newPage);

    if (typeof onPageChange === "function") {
      onPageChange(newPage); 
    }
  };

  if (isLoading) {
    return <Typography>Đang tải danh sách phòng học...</Typography>;
  }
  return (
    <Stack spacing={3}>
      {/* Search and Filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* Search */}
        <OutlinedInput
          placeholder="Tìm kiếm"
          value={searchKeyword}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: "500px" }}
        />
        {/* Tiêu đề */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bộ lọc:
          </Typography>
          {/* Filter */}
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Trạng thái</InputLabel>
            <Select value={RoomStatus} onChange={handleRoomStatusFilterChange}>
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="AVAILABLE">Sẵn có</MenuItem>
              <MenuItem value="OCCUPIED">Đang sử dụng</MenuItem>
              <MenuItem value="BROKEN">Đang bảo trì</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Loại phòng</InputLabel>
            <Select value={RoomType} onChange={handleRoomTypeFilterChange}>
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="CLASSROOM">Phòng học</MenuItem>
              <MenuItem value="EQUIPMENT_ROOM">Phòng thiết bị</MenuItem>
              <MenuItem value="MEETING_ROOM">Phòng hội thảo</MenuItem>
              <MenuItem value="LABORATORY">Phòng thí nghiệm</MenuItem>
              <MenuItem value="OFFICE">Văn phòng</MenuItem>
            </Select>
          </FormControl>
          {/* Nút Áp dụng */}
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
      <Grid container spacing={3}>
        {filterRooms.map((classroom) => (
          <Grid key={classroom.roomName} lg={4} md={6} xs={12}>
            <ClassroomCard classroom={classroom} onUpdateRoom={onUpdateRoom} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination
          count={data?.page?.totalPages || 0}  
          page={currentPage + 1}  
          onChange={handlePageChange}  
          size="small"
          disabled={data?.page?.totalPages === 0}
        />
      </Box>
    </Stack>
  );
}
