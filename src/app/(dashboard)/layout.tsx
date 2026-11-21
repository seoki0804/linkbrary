import Header from '@/components/Header';
import { RequireAuth } from '@/utils/AuthContext';

// 루트 레이아웃이 이미 <html>·<body>를 그리므로 여기서는 내용만 감싼다.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <RequireAuth>{children}</RequireAuth>
      </main>
    </>
  );
}
