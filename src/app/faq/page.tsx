import Link from 'next/link';

const QA = [
  ['링크는 어떻게 저장하나요?', '링크 페이지 위쪽 입력칸에 주소를 붙여 넣고 추가하기를 누른 뒤, 넣을 폴더를 고르면 됩니다.'],
  ['폴더는 몇 개까지 만들 수 있나요?', '제한 없이 만들 수 있고, 폴더 이름은 언제든 바꾸거나 지울 수 있습니다.'],
  ['다른 사람에게 폴더를 보여 줄 수 있나요?', '폴더를 고른 뒤 공유를 누르면 공유 주소가 만들어집니다. 받은 사람은 로그인하지 않아도 그 폴더의 링크를 볼 수 있습니다.'],
  ['즐겨찾기는 어디서 보나요?', '카드의 별을 누르면 즐겨찾기에 들어가고, 위쪽의 즐겨찾기 메뉴에서 모아 볼 수 있습니다.'],
];

export default function Faq() {
  return (
    <main className="mx-auto max-w-[720px] px-5 py-[80px]">
      <Link href="/" className="text-[14px] text-[#6D6AFE]">
        ← Linkbrary
      </Link>
      <h1 className="mt-6 text-[32px] font-semibold">자주 묻는 질문</h1>
      <dl className="mt-10 divide-y divide-[#CCD5E3] border-y border-[#CCD5E3]">
        {QA.map(([q, a]) => (
          <div key={q} className="py-6">
            <dt className="font-semibold">{q}</dt>
            <dd className="mt-2 leading-relaxed text-[#373740]">{a}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
