'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Logo from '../../../public/icons/logo.svg';
import NoImage from '../../../public/images/NoImage.svg';
import { getFolderById, getLinksByFolderId } from '@/api/api';
import { FolderResponse, LinkResponse } from '@/types/api';
import { formatUpdatedAt } from '@/utils/date';
import { LinkData } from '@/utils/LinkData';

const PAGE_SIZE = 30;

export default function SharePage() {
  return (
    <Suspense fallback={null}>
      <SharedFolder />
    </Suspense>
  );
}

/** 폴더 공유 링크로 들어온 사람이 로그인 없이 보는 읽기 전용 화면 */
function SharedFolder() {
  const folderId = Number(useSearchParams().get('folder'));
  const [folder, setFolder] = useState<FolderResponse | null>(null);
  const [links, setLinks] = useState<LinkResponse[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!folderId) {
      setError('공유 주소가 올바르지 않습니다.');
      return;
    }
    Promise.all([getFolderById(folderId), getLinksByFolderId(folderId, 1, PAGE_SIZE)])
      .then(([f, data]) => {
        // 폴더 조회는 배열로 오기도 해서 첫 항목을 쓴다.
        setFolder(Array.isArray(f) ? f[0] : f);
        const list = Array.isArray(data) ? data : (data as { list?: LinkResponse[] }).list ?? [];
        setLinks(list);
      })
      .catch(() => setError('폴더를 찾을 수 없습니다. 삭제되었거나 주소가 바뀌었을 수 있습니다.'));
  }, [folderId]);

  return (
    <>
      <header className="flex items-center justify-between bg-[#F0F6FF] px-[32.5px] py-[32px]">
        <Link href="/" aria-label="Linkbrary 홈">
          <Image src={Logo} alt="Linkbrary" width={133} height={24} priority />
        </Link>
        <Link href="/signup" className="rounded-[8px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] px-5 py-2.5 text-[14px] font-semibold text-white">
          나도 링크 모으기
        </Link>
      </header>

      <section className="bg-[#F0F6FF] px-5 pb-[60px] pt-[20px] text-center">
        <p className="text-[14px] text-[#6B6B6B]">공유된 폴더</p>
        <h1 className="mt-2 text-[32px] font-semibold text-[#111322] md:text-[40px]">{folder?.name ?? ' '}</h1>
        {links && <p className="mt-2 text-[14px] text-[#6B6B6B]">링크 {links.length}개</p>}
      </section>

      <main className="mx-auto max-w-[1060px] px-5 py-[40px]">
        {error && <p className="text-center text-[#6B6B6B]">{error}</p>}
        {!error && links === null && (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="h-[334px] animate-pulse rounded-lg bg-[#E7EFFB]" />
            ))}
          </ul>
        )}
        {links && links.length === 0 && <p className="text-center text-[#6B6B6B]">아직 저장된 링크가 없습니다.</p>}
        {links && links.length > 0 && (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <li key={link.id} className="overflow-hidden rounded-lg border bg-white shadow-lg transition hover:-translate-y-0.5">
                <a href={LinkData(link.url) ? link.url : `https://${link.url}`} target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                    src={link.imageSource || NoImage}
                    alt=""
                    width={340}
                    height={200}
                    className="h-[200px] w-full object-cover"
                    unoptimized
                  />
                  <div className="p-4">
                    <p className="text-[13px] text-[#666666]">{formatUpdatedAt(link.createdAt)}</p>
                    {link.title && <p className="mt-2 line-clamp-1 font-semibold text-black">{link.title}</p>}
                    <p className="mt-1 line-clamp-2 text-[15px] text-[#333236]">{link.description || link.url}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
