'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import { Radio, RadioGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { toast } from 'react-toastify';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  username: zod.string().min(1, { message: 'First name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  role: zod.string().min(1, { message: 'Role name is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: '', email: '', password: '', role: '' } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const { error } = await authClient.signUp(values);

      if (error) {
        toast.error('Đăng ký thất bại: ' + error);
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Hiển thị thông báo thành công
      toast.success('Đăng ký tài khoản thành công!');

      // Refresh the auth state
      await checkSession?.();

      // Chuyển hướng sang trang đăng nhập 
      
        router.push(paths.auth.signIn);
     

      setIsPending(false);
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Đăng ký</Typography>
        <Typography color="text.secondary" variant="body2">
          Bạn đã có tài khoản?{' '}
          <RouterLink href={paths.auth.signIn}>
            <Typography component="span" variant="subtitle2" color="primary" sx={{ cursor: 'pointer' }}>
              Đăng nhập
            </Typography>
          </RouterLink>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <FormControl error={Boolean(errors.username)}>
                <InputLabel>Tên người dùng</InputLabel>
                <OutlinedInput {...field} label="Tên người dùng" />
                {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <FormControl error={Boolean(errors.role)}>
                <Typography>Vai trò</Typography>
                <RadioGroup {...field} row>
                  <FormControlLabel value="ROLE_ADMIN" control={<Radio />} label="Quản lý (Admin)" />
                  <FormControlLabel value="ROLE_USER" control={<Radio />} label="Giáo viên (User)" />
                </RadioGroup>
                {errors.role ? <FormHelperText>{errors.role.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Mật khẩu</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Button disabled={isPending} type="submit" variant="contained">
            Đăng ký
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
