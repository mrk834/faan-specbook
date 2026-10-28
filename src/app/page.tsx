import Link from "next/link";
import { projects, materials, allItems, getProject } from "@/lib/data";
import { HotspotViewer } from "@/components/HotspotViewer";
import { ProjectCard } from "@/components/ProjectCard";
import { HexTag } from "@/components/HexTag";

export default function Home() {
  const hero = getProject("schweikher-house")!;
  const heroPhoto = hero.photos.filter((p) => p.id === "living");
  const shared = materials.filter((m) => new Set(m.items.map((i) => i.projectSlug)).size > 1 || m.items.length > 1).slice(0, 5);

  return (
    <>
      {/* 히어로: 제품 그 자체 — 태그가 붙은 완공 사진 */}
      <section className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h1 className="text-[34px] font-semibold leading-[1.15] tracking-tight sm:text-[44px]">
              사진 속 그 벽돌은
              <br />
              스펙북의 <HexTag code="WL-01" tone="tag" size="md" className="align-[6px]" /> 입니다.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-ink-2">
              건축가와 인테리어 디자이너는 공사가 끝나면 스펙북을 남깁니다. 어떤 타일, 어떤 수전, 어떤 창호를 어떻게
              시공했는지 전부 적힌 문서인데, 완공과 함께 서랍에 들어갑니다. 스펙북은 그 문서를 열어 완공 사진의 모든
              요소에 연결합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects/"
                className="inline-flex h-11 items-center rounded-md bg-ink px-5 text-[15px] font-medium text-paper hover:bg-ink-2"
              >
                사례 둘러보기
              </Link>
              <Link
                href="/upload/"
                className="inline-flex h-11 items-center rounded-md border border-line px-5 text-[15px] font-medium hover:bg-paper-2"
              >
                내 스펙북 올리기
              </Link>
            </div>
            <p className="mt-5 text-[13px] text-ink-3">오른쪽 사진의 태그를 눌러 보세요.</p>
          </div>
          <div>
            <HotspotViewer project={hero} photos={heroPhoto} mode="hero" />
          </div>
        </div>
      </section>

      {/* 문제 → 전환 */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight">스펙북에는 다 있습니다</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              실별 마감표, 창호·조명·위생기구 일람표, 붙박이 가구 상세도, 제조사 사양서. 한 건물을 똑같이 다시 지을 수
              있는 유일한 문서입니다.
            </p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight">그런데 아무도 못 봅니다</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              사진은 잡지와 SNS에 돌아다니지만 사양은 설계사무소 서버에 남습니다. 그 타일이 어디 것인지 알려면 아는
              사람에게 물어보는 수밖에 없습니다.
            </p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight">사진과 사양을 다시 붙입니다</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              오늘의집이 소품에 구매 링크를 다는 것처럼, 스펙북은 벽·바닥·창호·설비에 설계자가 확인한 사양을 답니다.
              설계자는 문서를 팔고, 보는 사람은 답을 삽니다.
            </p>
          </div>
        </div>
      </section>

      {/* 동작 방식 — 실제 순서이므로 번호를 쓴다 */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <h2 className="text-[26px] font-semibold tracking-tight">이렇게 돌아갑니다</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            {
              n: "1",
              t: "스펙북을 올립니다",
              d: "PDF·엑셀·도면을 그대로 올리면 마감표와 일람표에서 사양 항목을 뽑아 코드별로 정리합니다.",
            },
            {
              n: "2",
              t: "사진에 연결합니다",
              d: "완공 사진 위에 마감 코드 태그를 찍습니다. 설계자가 직접 확인한 연결만 '검증됨'으로 표시됩니다.",
            },
            {
              n: "3",
              t: "열람·구매가 일어납니다",
              d: "누구나 사진과 코드, 일반 명칭까지는 무료로 봅니다. 제조사·모델·시공 메모는 구매나 구독으로 엽니다.",
            },
            {
              n: "4",
              t: "수익이 돌아갑니다",
              d: "판매액의 70%가 업로더에게 정산됩니다. 비율은 검토 중인 초안값입니다.",
            },
          ].map((s) => (
            <li key={s.n} className="rounded-lg border border-line p-5">
              <span className="font-mono text-[13px] text-tag">{s.n}</span>
              <h3 className="mt-2 text-[17px] font-semibold">{s.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 사례 */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[26px] font-semibold tracking-tight">올라와 있는 스펙북</h2>
            <p className="mt-2 text-[15px] text-ink-2">
              사례 {projects.length}건 · 사양 항목 {allItems.length}개 · 시연용 데이터
            </p>
          </div>
          <Link href="/projects/" className="text-[14px] font-medium text-tag hover:underline">
            전체 보기
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* 역방향: 자재 → 장면 */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 className="text-[26px] font-semibold tracking-tight">거꾸로도 갑니다</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              모든 태그는 자재 색인에 모입니다. 자재 하나를 고르면 그 자재가 쓰인 장면이 사례를 가로질러 나오고, 지도에서
              어디에 있는지도 보입니다. 같은 타일을 홈오피스에서는 차콜로, 클리닉에서는 회색으로 쓴 것까지 비교할 수
              있습니다.
            </p>
            <Link href="/materials/" className="mt-5 inline-block text-[14px] font-medium text-tag hover:underline">
              자재 색인 열기
            </Link>
          </div>
          <ul className="divide-y divide-line rounded-lg border border-line">
            {shared.map((m) => {
              const projectCount = new Set(m.items.map((i) => i.projectSlug)).size;
              return (
                <li key={m.slug}>
                  <Link href={`/materials/${m.slug}/`} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-paper-2">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-medium">{m.name}</p>
                      <p className="truncate text-[13px] text-ink-2">
                        {m.category} · {m.surface}
                        {m.summary ? ` · ${m.summary}` : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {m.items.slice(0, 3).map((i) => (
                        <HexTag key={i.id} code={i.code} tone="paper" />
                      ))}
                      <span className="ml-1 text-[12.5px] text-ink-3">
                        {projectCount}개 사례
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 피드백 요청 */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <div className="rounded-lg bg-paper-2 p-8 sm:p-10">
          <h2 className="text-[22px] font-semibold tracking-tight">이 시안은 첫 번째 초안입니다</h2>
          <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-ink-2">
            개별 구매와 구독 중 무엇이 맞는지, 업로더 배분율을 얼마로 할지, 설계자가 정말 스펙북을 공개하려 할지 같은
            질문이 열려 있습니다. 기획 초안 페이지에 결정이 필요한 항목과 묻고 싶은 질문을 정리했습니다.
          </p>
          <Link href="/about/" className="mt-5 inline-flex h-10 items-center rounded-md bg-ink px-4 text-[14px] font-medium text-paper hover:bg-ink-2">
            기획 초안 읽기
          </Link>
        </div>
      </section>
    </>
  );
}
