import axios from "axios";
import { NextApiRequest, NextApiResponse } from 'next';

import type { Classroom } from "@/components/dashboard/classrooms/classrooms-card";
import { Equipment } from "@/components/dashboard/equipments/equipment-categories-table";
import { EquipmentDetail } from "@/components/dashboard/equipments/equipmentdetails/equipmentdetailstable";

const BASE_URL = 'http://localhost:8080';

// //APIGetRoomsByKeyword, type, status
export type RoomApiResponse = {
  content: Classroom[];
  page: {
    size: number,
    number: number,
    totalElements: number,
    totalPages: number
  };
};


export async function APIGetRoom(type: string = '',
  status: string = '',
  keyword: string = '',
  page: number = 0,
  size: number = 4): Promise<RoomApiResponse> {
  console.log(`${BASE_URL}/api/v1/room/search?type=${type}&status=${status}&keyword=${keyword}&page=${page}&size=${size}`);
  const response = await axios.get<RoomApiResponse>(`${BASE_URL}/api/v1/room/search?type=${type}&status=${status}&keyword=${keyword}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
    }
  );
  return response.data;
}

// APIAddRoom
export interface NewRoom {
  roomName: string;
  type: string;
  capacity: number;
}
export const addClassRoom = async (classroom: NewRoom): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/room`, classroom, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
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
  const response = await fetch(`${BASE_URL}/api/v1/room/search?keyword=${roomName}`, {
    method: 'GET',
    credentials: 'include', // Gửi thông tin xác thực
  });

  if (!response.ok) {
    throw new Error("Failed to fetch room data");
  }
  return response.json();
}

// API Update Room
export const APIModifyClassRoom = async (classroom_id: number, newClassroom: NewRoom): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/room/${classroom_id}`, newClassroom, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
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
export const APIUpdateEquipmentDetailLocation = async (
  classroom_id: number,
  ClassRoomEquipmentId: ClassRoomEquipmentId
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/equipment-detail/location/room/${classroom_id}`,
      ClassRoomEquipmentId,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Thiết bị gắn với phòng học đã được cập nhật thành công:", response.data);
    return true; // Trả về true khi thành công
  } catch (error) {
    console.error("Lỗi khi cập nhật thiết bị gắn với phòng học:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    return false; // Trả về false khi gặp lỗi
  }
};



//APIGetAllEquipmentCategories
export interface EquipmentResponse {
  content: Equipment[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

interface GetAllEquipmentCategoriesParam {
  category?: string; // Đánh dấu tùy chọn nếu không bắt buộc
  keyword?: string;  // Đánh dấu tùy chọn nếu không bắt buộc
  page: number;
  size: number;
}

export async function APIGetAllEquipment(
  param: GetAllEquipmentCategoriesParam
): Promise<EquipmentResponse> {
  const response = await axios.get<EquipmentResponse>(
    `${BASE_URL}/api/v1/equipment/search`,
    {
      params: param, // Đặt tham số vào 'params'
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
    }
  );
  return response.data;
}


// APIAddNewEquipmentCategory
export interface NewEquipmentCategoryRequest {
  equipmentName: string;
  category: string;
  code: number;
}
export const APIAddNewEquipmentCategory = async (equipment: NewEquipmentCategoryRequest): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/equipment`, equipment, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
    });
    console.log("Loại thiết bị đã được tạo thành công", response.data);
  } catch (error) {
    console.error("Lỗi khi tạo loại thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};

// APIUpdateEquipmentCategory
export const APIUpdateEquipmentCategory = async (equipmentCategoryId: number, newUpdateEquipment: NewEquipmentCategoryRequest): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/equipment/${equipmentCategoryId}`, newUpdateEquipment, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
    });
    console.log("Loại thiết bị đã được cập nhật thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật loại thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};
export interface EquipmentDetailResponse {
  content: EquipmentDetail[];
  page: {
    size: number,
    number: number,
    totalElements: number,
    totalPages: number
  };
};

//APIgetAllEquipmentDetail
export async function APIgetAllEquipmentDetail(
  keyword: string = '',
  page: number = 0,
  size: number = 10
): Promise<EquipmentResponse> {
  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/equipment-detail/search?keyword=${keyword}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
    }
  );
  return response.data;
}

//APIgetEquipmentDetailByRoomID
export async function APIgetAllEquipmentDetailByRoomID(
  roomID: number
): Promise<EquipmentResponse> {
  console.log(`${BASE_URL}/api/v1/equipment-detail/room/${roomID}`);
  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/equipment-detail/room/${roomID}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Gửi thông tin xác thực
  }
  );
  return response.data;
}

//APIgetEquipmentDetailByEquipmentID
export async function APIgetAllEquipmentDetailByEquipmentID(
  equipmentID: number
): Promise<EquipmentDetailResponse> {
  console.log(`${BASE_URL}/api/v1/equipment-detail/equipment/${equipmentID}/search`);
  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/equipment-detail/equipment/${equipmentID}/search`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Gửi thông tin xác thực
  }
  );
  return response.data;
}

//APIAddNewEquipmentDetail
export interface NewEquipmentRequest {
  description: string;
  purchaseDate: string;
  equipmentId: number;
  roomId: number;
}
export const APIAddNewEquipmentDetail = async (equipment: NewEquipmentRequest): Promise<void> => {
  try {

    const response = await axios.post(`${BASE_URL}/api/v1/equipment-detail`, equipment, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    console.log("Thiết bị đã được thêm thành công", response.data);
  } catch (error) {
    console.error("Lỗi khi thêm thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};

//APIUpdateEquipmentDetail
export const APIUpdateEquipmentDetail = async (equipmentDetailId: number, newUpdateEquipmentDetail: NewEquipmentRequest): Promise<void> => {
  try {
    console.log(`${BASE_URL}/api/v1/equipment-detail/${equipmentDetailId}`);

    const response = await axios.patch(`${BASE_URL}/api/v1/equipment-detail/${equipmentDetailId}`, newUpdateEquipmentDetail, {
      headers: {
        "Content-Type": "application/json",

      },
      withCredentials: true
    });
    console.log("Thiết bị đã được cập nhật thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};

export async function APIgetEquipmentDetail(
  equipmentId: number,
  keyword: string = '',
  status: string = '',
  page: number = 0,
  size: number = 5
): Promise<EquipmentDetailResponse> {
  console.log(`${BASE_URL}/api/v1/equipment-detail/equipment/${equipmentId}/search?keyword=${keyword}&status=${status}&page=${page}&size=${size}`);

  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/equipment-detail/equipment/${equipmentId}/search?keyword=${keyword}&status=${status}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
    }
  );


  return response.data;
}




//API CreateBorrowEquipmentRequest

// API CreateBorrowEquipmentRequest
export interface BorrowEquipmentItem {
  equipmentName: string;
  quantityBorrowed: number;
  conditionBeforeBorrow: string;
}

export interface CreateBorrowEquipmentRequest {
  userId: string;
  comment: string;
  expectedReturnDate: string;
  equipmentItems: BorrowEquipmentItem[];
}


export const APICreateBorrowEquipmentRequest = async (
  request: CreateBorrowEquipmentRequest
): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/borrow/equipment`, request, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi thông tin xác thực
    });
    console.log("Yêu cầu mượn thiết bị đã được tạo thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi tạo yêu cầu mượn thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
  }
};

// APIGetAllBorrowEquipmentRequests
export interface BorrowEquipmentRequest {
  uniqueID: number;
  userId: number;
  comment: string;
  expectedReturnDate: string;
  equipmentItems: BorrowEquipmentItem[];
  userName: string;
  status: string;
  createdAt: string;
}
export interface BorrowRoomRequestParam {
  filter: string;
  page: number;
  size: number;
  sort: string[];
}
export interface BorrowEquipmentRequestsResponse {
  content: BorrowEquipmentRequest[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const APIGetAllBorrowEquipmentRequests = async (
  params: BorrowRoomRequestParam
): Promise<BorrowEquipmentRequestsResponse> => {
  try {
    const response = await axios.get<BorrowEquipmentRequestsResponse>(
      `${BASE_URL}/api/v1/borrow/equipment/list`,
      {
        params, // Truyền tham số vào đây
        withCredentials: true, // Gửi thông tin xác thực
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu cầu mượn thiết bị:", error);
    throw error;
  }
};


// API to fetch borrow equipment requests with filters and pagination
export interface FetchBorrowEquipmentRequestsParams {
  userId?: number;
  statuses?: string[];
  expectedReturnDateBefore?: string;
  expectedReturnDateAfter?: string;
  username?: string;
  page: number;
  size: number;
  sort?: string[];
}

export const APIGetFilteredBorrowEquipmentRequests = async (
  params: FetchBorrowEquipmentRequestsParams
): Promise<BorrowEquipmentRequestsResponse> => {
  try {
    const response = await axios.get<BorrowEquipmentRequestsResponse>(
      `${BASE_URL}/api/v1/borrow/equipment/filter`,
      {
        params: {
          userId: params.userId || undefined,
          statuses: params.statuses || [],
          expectedReturnDateBefore: params.expectedReturnDateBefore || null,
          expectedReturnDateAfter: params.expectedReturnDateAfter || null,
          username: params.username || "",
          page: params.page,
          size: params.size,
          sort: params.sort || [],
        },
        withCredentials: true, // Send credentials for authentication
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching filtered borrow equipment requests:", error);
    if (axios.isAxiosError(error)) {
      console.error("API error details:", error.response?.data);
    }
    throw error;
  }
};

// API to get borrow equipment details by ID
export interface BorrowEquipmentDetail {
  id: number;
  equipmentName: string;
  quantityBorrowed: number;
  conditionBeforeBorrow: string;
  borrowedEquipmentDetailCodes: string[];
}

export interface BorrowEquipmentDetailsResponse {
  requestId: number;
  details: BorrowEquipmentDetail[];
}

export async function APIGetBorrowEquipmentDetailsById(
  borrowId: number
): Promise<BorrowEquipmentDetailsResponse> {
  try {
    const response = await axios.get<BorrowEquipmentDetailsResponse>(
      `${BASE_URL}/api/v1/borrow/equipment/list/${borrowId}/details`,
      {
        withCredentials: true, // Gửi thông tin xác thực
      }
    );
    console.log("Chi tiết đơn mượn thiết bị:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn mượn thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
}
// API BorrowEquipmentActions
//1.API ApproveBorrowEquipment
export async function APIApproveBorrowEquipmentRequest(
  borrowId: number
): Promise<string> {
  try {
    const response = await axios.put<{ message: string }>(
      `${BASE_URL}/api/v1/borrow/equipment/${borrowId}/approve`,
      null, // PUT không có body
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Gửi cookie
      }
    );
    console.log("Phê duyệt đơn mượn thành công:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Lỗi khi phê duyệt đơn mượn:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
}

//2.API DenyBorrowEquipmentRequest
export async function APIDenyBorrowEquipmentRequest(
  requestId: number,
  reason: string
): Promise<string> {
  try {
    const response = await axios.patch<{ message: string }>(
      `${BASE_URL}/api/v1/borrow/equipment/deny`,
      {
        requestId,
        reason,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Gửi thông tin xác thực nếu cần
      }
    );

    console.log("Từ chối đơn mượn thành công:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Lỗi khi từ chối đơn mượn:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
}
// APIUpdateBorrowEquipmentRequest
export interface UpdateBorrowEquipmentRequest {
  uniqueID: number;
  userId: number;
  comment: string;
  expectedReturnDate: string;
  equipmentItems: {
    equipmentName: string;
    quantityBorrowed: number;
    equipmentDetailCodes: string[];
    conditionBeforeBorrow: string;
  }[];
}

export const APIUpdateBorrowEquipmentRequest = async (
  request: UpdateBorrowEquipmentRequest
): Promise<void> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/borrow/equipment/edit`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Gửi thông tin xác thực
      }
    );
    console.log("Đơn mượn thiết bị đã được cập nhật thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn mượn thiết bị:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
};

//API GET BORROWEQUIPMENTREQUEST BY ID

// Định nghĩa kiểu dữ liệu trả về từ API
interface BorrowedEquipmentDetail {
  id: number;
  equipmentName: string;
  quantityBorrowed: number;
  conditionBeforeBorrow: string;
  borrowedEquipmentDetailCodes: string[];
}

interface ApiResponse {
  requestId: number;
  details: BorrowedEquipmentDetail[];
}
// Hàm gọi API lấy thông tin đơn mượn
interface FetchBorrowDetailsParams {
  id: string | number;
};

export async function GetBorrowDetails({ id }: FetchBorrowDetailsParams): Promise<ApiResponse | null> {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/borrow/equipment/list/${id}/details`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to fetch data: ${error.response?.status} - ${error.response?.statusText}`, error.response?.data);
    } else {
      console.error(`Unexpected error fetching data:`, error);
    }
    return null;
  }
}


//API CreatBorrowRoomRequest
export const APICreateBorrowRoomRequest = async (request: {
  userId: number;
  roomId: number;
  startTime: string;
  endTime: string;
  comment: string;
}): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/borrow/room`, request, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Gửi cookie nếu cần
    });
    console.log("API response:", response.data);
  } catch (error) {
    console.error("API error:", error);
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};

//API GetBorrowRoomRequest-USER
export interface BorrowRoomRequest {
  userId: number;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string[];
}

export interface BorrowRoomResponse {
  content: {
    roomId: number;
    userId: number;
    startTime: string;
    endTime: string;
    comment: string;
    cancelable: boolean;
    status: string;
  }[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export async function APIGetBorrowRoomRequests(
  request: BorrowRoomRequest
): Promise<BorrowRoomResponse> {
  try {
    const response = await axios.get<BorrowRoomResponse>(
      `${BASE_URL}/api/v1/borrow/room/user-request`,
      {
        params: request,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Gửi thông tin xác thực
      }
    );
    console.log("Danh sách đơn mượn phòng:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn mượn phòng:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
}
//API GetBorrowRoomRequest-ADMIN
export interface BorrowRoomBodyRequest {
  email: number;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string[];
}

export interface BorrowRoomListResponse {
  content: {
    uniqueId: number;
    roomname: string;
    username: string;
    email: string;
    startTime: string;
    endTime: string;
    comment: string;
    cancelable: boolean;
  }[];
  page: {
    page: number;
    size: number;
    sort: string[];
  };
}

export async function APIGetAdminBorrowRoomRequests(
  request: BorrowRoomBodyRequest
): Promise<BorrowRoomListResponse> {
  try {
    const response = await axios.get<BorrowRoomResponse>(
      `${BASE_URL}/api/v1/borrow/room/admin-request`,
      {
        params: request,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Gửi thông tin xác thực
      }
    );
    console.log("Danh sách đơn mượn phòng:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn mượn phòng:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
}
// APIBatchDeleteBorrowEquipments
export const APIBatchDeleteBorrowEquipments = async (ids: number[]): Promise<void> => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/borrow/equipment/batch-delete`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: ids, // Chuyển `ids` thành dữ liệu request body
      withCredentials: true, // Gửi thông tin xác thực
    });
    console.log("Đã xóa thành công các đơn mượn phòng:", response.data);
  } catch (error) {
    console.error("Lỗi khi xóa các đơn mượn phòng:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
};

// APIBatchDeleteBorrowRoom
export const APIBatchDeleteBorrowRoom = async (ids: number[]): Promise<void> => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/borrow/room/batch-delete`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: ids, // Chuyển `ids` thành dữ liệu request body
      withCredentials: true, // Gửi thông tin xác thực
    });
    console.log("Đã xóa thành công các đơn mượn phòng:", response.data);
  } catch (error) {
    console.error("Lỗi khi xóa các đơn mượn phòng:", error);
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", error.response?.data);
    }
    throw error;
  }
};

//API Message

//SendAlertNotify
export const APISendAlertNotify = async (message: string): Promise<void> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/notifications/sendAlertNotify`,
      { message }, // gửi dưới dạng đối tượng
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Gửi thông tin xác thực
      }
    );
    console.log("Gửi thông báo thành công:", response.data);
  } catch (error) {
    console.error("Gửi thông báo thất bại.");
    if (axios.isAxiosError(error)) {
      console.error("Chi tiết lỗi từ API:", {
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Lỗi không xác định:", error);
    }
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

//APIGetRoomBorrowRequest-Admin
export async function APIGetRoomBorrowRequestAdmin(
  email: string,
  startDate: string = '',
  endDate: string = '',
  page: number = 0,
  size: number = 5,
  sort: string = ''
): Promise<EquipmentDetailResponse> {
  console.log(`${BASE_URL}/api/v1/borrow/room/admin-request?email=${email}&page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}&sort=${sort}`);
  const response = await axios.get<EquipmentDetailResponse>(
    `${BASE_URL}/api/v1/borrow/room/admin-request?email=${email}&page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}&sort=${sort}`
  );

  return response.data;
}

//API Subcribe to Server-Send Events

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Gửi một sự kiện ngay khi kết nối được mở
    res.write(`data: Subscribed to SSE\n\n`);

    // Ví dụ: Thực hiện công việc khác
    const interval = setInterval(() => {
      res.write(`data: Server is alive at ${new Date().toISOString()}\n\n`);
    }, 1000);

    // Dọn dẹp khi kết nối đóng
    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}