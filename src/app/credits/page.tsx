import { projects } from "@/lib/data";

export const metadata = { title: "사진 출처 — 스펙북" };

export default function CreditsPage() {
  const credits = projects.flatMap((p) => p.photos.map((ph) => ({ project: p.title, ...ph.credit })));
  return (
    <section className="mx-auto max-w-[800px] px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight">사진 출처</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
        모든 사진은 Wikimedia Commons에서 가져온 크리에이티브 커먼즈 라이선스 사진입니다. 사진 위의 태그와 사양 데이터는 시연을 위해
        붙인 가상값이며, 촬영자·건물과 무관합니다.
      </p>
      <ul className="mt-8 divide-y divide-line rounded-lg border border-line text-[14px]">
        {credits.map((c, i) => (
          <li key={i} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
            <div>
              <a href={c.url} className="font-medium hover:underline" rel="noopener">
                {c.title}
              </a>
              <span className="ml-2 text-ink-2">{c.author}</span>
            </div>
            <span className="text-[13px] text-ink-3">
              {c.license} · {c.project}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[13px] text-ink-3">
        지도 타일: OpenStreetMap 기여자 (ODbL). 글꼴: IBM Plex Sans KR, IBM Plex Mono (OFL).
      </p>
    </section>
  );
}
