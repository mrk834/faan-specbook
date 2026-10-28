"use client";

import Link from "next/link";
import type { Project, SpecItem } from "@/lib/data";
import { won } from "@/lib/base";
import { HexTag } from "./HexTag";
import { useUnlock } from "./unlock";

// 사양 카드. 공개 필드는 항상, 잠금 필드는 구매·구독 시에만 읽을 수 있다.
export function SpecCard({ item, project, onClose }: { item: SpecItem; project: Project; onClose?: () => void }) {
  const { isUnlocked, togglePurchase, ready } = useUnlock();
  const open = ready && isUnlocked(project.slug);

  const lockedRows: [string, string][] = [
    ["제조사", item.manufacturer],
    ["제품 · 모델", `${item.product} · ${item.model}`],
    ["마감 · 색상", item.finish],
    ["규격", `${item.size} (${item.unit})`],
    ["시공 메모", item.installNote],
    ["상세도", item.detailRef],
    ["공급처 · 리드타임", `${item.supplier} · ${item.leadTime}`],
  ];
  if (item.cert) lockedRows.push(["성능 · 인증", item.cert]);

  const price =
    item.priceVisibility === "hidden"
      ? "업로더가 비공개로 설정"
      : item.priceRange ?? "—";

  return (
    <div className="rounded-lg border border-line bg-paper shadow-panel">
      <div className="flex items-start justify-between gap-3 border-b border-line p-4">
        <div>
          <div className="flex items-center gap-2">
            <HexTag code={item.code} tone="tag" size="md" />
            <span className="text-[13px] text-ink-2">
              {item.room} · {item.surface}
            </span>
          </div>
          <h3 className="mt-2 text-[17px] font-semibold leading-snug">{item.publicName}</h3>
          <p className="mt-0.5 text-[13px] text-ink-2">{item.colorNote}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-md p-1 text-ink-3 hover:bg-paper-2 hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 4l10 10M14 4L4 14" />
            </svg>
          </button>
        )}
      </div>

      <dl className="grid grid-cols-[92px_1fr] gap-x-3 gap-y-2 p-4 text-[13.5px]">
        <dt className="text-ink-3">분류</dt>
        <dd>
          {item.category}
          {item.csi && <span className="ml-2 font-mono text-[12px] text-ink-3">CSI {item.csi}</span>}
        </dd>
        <dt className="text-ink-3">자재 색인</dt>
        <dd>
          <Link href={`/materials/${item.materialSlug}/`} className="text-tag hover:underline">
            이 자재가 쓰인 다른 장면 보기
          </Link>
        </dd>
        {lockedRows.map(([k, v]) => (
          <LockedRow key={k} k={k} v={v} open={open} />
        ))}
        <dt className="text-ink-3">단가</dt>
        <dd className={open || item.priceVisibility === "public" ? "" : "locked"}>{price}</dd>
      </dl>

      <div className="border-t border-line bg-paper-2 p-4">
        {open ? (
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-medium text-ok">이 스펙북은 열람 중입니다</span>
            <button type="button" onClick={() => togglePurchase(project.slug)} className="text-ink-3 hover:text-ink">
              구매 전 화면으로
            </button>
          </div>
        ) : (
          <>
            <p className="text-[13px] leading-relaxed text-ink-2">
              제조사·모델·시공 메모·상세도는 스펙북을 구매하거나 구독하면 열립니다. 수익의 70%는 업로더
              {" "}
              <span className="text-ink">{project.uploader.name}</span>에게 갑니다.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => togglePurchase(project.slug)}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-ink px-3 text-[14px] font-medium text-paper hover:bg-ink-2"
              >
                스펙북 구매 {won(project.price)}
              </button>
              <Link
                href="/pricing/"
                className="inline-flex h-9 items-center justify-center rounded-md border border-line bg-paper px-3 text-[14px] font-medium hover:bg-paper-2"
              >
                구독
              </Link>
            </div>
            <p className="mt-2 text-[12px] text-ink-3">시연용 버튼입니다. 누르면 결제 없이 열람 상태로 바뀝니다.</p>
          </>
        )}
      </div>
    </div>
  );
}

function LockedRow({ k, v, open }: { k: string; v: string; open: boolean }) {
  return (
    <>
      <dt className="text-ink-3">{k}</dt>
      <dd className="relative">
        <span className={open ? "" : "locked"}>{v}</span>
        {!open && (
          <span aria-hidden className="absolute inset-y-0 left-0 flex items-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-ink-3">
              <rect x="2" y="5" width="8" height="6" rx="1" />
              <path d="M4 5V3.5a2 2 0 0 1 4 0V5" />
            </svg>
          </span>
        )}
      </dd>
    </>
  );
}
