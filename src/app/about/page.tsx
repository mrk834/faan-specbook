import Link from "next/link";

export const metadata = { title: "기획 초안 — 스펙북" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[760px] px-4 py-10 sm:px-6">
      <p className="text-[13px] text-ink-3">기획 초안 v0.1 · 2026-10-29</p>
      <h1 className="mt-2 text-[32px] font-semibold leading-tight tracking-tight">
        스펙북: 완공 사진을 사양서로 연결하는 전문가 아카이브
      </h1>

      <Section title="한 문장">
        건축가·인테리어 디자이너가 공사 후 작성하는 스펙북(마감표·일람표·상세도·제조사 사양서)을 올리고, 완공 사진의 각 요소를 그
        사양에 연결해, 보는 사람은 답을 사고 올린 사람은 수익을 가져가는 플랫폼.
      </Section>

      <Section title="왜 지금 비어 있나">
        <ul className="list-disc space-y-2 pl-5">
          <li>오늘의집·Houzz의 사진 태그는 자사가 파는 상품으로, Pinterest는 비슷한 상품으로, ArchDaily는 브랜드 이름 목록으로만 연결한다. 설계자가 확인한 실제 시공 사양(모델·색상·시공법)으로 연결하는 곳은 없다.</li>
          <li>스펙북은 설계사무소 서버에 남고 건물은 사진으로만 돌아다닌다. 정보는 존재하지만 폐쇄적이다.</li>
          <li>해외 전문가용 자재 플랫폼(Material Bank 등)은 설계자 무료·제조사 과금 모델로 큰 사업이 됐다. 사진과 사양의 연결이라는 자산은 아직 누구도 쌓지 않았다.</li>
        </ul>
      </Section>

      <Section title="핵심 객체">
        <ul className="list-disc space-y-2 pl-5">
          <li><b>스펙북</b> — 한 건물의 문서 묶음. 업로더가 가격·공개 범위·권리를 설정.</li>
          <li><b>사양 항목</b> — 도면 코드(FL-01, WL-02…) 단위. 공개 필드(실·부위·분류·일반 명칭·색)와 잠금 필드(제조사·모델·규격·시공 메모·상세도·공급처·단가)로 나뉜다.</li>
          <li><b>사진 앵커</b> — 사진 위 좌표와 사양 항목의 연결. 설계자가 직접 찍으면 &lsquo;검증됨&rsquo;.</li>
          <li><b>자재 색인</b> — 사례를 가로질러 같은 자재를 모은 역방향 입구. 장면·지도·사례별 비교가 여기서 나온다.</li>
        </ul>
      </Section>

      <Section title="이 시안이 보여주는 것">
        <ul className="list-disc space-y-2 pl-5">
          <li>사진 → 태그 → 사양 (잠금 전·후 화면 모두, 구매 시뮬레이션 버튼으로 전환)</li>
          <li>자재 → 장면 → 지도 (역방향 탐색)</li>
          <li>업로드 4단계: 문서 → 사진 연결 → 가격·공개 범위 → 권리 확인</li>
          <li>이용 방식 A안(개별 구매)·B안(구독)과 배분율 세 가지 안</li>
        </ul>
        <p className="mt-3 text-ink-2">
          넣지 않은 것: 실제 로그인·결제·업로드 처리, 문서에서 항목을 자동 추출하는 기능, 제조사 리드 판매, 검색.
        </p>
      </Section>

      <Section title="교수님께 여쭙고 싶은 것">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <b>스펙북의 실제 모양.</b> 사무소마다 마감표·일람표의 열 구성이 다릅니다. 실제 스펙북 2~3부를 보여주실 수 있을까요? 데이터 모델을 거기에 맞추겠습니다.
          </li>
          <li>
            <b>공개 의향.</b> 설계자가 자기 스펙북을 공개하고 팔려고 할까요? 어떤 조건(익명·일부만·준공 N년 후)이면 가능할지, 반대로 절대 안 되는 이유는 무엇인지 듣고 싶습니다.
          </li>
          <li>
            <b>첫 사용자.</b> 돈을 낼 사람이 실무 설계자인지, 건축주·창업자인지, 학생인지에 따라 가격과 화면이 달라집니다. 어느 쪽부터 시작해야 할까요?
          </li>
          <li>
            <b>권리 문제.</b> 설계도서 저작권(설계자)과 건축주 이용권, 시공사의 상세도, 제조사 사양서 재배포. 업로드 시 세 가지 확인으로 충분할지, 학교·협회 차원의 가이드가 있는지요.
          </li>
          <li>
            <b>초기 콘텐츠.</b> 아파트 마감자재 목록표(주택법 제54조, 제조사·모델명 수준)를 시드 콘텐츠로 쓰는 안과, 졸업 설계·학교 프로젝트의 스펙북을 모으는 안 중 어느 쪽이 현실적일까요?
          </li>
        </ol>
      </Section>

      <Section title="결정이 필요한 항목">
        <table className="w-full text-[14px]">
          <tbody>
            {[
              ["이용 방식", "A 개별 구매 / B 구독 / 둘 다", "시안은 둘 다 노출"],
              ["업로더 배분율", "70% / 50% / 50%+직접유입 85%", "시안은 70%"],
              ["단가 공개", "비공개 기본 / 범위 / 공개", "시안은 업로더 선택"],
              ["위치 공개", "시·구까지 / 정확한 위치", "시안은 시·구 기본"],
              ["이름", "스펙북 / 다른 이름", "가칭"],
            ].map(([k, o, s]) => (
              <tr key={k} className="border-t border-line">
                <td className="py-2.5 pr-3 font-medium">{k}</td>
                <td className="py-2.5 pr-3 text-ink-2">{o}</td>
                <td className="py-2.5 text-ink-3">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="다음 단계">
        <ol className="list-decimal space-y-2 pl-5">
          <li>교수님 피드백 반영 → 시안 v0.2</li>
          <li>실제 스펙북 1부로 데이터 모델 검증 (가상 데이터 → 실데이터 1건)</li>
          <li>설계자 10명 업로드 의향 인터뷰</li>
          <li>로그인·업로드·결제 붙인 MVP (Next.js + Supabase)</li>
        </ol>
      </Section>

      <p className="mt-12 text-[13.5px] text-ink-2">
        사진 출처는 <Link href="/credits/" className="text-tag hover:underline">여기</Link>에 있습니다. 모든 사양 데이터는 시연용 가상값입니다.
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[20px] font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 text-[15.5px] leading-[1.75]">{children}</div>
    </section>
  );
}
