"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddClassroomModal from "@/components/dashboard/classrooms/add-classroom";
import ClassRoomList from "@/components/dashboard/classrooms/classroom-list";
import { APIGetAllRoom } from "@/utils/api";
import { Classroom } from "@/components/dashboard/classrooms/classrooms-card";

export default function Page(): React.JSX.Element {
  const [rooms, setRooms] = React.useState<Classroom[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch rooms initially
  React.useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await APIGetAllRoom();
        setRooms(data.content);
      } catch (err) {
        console.error("Error fetching rooms", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Callback to add a new room
  const handleAddRoom = async (newRoom) => {
    if(newRoom){
      try {
        const data = await APIGetAllRoom();
        setRooms(data.content);
        console.log(data.content);
      } catch (err) {
        console.error("Error fetching rooms", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4">Danh sách phòng học tại trường</Typography>
        </Stack>
        <div><AddClassroomModal onAddRoom={handleAddRoom}/></div>
      </Stack>
      <ClassRoomList rooms={rooms} isLoading={isLoading} />
    </Stack>
  );
}
