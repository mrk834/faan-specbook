"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Photo, Project, SpecItem } from "@/lib/data";
import { getItem } from "@/lib/data";
import { asset } from "@/lib/base";
import { HexTag } from "./HexTag";
import { SpecCard } from "./SpecCard";

type Props = {
  project: Project;
  photos?: Photo[];
  initialPhotoId?: string;
  initialItemId?: string;
  mode?: "full" | "hero";
};

const LABEL_OFFSET = 44; // 점에서 라벨까지 리더선 길이(px)

export function HotspotViewer({ project, photos = project.photos, initialPhotoId, initialItemId, mode = "full" }: Props) {
  const [photoId, setPhotoId] = useState(initialPhotoId ?? photos[0].id);
  const [activeId, setActiveId] = useState<string | null>(initialItemId ?? null);
  const [showTags, setShowTags] = useState(true);

  const photo = photos.find((p) => p.id === photoId) ?? photos[0];
  const items = useMemo(
    () => photo.hotspots.map((h) => ({ hotspot: h, item: getItem(h.itemId)! })).filter((x) => x.item),
    [photo],
  );
  const active: SpecItem | null = activeId ? getItem(activeId) ?? null : null;

  useEffect(() => {
    // 사진을 바꾸면 그 사진에 없는 항목은 선택 해제
    if (activeId && !photo.hotspots.some((h) => h.itemId === activeId)) setActiveId(null);
  }, [photoId, photo, activeId]);

  const hero = mode === "hero";

  return (
    <div className={hero ? "" : "grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"}>
      <div>
        <figure className="relative overflow-hidden rounded-lg bg-paper-3">
          <img
            src={asset(photo.src)}
            alt={photo.caption}
            className="block aspect-[4/3] w-full object-cover"
            draggable={false}
          />
          {showTags &&
            items.map(({ hotspot: h, item }) => {
              const dir = h.dir ?? "tr";
              const dx = dir.includes("r") ? 1 : -1;
              const dy = dir.includes("b") ? 1 : -1;
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id + h.x + h.y}
                  className="absolute"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                >
                  {/* 리더선 */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 h-px origin-left ${isActive ? "bg-tag" : "bg-paper"}`}
                    style={{
                      width: LABEL_OFFSET,
                      transform: `rotate(${dx > 0 ? (dy > 0 ? 45 : -45) : dy > 0 ? 135 : -135}deg)`,
                      boxShadow: "0 0 0 0.5px rgba(21,24,28,.35)",
                    }}
                  />
                  {/* 기준점 */}
                  <span
                    aria-hidden
                    className={`absolute -left-[5px] -top-[5px] block h-[10px] w-[10px] rounded-full ring-2 ${
                      isActive ? "bg-tag ring-paper" : "bg-paper ring-ink/60"
                    }`}
                  />
                  {/* 라벨 */}
                  <button
                    type="button"
                    onClick={() => setActiveId(isActive ? null : item.id)}
                    aria-pressed={isActive}
                    aria-label={`${item.code} ${item.publicName}`}
                    className="absolute -translate-y-1/2 focus-visible:outline-none"
                    style={{
                      left: dx > 0 ? LABEL_OFFSET * 0.7 : undefined,
                      right: dx < 0 ? LABEL_OFFSET * 0.7 : undefined,
                      top: dy * LABEL_OFFSET * 0.7,
                    }}
                  >
                    <HexTag
                      code={item.code}
                      tone={isActive ? "tag" : "paper"}
                      className="shadow-[0_1px_4px_rgba(0,0,0,.35)] transition-colors"
                    />
                  </button>
                </div>
              );
            })}

          {/* 간단 팝오버 (히어로 모드) */}
          {hero && active && (
            <div className="absolute bottom-3 left-3 right-3 rounded-md bg-paper/95 p-3 shadow-panel backdrop-blur sm:left-auto sm:w-[320px]">
              <div className="flex items-center gap-2">
                <HexTag code={active.code} tone="tag" />
                <span className="text-[13px] text-ink-2">
                  {active.room} · {active.surface}
                </span>
              </div>
              <p className="mt-1.5 text-[15px] font-semibold">{active.publicName}</p>
              <p className="text-[13px] text-ink-2">{active.colorNote}</p>
              <div className="mt-2 flex items-center justify-between text-[13px]">
                <span className="locked select-none font-mono text-ink-3">{active.manufacturer} {active.model}</span>
                <Link
                  href={`/projects/${project.slug}/?item=${active.id}`}
                  className="font-medium text-tag hover:underline"
                >
                  스펙북에서 열기
                </Link>
              </div>
            </div>
          )}
        </figure>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[13px] text-ink-2">
          <figcaption>{photo.caption}</figcaption>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showTags}
              onChange={(e) => setShowTags(e.target.checked)}
              className="accent-tag"
            />
            태그 표시 ({items.length})
          </label>
        </div>

        {photos.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {photos.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPhotoId(p.id)}
                aria-pressed={p.id === photoId}
                className={`shrink-0 overflow-hidden rounded-md border-2 ${
                  p.id === photoId ? "border-tag" : "border-transparent hover:border-line"
                }`}
              >
                <img src={asset(p.src)} alt={p.room} className="block h-[56px] w-[76px] object-cover" />
                <span className="block bg-paper px-1 py-0.5 text-left text-[11px] text-ink-2">{p.room}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {!hero && (
        <aside className="lg:sticky lg:top-20 lg:self-start">
          {active ? (
            <SpecCard item={active} project={project} onClose={() => setActiveId(null)} />
          ) : (
            <div className="rounded-lg border border-dashed border-line p-5 text-[14px] text-ink-2">
              <p className="font-medium text-ink">사진 위의 태그를 누르세요.</p>
              <p className="mt-1 leading-relaxed">
                태그는 이 스펙북의 마감 코드입니다. 누르면 그 자리에 들어간 재료와 제품 사양이 여기 나타납니다.
              </p>
              <ul className="mt-4 space-y-1.5">
                {items.map(({ item }) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1 text-left hover:bg-paper-2"
                    >
                      <HexTag code={item.code} />
                      <span className="text-ink">{item.publicName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
