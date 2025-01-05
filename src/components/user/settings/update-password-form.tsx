'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/material';
import Swal from 'sweetalert2';
import { APIChangePassword } from '@/utils/api';

export function UpdatePasswordForm(): React.JSX.Element {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      Swal.fire('Lỗi', 'Mật khẩu mới phải có ít nhất 6 ký tự.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp.', 'error');
      return;
    }

    try {
      const result = await Swal.fire({
        title: 'Xác nhận',
        text: 'Bạn có chắc muốn đổi mật khẩu?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
      });

      if (result.isConfirmed) {
        const message = await APIChangePassword(oldPassword, newPassword);
        Swal.fire('Thành công', message, 'success');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Swal.fire('Lỗi', 'Mật khẩu hiện tại không chính xác.', 'error');
      } else if (error.response?.status === 500) {
        Swal.fire('Lỗi', 'Đã xảy ra lỗi. Mật khẩu hiện tại không chính xác.', 'error');
      } else {
        Swal.fire('Lỗi', 'Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.', 'error');
      }
    }
  };

  return (
    <Box sx={{ flex: 1, m: 2 }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleUpdatePassword();
        }}
      >
        <Card>
          <CardHeader title="Đổi mật khẩu" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
              <FormControl fullWidth>
                <InputLabel>Mật khẩu hiện tại</InputLabel>
                <OutlinedInput
                  label="Mật khẩu hiện tại"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        edge="end"
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Mật khẩu mới</InputLabel>
                <OutlinedInput
                  label="Mật khẩu mới"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Nhập lại mật khẩu mới</InputLabel>
                <OutlinedInput
                  label="Nhập lại mật khẩu mới"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit">Update</Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
