import Link from "next/link";
import { notFound } from "next/navigation";
import { materials, getMaterial, scenesOfMaterial, getProject } from "@/lib/data";
import { asset } from "@/lib/base";
import { HexTag } from "@/components/HexTag";
import { MapView } from "@/components/MapView";

export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getMaterial(slug);
  return { title: m ? `${m.name} — 자재 색인 — 스펙북` : "스펙북" };
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();
  const scenes = scenesOfMaterial(slug);
  const projectSlugs = Array.from(new Set(material.items.map((i) => i.projectSlug)));
  const pins = projectSlugs
    .map((s) => getProject(s)!)
    .map((p) => ({
      project: p,
      note: material.items
        .filter((i) => i.projectSlug === p.slug)
        .map((i) => `${i.code} ${i.room}`)
        .join(", "),
    }));

  return (
    <article className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <nav className="text-[13px] text-ink-3">
        <Link href="/materials/" className="hover:text-ink">자재 색인</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-2">{material.surface}</span>
      </nav>
      <h1 className="mt-3 text-[28px] font-semibold tracking-tight sm:text-[34px]">{material.name}</h1>
      <p className="mt-2 text-[15px] text-ink-2">
        {material.category} · {material.surface} · {projectSlugs.length}개 사례의 {scenes.length}개 장면
        {material.summary ? ` · ${material.summary}` : ""}
      </p>

      <section className="mt-8">
        <h2 className="text-[20px] font-semibold tracking-tight">이 자재가 쓰인 장면</h2>
        <p className="mt-1 text-[14px] text-ink-2">썸네일의 표시 지점이 이 자재입니다. 누르면 그 장면의 태그가 열린 채로 스펙북으로 갑니다.</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenes.map(({ project, photo, hotspot, item }) => (
            <li key={`${photo.id}-${item.id}`}>
              <Link
                href={`/projects/${project.slug}/?item=${item.id}`}
                className="group block overflow-hidden rounded-lg border border-line hover:border-ink/50"
              >
                <div className="relative aspect-[4/3] bg-paper-3">
                  <img src={asset(photo.src)} alt={photo.caption} className="block h-full w-full object-cover" />
                  <span
                    aria-hidden
                    className="absolute h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tag ring-[3px] ring-paper"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  />
                  <span
                    aria-hidden
                    className="absolute h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/80"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <HexTag code={item.code} />
                    <span className="text-[13px] text-ink-2">
                      {item.room} · {photo.room}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[14.5px] font-medium group-hover:underline">{project.title}</p>
                  <p className="text-[13px] text-ink-2">{item.publicName} · {item.colorNote}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-[20px] font-semibold tracking-tight">어디에 있나</h2>
        <div className="mt-4">
          <MapView pins={pins} height={360} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[20px] font-semibold tracking-tight">사례별 사양 비교</h2>
        <p className="mt-1 text-[14px] text-ink-2">같은 자재를 각 사례가 어떻게 다르게 썼는지. 잠금 필드는 해당 스펙북을 열어야 보입니다.</p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[640px] text-[13.5px]">
            <thead>
              <tr className="bg-paper-2 text-left text-[12.5px] text-ink-2">
                <th className="px-3 py-2 font-medium">사례</th>
                <th className="px-3 py-2 font-medium">코드</th>
                <th className="px-3 py-2 font-medium">실 · 부위</th>
                <th className="px-3 py-2 font-medium">색 · 질감</th>
                <th className="px-3 py-2 font-medium">모델 (잠금)</th>
              </tr>
            </thead>
            <tbody>
              {material.items.map((i) => (
                <tr key={i.id} className="border-t border-line">
                  <td className="px-3 py-2">
                    <Link href={`/projects/${i.projectSlug}/`} className="hover:underline">
                      {getProject(i.projectSlug)?.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2"><HexTag code={i.code} /></td>
                  <td className="px-3 py-2">{i.room} · {i.surface}</td>
                  <td className="px-3 py-2 text-ink-2">{i.colorNote}</td>
                  <td className="px-3 py-2 font-mono text-[12px]"><span className="locked">{i.model}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
