import { projects, allItems } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata = { title: "사례 — 스펙북" };

export default function ProjectsPage() {
  const types = Array.from(new Set(projects.map((p) => p.useType)));
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight">올라와 있는 스펙북</h1>
      <p className="mt-2 text-[15px] text-ink-2">
        사례 {projects.length}건, 사양 항목 {allItems.length}개. 사진·코드·일반 명칭은 무료, 제조사·모델·시공 메모는 구매·구독.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 text-[13.5px]">
        <span className="rounded-full bg-ink px-3 py-1 text-paper">전체</span>
        {types.map((t) => (
          <span key={t} className="rounded-full border border-line px-3 py-1 text-ink-2">
            {t}
          </span>
        ))}
        <span className="self-center text-[12.5px] text-ink-3">필터는 시연에서 비활성</span>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
