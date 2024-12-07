'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import DialogActions from '@mui/material/DialogActions';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import { X } from '@phosphor-icons/react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import ClassroomEquipments from './classroomequipment/classroomequipments';
import ClassroomInformationForm from './classroominformationform/classroominformationform';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ClassroomInformation() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thông tin
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        maxWidth="xl" // sm, md, lg, xl tùy chỉnh
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thông tin phòng học
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
          <X/>
        </IconButton>
        <DialogContent dividers>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={18}>
        <Grid item xs={6}>
          <Item>
     <ClassroomInformationForm/>
        </Item>
        </Grid>
        <Grid item xs={12}>
          <Item><ClassroomEquipments/></Item>
        </Grid>
      </Grid>
    </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
