import axios from "axios";
import type { Classroom } from "@/components/dashboard/classrooms/classrooms-card";

const BASE_URL = 'http://localhost:8080';

// //APIGetAllRooms
export type RoomApiResponse = {
  content: Classroom[];  
  totalElements: number;  
  totalPages: number;  
  size: number;  
};


export async function APIGetAllRoom(): Promise<RoomApiResponse> {
  const response = await axios.get<RoomApiResponse>(`${BASE_URL}/api/v1/room/filter`);
  return response.data;
}

// //APIAddRoom
export interface NewRoom {
  roomName: string;
  type: string;
  capacity:number;
}
export const addClassRoom = async (classroom: NewRoom): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/room`, classroom, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Phòng học đã được tạo thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi tạo phòng học:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};

 
export async function APIGetRoomByName(roomName: string) {
 
  const response = await fetch(`${BASE_URL}/api/v1/room/search?keyword=${roomName}`);
  if (!response.ok) {
    throw new Error("Failed to fetch room data");
  }
  return response.json();
}


//Hàm gọi API sửa phòng học
export const APIModifyClassRoom = async (classroom_id: number, newClassroom: NewRoom): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/room/${classroom_id}`, newClassroom, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Phòng học đã được tạo thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi tạo phòng học:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};



