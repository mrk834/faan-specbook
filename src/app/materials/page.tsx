import Link from "next/link";
import { materials, SURFACE_ORDER } from "@/lib/data";
import { HexTag } from "@/components/HexTag";

export const metadata = { title: "자재 색인 — 스펙북" };

export default function MaterialsPage() {
  const groups = SURFACE_ORDER.map((s) => ({ surface: s, list: materials.filter((m) => m.surface === s) })).filter(
    (g) => g.list.length,
  );
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight">자재 색인</h1>
      <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-ink-2">
        모든 사례의 태그를 자재 단위로 모았습니다. 자재를 고르면 그 자재가 쓰인 장면과 위치가 나옵니다. 지금은 {materials.length}종.
      </p>
      <div className="mt-8 space-y-10">
        {groups.map((g) => (
          <div key={g.surface}>
            <h2 className="flex items-baseline gap-3 text-[18px] font-semibold">
              {g.surface}
              <span className="text-[13px] font-normal text-ink-3">{g.list.length}종</span>
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.list.map((m) => {
                const projectCount = new Set(m.items.map((i) => i.projectSlug)).size;
                return (
                  <li key={m.slug}>
                    <Link href={`/materials/${m.slug}/`} className="block rounded-lg border border-line p-4 hover:border-ink/50">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[15px] font-medium">{m.name}</p>
                          <p className="mt-0.5 text-[13px] text-ink-2">{m.category}</p>
                        </div>
                        <span className="shrink-0 text-[12.5px] text-ink-3">
                          {projectCount}개 사례 · {m.items.length}곳
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.items.slice(0, 4).map((i) => (
                          <HexTag key={i.id} code={i.code} tone="paper" />
                        ))}
                      </div>
                      {m.summary && <p className="mt-2 text-[13px] text-ink-2">{m.summary}</p>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
