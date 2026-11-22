'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import NoImage from '../../public/images/NoImage.svg';

type LinkThumbnailProps = {
  src: string | null | undefined;
  className?: string;
  alt?: string;
};

// 링크 미리보기 이미지. 주소가 없거나 외부 사이트가 이미지를 막아 불러오지 못하면 기본 이미지를 보여 준다.
export default function LinkThumbnail({ src, className, alt = '' }: LinkThumbnailProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <Image
      src={!src || failed ? NoImage : src}
      alt={alt}
      width={340}
      height={200}
      className={className}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
