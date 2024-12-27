import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'user-equipments', title: 'Thiết bị', href: paths.user.equipments, icon: 'plugs-connected' },
  { key: 'user-borrowequipmentrequests', title: 'Mượn trả thiết bị', href: paths.user.borrowequipmentrequests, icon: 'BorrowEquipmentRequest' },
  { key: 'user-borrowroomrequests', title: 'Mượn trả phòng', href: paths.user.borrowroomrequests, icon: 'BorrowRoomRequest' },
  { key: 'user-classrooms', title: 'Phòng học', href: paths.user.classrooms, icon: 'door' },
  { key: 'user-settings', title: 'Cài đặt', href: paths.user.settings, icon: 'gear-six' },
  { key: 'user-account', title: 'Tài khoản', href: paths.user.account, icon: 'user' },

] satisfies NavItemConfig[];
