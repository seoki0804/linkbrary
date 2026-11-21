'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '../../public/icons/logo.svg';
import Profile from '../../public/icons/profile.svg';
import { useAuth } from '@/utils/AuthContext';

export default function Header() {
  const { user, accessToken, ready, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="flex w-full items-center justify-between bg-[#F0F6FF] px-[32.5px] py-[32px] md:py-[38.5px]">
      <Link href={accessToken ? '/links' : '/'} aria-label="Linkbrary 홈" className="h-[16px] w-[88px] md:h-[24px] md:w-[133px]">
        <Image src={Logo} alt="Linkbrary" width={133} height={24} priority />
      </Link>
      {ready && (
        <nav className="flex items-center gap-3 md:gap-6">
          {accessToken ? (
            <>
              <Link
                href="/favorite"
                className="flex h-[30px] items-center justify-center rounded-[4px] border border-[var(--primary)] px-3 text-[12px] font-medium md:h-[37px] md:text-[14px]"
              >
                <span className="mr-1" aria-hidden>
                  ⭐️
                </span>
                즐겨찾기
              </Link>
              <span className="flex items-center gap-2">
                <Image src={Profile} alt="" width={28} height={28} />
                <span className="hidden text-[14px] font-medium md:inline">{user?.name}</span>
              </span>
              <button
                type="button"
                className="text-[13px] text-[#6B6B6B] hover:text-black md:text-[14px]"
                onClick={() => {
                  logout();
                  router.push('/');
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-[8px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] px-5 py-2.5 text-[14px] font-semibold text-white">
              로그인
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
