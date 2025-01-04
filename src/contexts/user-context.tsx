'use client';

import * as React from 'react';
import { useSnackbar } from 'notistack';
import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';


export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {

  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();
      
      // if(data){
      //     // Gọi SSE sau khi đăng nhập thành công
      //         const eventSource = new EventSource(
      //           'http://localhost:8080/api/v1/notifications/subscribe',
      //           { withCredentials: true }
      //         );
        
      //         eventSourceRef.current = eventSource; // Lưu tham chiếu để cleanup sau này
        
      //         eventSource.onopen = () => {
      //           console.log('SSE connection established.');
      //         };
        
      //         eventSource.onmessage = (event) => {
      //           enqueueSnackbar(`New message: ${event.data}`, { variant: 'info' }); // Hiển thị toast
      //           console.log('SSE Message:', event.data);
      //         };
        
      //         eventSource.onerror = (err) => {
      //           console.error('SSE encountered an error:', err);
      //           eventSourceRef.current?.close();
      //         };
      // }
      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }

      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);
  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children} </UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
