'use client';
import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { postSignIn, getUser } from '../api/api';
import { UserResponse } from '../types/api';

interface AuthContextType {
  accessToken: string | null;
  user: UserResponse | null;
  /** 저장된 로그인 정보를 읽기 전에는 false */
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [ready, setReady] = useState(false);

  // 새로고침해도 로그인이 유지되도록 저장된 토큰과 사용자 정보를 불러온다.
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');
    if (token) setAccessToken(token);
    if (savedUser) setUser(JSON.parse(savedUser) as UserResponse);
    setReady(true);
  }, []);

  // 실패하면 예외를 그대로 던져서 로그인 화면이 오류 문구를 보여 줄 수 있게 한다.
  const login = useCallback(async (email: string, password: string) => {
    const response = await postSignIn(email, password);
    if (!response.accessToken) throw new Error('로그인 응답에 토큰이 없습니다.');
    localStorage.setItem('accessToken', response.accessToken);
    setAccessToken(response.accessToken);
    const userData = await getUser();
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, ready, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 내에서 사용하세요.');
  return context;
};

/** 로그인이 필요한 화면을 감싼다. 로그인하지 않았으면 로그인 화면으로 보내고, 로그인하면 돌아온다. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { accessToken, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !accessToken) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, accessToken, router, pathname]);

  if (!ready || !accessToken) return null;
  return <>{children}</>;
}
