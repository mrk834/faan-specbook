"use client";

import Link from "next/link";
import type { Project } from "@/lib/data";
import { REVENUE_SHARE } from "@/lib/data";
import { won } from "@/lib/base";
import { useUnlock } from "./unlock";

export function PurchaseBox({ project, itemCount, pageCount }: { project: Project; itemCount: number; pageCount: number }) {
  const { isUnlocked, togglePurchase, subscribed, ready } = useUnlock();
  const open = ready && isUnlocked(project.slug);
  const uploaderShare = Math.round(project.price * REVENUE_SHARE);

  return (
    <div className="rounded-lg border border-line bg-paper shadow-panel">
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-ink-2">스펙북 전체</span>
          <span className="text-[22px] font-semibold tracking-tight">{won(project.price)}</span>
        </div>
        <ul className="mt-3 space-y-1 text-[13.5px] text-ink-2">
          <li>사양 항목 {itemCount}개 · 문서 {pageCount}쪽</li>
          <li>상세도·제조사 사양서 PDF 다운로드</li>
          <li>사진 태그의 잠금 필드 전체 열람</li>
          <li>구매 후 업데이트 무료 (업로더가 개정하면 알림)</li>
        </ul>
        <div className="mt-4">
          {open ? (
            <div className="rounded-md bg-paper-2 p-3 text-[13.5px]">
              <p className="font-medium text-ok">{subscribed ? "구독 중 — 열람 가능" : "구매 완료 — 열람 가능"}</p>
              {!subscribed && (
                <button type="button" onClick={() => togglePurchase(project.slug)} className="mt-1 text-ink-3 hover:text-ink">
                  구매 전 화면으로 되돌리기
                </button>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => togglePurchase(project.slug)}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-ink text-[14.5px] font-medium text-paper hover:bg-ink-2"
              >
                구매하고 전체 열람
              </button>
              <Link
                href="/pricing/"
                className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md border border-line text-[14.5px] font-medium hover:bg-paper-2"
              >
                구독으로 월 5권 열람
              </Link>
              <p className="mt-2 text-center text-[12px] text-ink-3">시연용 — 실제 결제는 일어나지 않습니다</p>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-line bg-paper-2 p-5 text-[13px]">
        <p className="text-ink-2">이 구매에서 업로더에게 가는 몫</p>
        <p className="mt-0.5 text-[15px] font-semibold">
          {won(uploaderShare)} <span className="text-[12.5px] font-normal text-ink-3">({Math.round(REVENUE_SHARE * 100)}%)</span>
        </p>
        <p className="mt-2 leading-relaxed text-ink-2">
          {project.uploader.name} · {project.uploader.role} · {project.uploader.studio}. 지금까지 {project.stats.purchases}회 구매,
          조회 {project.stats.views.toLocaleString("ko-KR")}회.
        </p>
      </div>
    </div>
  );
}
