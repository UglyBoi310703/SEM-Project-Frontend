import axios from "axios";
import { Classroom } from "@/components/dashboard/classrooms/classrooms-card";

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
    const response = await axios.post("http://localhost:8080/api/v1/room", classroom, {
      headers: {
        "Content-Type": "application/json", // Header để server nhận JSON
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
 

// //Hàm gọi API sửa phòng học



