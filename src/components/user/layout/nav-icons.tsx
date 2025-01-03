import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Door } from '@phosphor-icons/react';
import { Warning } from '@phosphor-icons/react';
import { ListBullets } from '@phosphor-icons/react';
import { Lockers } from '@phosphor-icons/react';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'door': Door,
  'warning':Warning,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  'BorrowEquipmentRequest': ListBullets,
  'BorrowRoomRequest':Lockers,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
