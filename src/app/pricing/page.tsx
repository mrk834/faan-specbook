"use client";

import Link from "next/link";
import { projects, REVENUE_SHARE, SUBSCRIPTION } from "@/lib/data";
import { won } from "@/lib/base";
import { useUnlock } from "@/components/unlock";

export default function PricingPage() {
  const { subscribed, setSubscribed, purchased, reset } = useUnlock();
  const avg = Math.round(projects.reduce((a, p) => a + p.price, 0) / projects.length);

  return (
    <section className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight">이용 방식</h1>
      <p className="mt-2 max-w-[66ch] text-[15px] leading-relaxed text-ink-2">
        두 안을 나란히 두고 검토 중입니다. 사진·코드·일반 명칭과 자재 색인은 어느 쪽이든 무료이고, 차이는 잠금 필드(제조사·모델·시공
        메모·상세도·사양서 PDF)를 어떻게 여느냐입니다.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-line p-6">
          <p className="text-[13px] text-ink-2">A안</p>
          <h2 className="mt-1 text-[22px] font-semibold tracking-tight">스펙북 개별 구매</h2>
          <p className="mt-1 text-[14px] text-ink-2">업로더가 가격을 정합니다. 현재 {won(19000)}~{won(149000)}, 평균 {won(avg)}.</p>
          <ul className="mt-5 space-y-2 text-[14.5px]">
            <li>한 건물의 스펙북 전체를 영구 소장</li>
            <li>상세도·제조사 사양서 PDF 다운로드</li>
            <li>업로더 개정 시 무료 업데이트</li>
            <li>업로더 몫 {Math.round(REVENUE_SHARE * 100)}% — 어떤 스펙북이 팔렸는지 명확</li>
          </ul>
          <p className="mt-5 text-[13.5px] leading-relaxed text-ink-2">
            맞는 사람: 특정 건물을 참고해 설계·시공하려는 실무자, 건축주. 약점: 사진 한 장 보다가 태그 하나 열려고 5만 원을 내기는
            어렵다.
          </p>
          <p className="mt-4 text-[13px] text-ink-3">사례 페이지의 구매 버튼으로 체험 (현재 {purchased.length}권 구매 상태)</p>
        </div>

        <div className="rounded-lg border border-ink p-6">
          <p className="text-[13px] text-ink-2">B안</p>
          <h2 className="mt-1 text-[22px] font-semibold tracking-tight">월 구독</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            월 {won(SUBSCRIPTION.monthly)} · 매달 {SUBSCRIPTION.booksPerMonth}권까지 전체 열람, 태그 단위 열람은 무제한.
          </p>
          <ul className="mt-5 space-y-2 text-[14.5px]">
            <li>사진의 어떤 태그든 바로 열어 봄 (탐색용)</li>
            <li>월 {SUBSCRIPTION.booksPerMonth}권은 PDF까지 다운로드</li>
            <li>자재 색인에서 사례 간 사양 비교 전체 열람</li>
            <li>업로더 몫은 구독료 풀을 열람 비중대로 배분</li>
          </ul>
          <p className="mt-5 text-[13.5px] leading-relaxed text-ink-2">
            맞는 사람: 자료를 자주 찾아보는 설계사무소·학생. 약점: 열람 비중 배분은 계산이 복잡하고, 초기에 콘텐츠가 적으면 구독할
            이유가 약하다.
          </p>
          <button
            type="button"
            onClick={() => setSubscribed(!subscribed)}
            className={`mt-4 inline-flex h-10 items-center rounded-md px-4 text-[14px] font-medium ${
              subscribed ? "border border-line bg-paper hover:bg-paper-2" : "bg-ink text-paper hover:bg-ink-2"
            }`}
          >
            {subscribed ? "구독 체험 끄기" : "구독 체험 켜기 (결제 없음)"}
          </button>
        </div>
      </div>

      <div className="mt-10 rounded-lg bg-paper-2 p-6">
        <h2 className="text-[18px] font-semibold tracking-tight">수익 배분, 어디에 둘까</h2>
        <div className="mt-4 grid gap-4 text-[14px] md:grid-cols-3">
          <div>
            <p className="font-medium">초안: 업로더 70%</p>
            <p className="mt-1 leading-relaxed text-ink-2">스펙북은 업로더가 수년간 만든 문서이고, 플랫폼은 유통만 한다는 관점.</p>
          </div>
          <div>
            <p className="font-medium">벤치마크: 50% 안팎</p>
            <p className="mt-1 leading-relaxed text-ink-2">Envato 50%, Adobe Stock 33%, 미국 주택 도면 퍼블리셔 25~30%. 직접 판매(Gumroad)는 약 90%.</p>
          </div>
          <div>
            <p className="font-medium">절충: 50% + 직접 유입 85%</p>
            <p className="mt-1 leading-relaxed text-ink-2">업로더가 자기 SNS·포트폴리오에서 끌어온 구매는 85%, 플랫폼 탐색으로 생긴 구매는 50%.</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-[18px] font-semibold tracking-tight">세 번째 수익원 (검토)</h2>
        <p className="mt-2 max-w-[70ch] text-[14.5px] leading-relaxed text-ink-2">
          해외 전문가용 자재 플랫폼은 설계자에게 무료이고 제조사가 돈을 냅니다. 스펙북에서도 &lsquo;이 타일이 어떤 사례에 쓰였나&rsquo;는
          제조사에게 가장 좋은 포트폴리오입니다. 자재 색인 페이지의 제조사 공식 링크·샘플 신청을 유료 리드로 두면 열람자 결제
          부담을 낮출 수 있습니다. 1차 시안에는 넣지 않았습니다.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4 text-[13.5px]">
        <Link href="/projects/" className="font-medium text-tag hover:underline">사례에서 체험하기</Link>
        <button type="button" onClick={reset} className="text-ink-3 hover:text-ink">체험 상태 초기화</button>
      </div>
    </section>
  );
}
