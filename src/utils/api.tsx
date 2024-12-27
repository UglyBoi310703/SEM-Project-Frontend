import axios from "axios";
import type { Classroom } from "@/components/dashboard/classrooms/classrooms-card";
import { Equipment } from "@/components/dashboard/equipments/equipment-categories-table";
import { EquipmentDetail } from "@/components/dashboard/equipments/equipmentdetails/equipmentdetailstable";
import { number } from "zod";

const BASE_URL = 'http://localhost:8080';

// //APIGetRoomsByKeyword, type, status
export type RoomApiResponse = {
  content: Classroom[];  
  page:  {
    size: number,
    number: number,
    totalElements: number,
    totalPages: number
  };  
};


export async function APIGetRoom(  type: string = '', 
  status: string = '', 
  keyword: string = '', 
  page: number = 0, 
  
  size: number = 6): Promise<RoomApiResponse> {
  console.log(`${BASE_URL}/api/v1/room/search?type=${type}&status=${status}&keyword=${keyword}&page=${page}&size=${size}`);
  const response = await axios.get<RoomApiResponse>(`${BASE_URL}/api/v1/room/search?type=${type}&status=${status}&keyword=${keyword}&page=${page}&size=${size}`);
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


//API Update Room
export const APIModifyClassRoom = async (classroom_id: number, newClassroom: NewRoom): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/room/${classroom_id}`, newClassroom, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Phòng học đã được cập nhật thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật phòng học:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};

//APIUpdateEquipmentDetailLocation
export interface ClassRoomEquipmentId {
  equipmentDetailIds: number[]
}
export const APIUpdateEquipmentDetailLocation = async (classroom_id: number, ClassRoomEquipmentId: ClassRoomEquipmentId): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/equipment-detail/location/room/${classroom_id}`, ClassRoomEquipmentId, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Thiết bị gắn với phòng học đã được cập nhật thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật thiết bị gắn với phòng học:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};



//APIGetAllEquipmentCategories
export type EquipmentResponse = {
  content: Equipment[];  
  totalElements: number;  
  totalPages: number;  
  size: number;  
};

export async function APIGetAllEquipment(
  keyword: string = '', 
  page: number = 0, 
  size: number = 15
): Promise<EquipmentResponse> {
  const response = await axios.get<EquipmentResponse>(
    `${BASE_URL}/api/v1/equipment/search?keyword=${keyword}&page=${page}&size=${size}`
  );
  
  
  return response.data;
}

//APIAddNewEquipmentCategory
export interface NewEquipmentCategoryRequest {
  equipmentName: string;
  category: string;
  code:number;
}
export const APIAddNewEquipmentCategory = async (equipment: NewEquipmentCategoryRequest): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/equipment`, equipment, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Loại thiết bị đã được tạo thành công", response.data);
  } catch (error) {
    console.error("Lỗi khi tạo loại thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};

//APIUpdateEquipmentCategory
 
export const APIUpdateEquipmentCategory = async (equipmentCategoryId: number, newUpdateEquipment: NewEquipmentCategoryRequest): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/equipment/${equipmentCategoryId}`, newUpdateEquipment, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Loại thiết bị đã được cập nhật thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật loại thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};
export type EquipmentDetailResponse = {
  content: EquipmentDetail[];  
  totalElements: number;  
  totalPages: number;  
  size: number;  
};

//APIgetAllEquipmentDetail
export async function APIgetAllEquipmentDetail(
  keyword: string = '', 
  page: number = 0, 
  size: number = 15
): Promise<EquipmentResponse> {
  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/equipment-detail/search?keyword=${keyword}&page=${page}&size=${size}`
  );
  return response.data;
}

//APIgetEquipmentDetailByRoomID
export async function APIgetAllEquipmentDetailByRoomID(
  roomID: number
): Promise<EquipmentResponse> {
  console.log( `${BASE_URL}/api/v1/equipment-detail/room/${roomID}`);
  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/equipment-detail/room/${roomID}`
  );
  return response.data;
}

//APIgetEquipmentDetailByEquipmentID
export async function APIgetAllEquipmentDetailByEquipmentID(
  equipmentID: number
): Promise<EquipmentDetailResponse> {
  console.log( `${BASE_URL}/api/v1/equipment-detail/equipment/${equipmentID}/search`);
  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/equipment-detail/equipment/${equipmentID}/search`
  );
  return response.data;
}

//APIAddNewEquipmentDetail
export interface NewEquipmentRequest {
  "description": string,
  "purchaseDate": string,
  "equipmentId": number,
  "roomId": number
}
export const APIAddNewEquipmentDetail = async (equipment: NewEquipmentRequest): Promise<void> => {
  try {
     
    const response = await axios.post(`${BASE_URL}/api/v1/equipment-detail`, equipment, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Thiết bị đã được thêm thành công", response.data);
  } catch (error) {
    console.error("Lỗi khi thêm thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};










