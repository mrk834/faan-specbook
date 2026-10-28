import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, itemsOf } from "@/lib/data";
import { ProjectViewer } from "@/components/ProjectViewer";
import { ScheduleTable } from "@/components/ScheduleTable";
import { PurchaseBox } from "@/components/PurchaseBox";
import { MapView } from "@/components/MapView";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — 스펙북` : "스펙북" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const items = itemsOf(project.slug);
  const pageCount = project.sections.reduce((a, s) => a + s.pages, 0);

  return (
    <article className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <nav className="text-[13px] text-ink-3">
        <Link href="/projects/" className="hover:text-ink">사례</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-2">{project.useType}</span>
      </nav>

      <header className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[70ch]">
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight sm:text-[34px]">{project.title}</h1>
          <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{project.subtitle}</p>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13.5px] text-ink-2">
            <div><dt className="inline text-ink-3">위치 </dt><dd className="inline">{project.location.label}</dd></div>
            <div><dt className="inline text-ink-3">준공 </dt><dd className="inline">{project.year}</dd></div>
            <div><dt className="inline text-ink-3">규모 </dt><dd className="inline">{project.area}</dd></div>
            <div><dt className="inline text-ink-3">설계 </dt><dd className="inline">{project.designer}</dd></div>
          </dl>
        </div>
      </header>

      {project.realBuilding && (
        <p className="mt-5 rounded-md border border-line bg-paper-2 px-4 py-2.5 text-[13px] text-ink-2">
          실존 건물의 사진(CC 라이선스)을 썼지만, 아래 사양 데이터는 전부 시연용 가상값입니다. 실제 건물의 마감과 무관합니다.
        </p>
      )}

      <section className="mt-8">
        <ProjectViewer project={project} />
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <h2 className="text-[22px] font-semibold tracking-tight">마감표</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            사진에 태그된 항목을 실·부위 순으로 정리했습니다. 흐린 열은 구매·구독 후 읽을 수 있습니다.
          </p>
          <div className="mt-4">
            <ScheduleTable project={project} items={items} />
          </div>

          <h2 className="mt-12 text-[22px] font-semibold tracking-tight">스펙북 구성</h2>
          <p className="mt-1 text-[14px] text-ink-2">구매하면 아래 문서 전체를 PDF로 받습니다. 총 {pageCount}쪽.</p>
          <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
            {project.sections.map((s) => (
              <li key={s.title} className="flex items-center justify-between px-4 py-3 text-[14.5px]">
                <span>{s.title}</span>
                <span className="text-[13px] text-ink-3">{s.pages}쪽</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-[22px] font-semibold tracking-tight">요약</h2>
          <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-ink-2">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-2">
                {t}
              </span>
            ))}
          </div>

          <h2 className="mt-12 text-[22px] font-semibold tracking-tight">위치</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            {project.location.fictional ? "시연용 위치입니다. 실제 서비스에서는 시·구 단위까지만 공개합니다." : "실제 위치."}
          </p>
          <div className="mt-4">
            <MapView pins={[{ project }]} height={320} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <PurchaseBox project={project} itemCount={items.length} pageCount={pageCount} />
        </aside>
      </section>
    </article>
  );
}
