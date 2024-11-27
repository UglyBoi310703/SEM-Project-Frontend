"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { X } from '@phosphor-icons/react';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import AddRoomEquipment from '../classroominformation/classroomequipment/classroomequipments';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Addclassroommodal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button  startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleClickOpen}>
        Thêm phòng học
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg" // sm, md, lg, xl tùy chỉnh
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thêm phòng học
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <X />
        </IconButton>
        <DialogContent dividers>
        <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Mã Phòng</InputLabel>
                <OutlinedInput defaultValue="ROOM-9" label="Roomid" name="Roomid" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Tên phòng</InputLabel>
                <OutlinedInput defaultValue="DTLT-09" label="RoomName" name="RoomName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Loại phòng</InputLabel>
                <OutlinedInput defaultValue="Phòng học" label="RoomType" name="RoomType" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Số lượng Chỗ ngồi</InputLabel>
                <OutlinedInput label="Số lượng Chỗ ngồi" name="seats" type="seats" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Lưu
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
