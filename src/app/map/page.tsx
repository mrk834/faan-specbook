import Link from "next/link";
import { projects, itemsOf } from "@/lib/data";
import { MapView } from "@/components/MapView";

export const metadata = { title: "지도 — 스펙북" };

export default function MapPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight">지도에서 찾기</h1>
      <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-ink-2">
        스펙북이 올라온 건물의 위치입니다. 실제 서비스에서는 건축주 보호를 위해 시·구 단위까지만 표시하고, 정확한 위치는 업로더가
        공개를 선택한 경우에만 보여줍니다.
      </p>
      <div className="mt-6">
        <MapView pins={projects.map((p) => ({ project: p, note: `사양 ${itemsOf(p.slug).length}개 · ${p.year}` }))} height={520} />
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => (
          <li key={p.slug} className="rounded-lg border border-line p-4 text-[14px]">
            <p className="text-[12.5px] text-ink-3">{p.location.label}</p>
            <Link href={`/projects/${p.slug}/`} className="mt-1 block font-medium hover:underline">
              {p.title}
            </Link>
            <p className="mt-1 text-[13px] text-ink-2">
              {p.useType} · 사양 {itemsOf(p.slug).length}개
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
