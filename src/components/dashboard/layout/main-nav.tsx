'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { NotificationsPopover } from '../popover/notifications/notifications-popover';
import { usePopover } from '@/hooks/use-popover';
import { MobileNav } from './mobile-nav';
import { UserPopover } from '../popover/user-popover';
import { Typography } from '@mui/material';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();

  // State for Notifications Popover
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const notificationsOpen = Boolean(notificationsAnchorEl);
  const contents = [
    "SEM APP Chúc bạn có một ngày làm việc hiệu quả.",
    "WELCOME TO SEM APP! (School Equipment Management App).",
    "Chào mừng bạn đến với SEM APP!",
    "Cảm ơn bạn đã sử dụng SEM APP, chúc bạn một ngày tốt lành.",
    
  ];
  const [currentContent, setCurrentContent] = React.useState(contents[0]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * contents.length);
      setCurrentContent(contents[randomIndex]);
    }, 10000); // Thay đổi nội dung sau mỗi 10 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
  }, [contents]);

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              position: "relative",
              width: "100%",
              height: "50px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
            }}
      >
      <Typography
        variant="h6"
        sx={{
          display: "inline-block",
          paddingLeft: "100%",
          animation: "marquee 10s linear infinite",
        }}
        key={currentContent} // Key để reset animation mỗi khi nội dung thay đổi
      >
        {currentContent}
      </Typography>

      {/* Định nghĩa animation */}
      <style>
        {`
          @keyframes marquee {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            {/* Notifications */}
            <Tooltip title="Thông báo">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton onClick={handleNotificationsOpen}>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>

            {/* Avatar */}
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/AVT.jpg"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Notifications Popover */}
      <NotificationsPopover
        anchorEl={notificationsAnchorEl}
        onClose={handleNotificationsClose}
        open={notificationsOpen}
      />

      {/* User Popover */}
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />

      {/* Mobile Navigation */}
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
