'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { usePopover } from '@/hooks/use-popover';
import { MobileNav } from './mobile-nav';
import { UserPopover } from '../popover/user-popover';
import { Typography } from '@mui/material';
import { NotificationsPopover } from '../popover/notifications/notifications-popover';


export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();

  // State for Notifications Popover

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
//  React.useEffect(() => {
//     const eventSource = new EventSource('http://localhost:8080/api/v1/notifications/subscribe',
//       {
//         withCredentials:true
//       }
//     );
  
//     eventSource.addEventListener('notification', (event) => {
//       console.log('Received notification:', event.data);
//       // Thực hiện xử lý khác, ví dụ: hiển thị thông báo
//       alert(`Thông báo nhận được: ${event.data}`);
//     });
//     eventSource.onerror = () => {
//       console.error('SSE connection error');
//       eventSource.close();
//     };
  
//     return () => {
//       eventSource.close();
//     };
//   }, []);

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
              <NotificationsPopover/>

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
