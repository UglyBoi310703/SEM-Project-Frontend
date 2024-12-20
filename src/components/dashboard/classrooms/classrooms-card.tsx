"use client";

import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ClassRoomInformation from "./classroominfomation";

import Chip from "@mui/material/Chip";
import { Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export interface Classroom {
  id: string;
  roomName: string;
  type: string;
  capacity: number;
  status: "OCCUPIED" | "AVAILABLE" | "BROKEN";
}

export interface ClassroomCardProps {
  classroom: Classroom;
}

const statusMap = {
  BROKEN: { label: "Đang bảo trì", color: "secondary" },
  AVAILABLE: { label: "Sẵn sàng", color: "success" },
  OCCUPIED: { label: "Đang sử dụng", color: "warning" },
} as const;

export function ClassroomCard({ classroom }: ClassroomCardProps): React.JSX.Element {
  const [roomStatus, setRoomStatus] = React.useState(classroom.status);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = (status: "OCCUPIED" | "AVAILABLE" | "BROKEN") => {
    setRoomStatus(status);
    handleCloseMenu();
  };

  const { label, color } = statusMap[roomStatus] ?? { label: "Unknown", color: "default" };

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
            <Typography align="center" variant="body1">
              Số lượng chỗ ngồi: {classroom.capacity}
            </Typography>
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
                onClick={() => {handleChangeStatus(statusKey as "OCCUPIED" | "AVAILABLE" | "BROKEN")}}
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
          <Button size="small" variant="outlined" color="error">
            Xoá
          </Button>
          <ClassRoomInformation room={classroom} />
        </Box>
      </Stack>
    </Card>
  );
}
