"use client";

import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ClassRoomInformation from "./editclassroom/classroominfomation";

import Chip from "@mui/material/Chip";
import { Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { APIChangeRoomStatus } from "@/utils/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export interface Classroom {
  id: number,
  roomName: string;
  type: string;
  capacity: number;
  status: "IN_USE" | "AVAILABLE" | "BROKEN";
}

export interface ClassroomCardProps {
  classroom: Classroom;
  onUpdateRoom: (room: Classroom) => Promise<void>;
}

const statusMap = {
  BROKEN: { label: "Đang bảo trì", color: "secondary" },
  AVAILABLE: { label: "Sẵn sàng", color: "success" },
  IN_USE: { label: "Đang sử dụng", color: "warning" },
} as const;

export function ClassroomCard({ classroom, onUpdateRoom }: ClassroomCardProps): React.JSX.Element {
  const { label, color } = statusMap[classroom.status] ?? { label: 'Unknown', color: 'default' };
  const [roomStatus, setRoomStatus] = React.useState(classroom.status);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

 
const handleChangeStatus = async (status: "IN_USE" | "AVAILABLE" | "BROKEN") => {
  const result = await Swal.fire({
    title: 'Xác nhận thay đổi trạng thái',
    text: `Bạn có chắc chắn muốn đổi trạng thái phòng thành ${statusMap[status].label}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy',
  });

  if (result.isConfirmed) {
    try {
  
      setRoomStatus(status);

      if (status) {
        await APIChangeRoomStatus(classroom.id, status);
        onUpdateRoom(classroom);

  
        toast.success(`Trạng thái phòng đã được đổi thành "${status}".`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      handleCloseMenu();
    } catch (error) {
      // Hiển thị Toastify thông báo lỗi
      toast.error('Đã xảy ra lỗi khi đổi trạng thái phòng. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } else {
    handleCloseMenu();
  }
};
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {classroom.roomName}
            </Typography>
            <Typography align="center" variant="body1">
              {classroom.type}
            </Typography>
            {
              classroom.capacity ? <Typography align="center" variant="body1">
              Số lượng chỗ ngồi: {classroom.capacity}
            </Typography> : null
            }
            
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
          <Chip color={color} label={label} size="small" />
          <IconButton onClick={handleOpenMenu}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {Object.entries(statusMap).map(([statusKey, { label, color }]) => (
              <MenuItem
                key={statusKey}
                onClick={() => {handleChangeStatus(statusKey as "IN_USE" | "AVAILABLE" | "BROKEN")}}
              >
                <Chip color={color} label={label} size="small" />
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          >
          {/* <Button variant="outlined" color="error"  >Xoá</Button> */}
          <ClassRoomInformation room={classroom} onUpdateRoom = {onUpdateRoom} />
          </Box>
      </Stack>
    </Card>
  );
}
