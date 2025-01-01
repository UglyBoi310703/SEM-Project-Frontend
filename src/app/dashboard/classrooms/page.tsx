"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddClassroomModal from "@/components/dashboard/classrooms/add-classroom";
import ClassRoomList from "@/components/dashboard/classrooms/classroom-list";
import { APIGetRoom, RoomApiResponse } from "@/utils/api";
import { Classroom } from "@/components/dashboard/classrooms/classrooms-card";

export default function Page(): React.JSX.Element {
  const [rooms, setRooms] = React.useState<Classroom[]>([]);
  const [data, setData] = React.useState<RoomApiResponse>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);  

  // Hàm gọi API
  const fetchRooms = async (newPage: number) => {
    setIsLoading(true);
    try {
      const data = await APIGetRoom("", "", "", newPage, 6);
      setRooms(data.content);
      console.log(data.content)
      setData(data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleUpdateRoom = async (newRoom) => {
    if(newRoom){
      try {
        const data = await APIGetRoom("", "", "", page, 6);
        setRooms(data.content);
      } catch (err) {
        console.error("Error fetching rooms", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Gọi API khi page thay đổi
  React.useEffect(() => {
    fetchRooms(page);
  }, [page]);

  // Hàm xử lý khi chuyển trang từ component con
  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Cập nhật trang
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Danh sách phòng học tại trường</Typography>
        </Stack>
        <div>
          <AddClassroomModal onUpdateRoom={() => fetchRooms(page)} />
        </div>
      </Stack>
      <ClassRoomList
        rooms={rooms}
        data={data}
        isLoading={isLoading}
        onPageChange={handlePageChange}  
        onUpdateRoom={handleUpdateRoom} 
      />
    </Stack>
  );
}
