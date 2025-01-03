'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [message,setmessage] = React.useState("")
  // Sử dụng useRef để giữ tham chiếu đến EventSource
  const eventSourceRef = React.useRef<EventSource | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      if (isPending) return; // Ngăn gọi API khi đang tải
      setIsPending(true);
      try {
        const { error } = await authClient.signInWithPassword(values);
        if (error) {
          setError('root', { type: 'server', message: error });
          toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại!', { position: 'top-center' });
          return;
        }

      
        await checkSession?.();
        toast.success('Xin chào!', { position: 'top-center' });
        // Gọi SSE sau khi đăng nhập thành công
        eventSourceRef.current = new EventSource('http://localhost:8080/api/v1/notifications/subscribe',{
          withCredentials:true
        });
       console.log(eventSourceRef.current)
        eventSourceRef.current.onmessage = (event) => {
          setmessage(event.data)
          console.log('SSE Message:', message);
        };
  
        eventSourceRef.current.onerror = () => {
          console.error('SSE encountered an error.');
          eventSourceRef.current?.close();
        };
        // Refresh the auth state
     

        // Chuyển hướng hoặc refresh
        router.refresh();
      } catch (err) {
        console.error('Unexpected error during login:', err);
        toast.error('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại!', { position: 'top-center' });
      } finally {
        setIsPending(false);
      }
    },
    [checkSession, router, setError]
  );

  // Dọn dẹp kết nối SSE khi component bị unmount

  return (
    <>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h4">Đăng nhập</Typography>
          <Typography color="text.secondary" variant="body2">
            Bạn chưa có tài khoản?{' '}
            <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
              Đăng ký
            </Link>
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput {...field} label="Email" type="email" />
                  {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    endAdornment={
                      showPassword ? (
                        <EyeIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeSlashIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={() => setShowPassword(true)}
                        />
                      )
                    }
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit" variant="contained">
              Đăng nhập
            </Button>
          </Stack>
        </form>
        <Alert severity="info">Ứng dụng dành cho cán bộ và giáo viên nhà trường</Alert>
      </Stack>
      <ToastContainer />
    </>
  );
}
