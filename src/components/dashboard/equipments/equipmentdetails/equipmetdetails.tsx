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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

const equipmentdetails = [
  {
    id: 'E-001',
    name: 'Máy chiếu',
    seri:'DTLT-3107',
    local:'SamSung',
    manufactureyear:2024,
    purchasedate:dayjs().subtract(2, 'hours').toDate(),
    status: 'available',
    note:'Thiết bị mới',
  },
  {
    id: 'E-001',
    name: 'Máy chiếu',
    seri:'DTLT-3107',
    local:'SamSung',
    manufactureyear:2024,
    purchasedate:dayjs().subtract(2, 'hours').toDate(),
    status: 'available',
    note:'Thiết bị mới',
  },
  {
    id: 'E-001',
    name: 'Máy chiếu',
    seri:'DTLT-3107',
    local:'SamSung',
    manufactureyear:2024,
    purchasedate:dayjs().subtract(2, 'hours').toDate(),
    status: 'used',
    note:'Thiết bị mới',
  },
  {
    id: 'E-001',
    name: 'Máy chiếu',
    seri:'DTLT-3107',
    local:'SamSung',
    manufactureyear:2024,
    purchasedate:dayjs().subtract(2, 'hours').toDate(),
    status: 'fixing',
    note:'Thiết bị mới',
  },
  {
    id: 'E-001',
    name: 'Máy chiếu',
    seri:'DTLT-3107',
    local:'SamSung',
    manufactureyear:2024,
    purchasedate:dayjs().subtract(2, 'hours').toDate(),
    status: 'used',
    note:'Thiết bị mới',
  },

] satisfies EquipmentDetail[];

export default function EquipmentDetails(): React.JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

  const page = 0;
  const rowsPerPage = 5;
  const paginatedBorrows = applyPagination(equipmentdetails, page, rowsPerPage);
  
  return (
    <React.Fragment>
    <Button
      variant="contained"
      onClick={handleClickOpen}
    >
      Chi tiết
    </Button>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xl" // sm, md, lg, xl tùy chỉnh
      fullWidth={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Danh sách thiết bị
      </DialogTitle>
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
      <EquipmentFilter/>
      <EquipmentsDetailsTable
        count={paginatedBorrows.length}
        page={page}
        rows={paginatedBorrows}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
      </DialogContent>
    </BootstrapDialog>
  </React.Fragment>
  );
}

function applyPagination(rows: EquipmentDetail[], page: number, rowsPerPage: number): EquipmentDetail[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
