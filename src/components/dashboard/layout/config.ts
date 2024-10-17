import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'baocao', title: 'Báo Cáo', href: paths.dashboard.overview, icon: 'warning' },
  { key: 'donmuon', title: 'Đơn mượn', href: paths.dashboard.borrows, icon: 'users' },
  { key: 'phonghoc', title: 'Phòng học', href: paths.dashboard.classrooms, icon: 'door' },
  { key: 'settings', title: 'Cài đặt', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Tài khoản', href: paths.dashboard.account, icon: 'user' },

] satisfies NavItemConfig[];
