import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 text-[13px] text-ink-2 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-semibold text-ink">스펙북</p>
          <p className="mt-2 max-w-[36ch] leading-relaxed">
            건축가와 인테리어 디자이너의 스펙북을 열어, 완공 사진의 모든 요소를 사양으로 연결합니다.
          </p>
        </div>
        <div>
          <p className="font-semibold text-ink">이 사이트는 시연용입니다</p>
          <p className="mt-2 max-w-[40ch] leading-relaxed">
            사진은 Wikimedia Commons의 CC 라이선스 실사진이고, 제조사·모델·가격 등 사양 데이터는 전부 가상입니다.
            결제도 실제로 일어나지 않습니다.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Link href="/about/" className="hover:text-ink">기획 초안과 질문</Link>
          <Link href="/credits/" className="hover:text-ink">사진 출처</Link>
          <a href="https://github.com/mrk834/faan-specbook" className="hover:text-ink">GitHub</a>
          <p className="mt-3 text-ink-3">v0.1 · 2026-10-29</p>
        </div>
      </div>
    </footer>
  );
}
