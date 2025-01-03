import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'baocao', title: 'Báo Cáo', href: paths.dashboard.crashreports, icon: 'warning' },
  { key: 'thietbi', title: 'Thiết bị', href: paths.dashboard.equipments, icon: 'plugs-connected' },
  { key: 'donmuon', title: 'Mượn trả thiết bị', href: paths.dashboard.borrowequipmentrequests, icon: 'BorrowEquipmentRequest' },
  { key: 'donmuon', title: 'Mượn trả phòng', href: paths.dashboard.borrowroomrequests, icon: 'BorrowRoomRequest' },
  { key: 'phonghoc', title: 'Phòng học', href: paths.dashboard.classrooms, icon: 'door' },
  { key: 'settings', title: 'Cài đặt', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Tài khoản', href: paths.dashboard.account, icon: 'user' },

] satisfies NavItemConfig[];
