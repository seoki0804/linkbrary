import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="mx-auto max-w-[720px] px-5 py-[80px] leading-relaxed text-[#373740]">
      <Link href="/" className="text-[14px] text-[#6D6AFE]">
        ← Linkbrary
      </Link>
      <h1 className="mt-6 text-[32px] font-semibold text-black">개인정보 처리 안내</h1>
      <p className="mt-8">
        Linkbrary는 코드잇이 제공하는 학습용 API 위에서 동작하는 데모 서비스입니다. 회원가입 때 입력한 이메일·이름과
        저장한 폴더·링크는 이 API 서버에 저장되며, 서비스 화면을 보여 주는 용도로만 씁니다.
      </p>
      <p className="mt-4">
        로그인 정보(액세스 토큰)는 브라우저의 로컬 저장소에만 보관하고, 로그아웃하면 지웁니다. 공유한 폴더는 공유
        주소를 아는 사람이 로그인 없이 볼 수 있습니다.
      </p>
    </main>
  );
}
