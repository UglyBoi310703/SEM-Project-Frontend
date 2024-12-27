"use client"
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Warning } from '@phosphor-icons/react';
import Tooltip from '@mui/material/Tooltip';

function CreateCrashReport (): React.JSX.Element{
  // Sử dụng useState để quản lý trạng thái mở/đóng dialog và nội dung báo cáo
  const [open, setOpen] = useState<boolean>(false);
  const [reportContent, setReportContent] = useState<string>('');

  // Mở dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Đóng dialog
  const handleClose = () => {
    setOpen(false);
    setReportContent(''); // Xóa nội dung báo cáo khi đóng dialog
  };

  // Xử lý thay đổi nội dung báo cáo
  const handleReportContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportContent(event.target.value);
  };

  // Gửi báo cáo
  const handleSubmit = () => {
   
    setReportContent(''); // Xóa nội dung báo cáo sau khi gửi
    handleClose(); // Đóng dialog
  };

  // Hủy báo cáo
  const handleCancel = () => {
    setReportContent(''); // Xóa nội dung khi hủy
    handleClose(); // Đóng dialog
  };

  return (
    <Box
    
    >
        <Tooltip title="Báo cáo sự cố">       
                <IconButton onClick={handleOpen}>
                  <Warning />
                </IconButton>
              
          </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Báo cáo sự cố
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
           <DialogContent>
        <Box component="form"
        mt={2}>
        <TextField
            fullWidth
            multiline
            rows={4}
            label="Nội dung báo cáo"
            variant="outlined"
            value={reportContent}
            onChange={handleReportContentChange}
          />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Gửi
          </Button>
        </DialogActions>
        </form>
       
      </Dialog>
    </Box>
  );
};

export default CreateCrashReport;
