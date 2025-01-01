"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { X } from "@phosphor-icons/react";
import { EquipmentsDetailsTable } from './equipmentdetailstable';
import AddEquipmentModal from '../addequipment/add-equipment';


export default function EquipmentDetails({ equipmentCategory }): React.JSX.Element {
  React.useEffect(() => {
    console.log(equipmentCategory);
  }, [])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [updated, setUpdated] = React.useState(false)
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
        <DialogTitle sx={{ mb: 2 }} >
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
                <AddEquipmentModal setUpdated={setUpdated} equipmentCategory={equipmentCategory} />
              </div>
            </Stack>
            <EquipmentsDetailsTable
              setUpdated={setUpdated}
              updated={updated}
              equipmentCategory={equipmentCategory}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

