import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { X } from "@phosphor-icons/react";
import type { EquipmentDetail } from './equipmentdetailstable';
import dayjs from 'dayjs';
import EquipmentFilter from '../equipmentfilters/equipmentfilters';
import { EquipmentsDetailsTable } from './equipmentdetailstable';
import AddEquipmentModal from '../addequipment/addequipment';


export default function EquipmentDetails(): React.JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <React.Fragment>
    <Button
      variant="contained"
      onClick={handleClickOpen}
    >
      Chi tiết
    </Button>
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xl" // sm, md, lg, xl tùy chỉnh
      fullWidth={true}
    >
      <DialogTitle sx={{mb:2 }} >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <X />
      </IconButton>
      </DialogTitle>
      <DialogContent dividers>
      <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Danh sách thiết bị</Typography>
        </Stack>
        <div>
          <AddEquipmentModal/>
        </div>
      </Stack>
     
      <EquipmentsDetailsTable
      />
    </Stack>
      </DialogContent>
    </Dialog>
  </React.Fragment>
  );
}

