"use client"
import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const { checkSession } = useUser();
  const router = useRouter();
  const [user, setUser] = React.useState<{ username: string; email: string } | null>(null);
  const eventSourceRef = React.useRef<EventSource | null>(null); // Quản lý SSE

  const fetchUserInfo = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getMyInfo();
      if (error) {
        logger.error('Failed to fetch user info', error);
        return;
      }
      setUser(data || null);
    } catch (err) {
      logger.error('An error occurred while fetching user info', err);
    }
  }, []);

  React.useEffect(() => {
    fetchUserInfo().catch((err: unknown) => logger.error(err));
  }, [fetchUserInfo]);

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log('SSE connection closed during sign out.');
        eventSourceRef.current = null;
      }

      const { error } = await authClient.signOut();
      if (error) {
        logger.error('Sign out error', error);
        return;
      }

      await checkSession?.();
      router.refresh();
    } catch (err) {
      logger.error('Sign out error', err);
    }
  }, [checkSession, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        {user ? (
          <>
            <Typography variant="subtitle1">{user.username}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.email}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Đang tải thông tin người dùng...
          </Typography>
        )}
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={RouterLink} href={paths.dashboard.settings} onClick={onClose}>
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.dashboard.account} onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Tài khoản
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Popover>
  );
}