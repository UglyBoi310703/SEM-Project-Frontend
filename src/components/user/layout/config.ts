import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'user-crashreports', title: 'Báo Cáo', href: paths.user.crashreports, icon: 'warning' },
  { key: 'user-equipments', title: 'Thiết bị', href: paths.user.equipments, icon: 'plugs-connected' },
  { key: 'user-borrowrequests', title: 'Đơn mượn', href: paths.user.borrows, icon: 'users' },
  { key: 'user-classrooms', title: 'Phòng học', href: paths.user.classrooms, icon: 'door' },
  { key: 'user-settings', title: 'Cài đặt', href: paths.user.settings, icon: 'gear-six' },
  { key: 'user-account', title: 'Tài khoản', href: paths.user.account, icon: 'user' },

] satisfies NavItemConfig[];