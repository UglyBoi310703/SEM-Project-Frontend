import type { User } from "@/types/user";

const USER_KEY = "user";

// Lấy thông tin người dùng từ localStorage
export function getUserFromLocalStorage(): User | null {
  const userData = localStorage.getItem(USER_KEY);
  if (userData) {
    try {
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error("[getUserFromLocalStorage] Invalid JSON data:", error);
      return null;
    }
  }
  return null;
}

// Lưu thông tin người dùng vào localStorage
export function saveUserToLocalStorage(user: User): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("[saveUserToLocalStorage] Error saving user:", error);
  }
}

// Xóa thông tin người dùng khỏi localStorage
export function removeUserFromLocalStorage(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("[removeUserFromLocalStorage] Error removing user:", error);
  }
}
