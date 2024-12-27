
import type { User } from '@/types/user';

const API_URL = "http://localhost:8080/api";

export interface SignUpParams {
  username: string;
  email: string;
  role: string;
  password: string;
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.detail };
      }

      return {};
    } catch (error) {
      return { error: 'An error occurred during sign-up' };
    }
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ data?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Sign-in failed' };
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      return { data };
    } catch (error) {
      return { error: 'An error occurred during sign-in' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Sign-out failed' };
      }

      localStorage.removeItem('user');
      return {};
    } catch (error) {
      return { error: 'An error occurred during sign-out' };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        return { data: null };
      }
      return { data: JSON.parse(user) };
    } catch (error) {
      return { error: 'An error occurred while fetching user data' };
    }
  }

  async refreshToken(): Promise<{ error?: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Refresh token failed' };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: 'An error occurred during token refresh' };
    }
  }

  async getMyInfo(): Promise<{ data?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/v1/user/my-info`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Failed to fetch user info' };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: 'An error occurred while fetching user info' };
    }
  }
}

export const authClient = new AuthClient();
