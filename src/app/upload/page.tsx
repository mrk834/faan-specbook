"use client";

import { useState } from "react";
import { getProject, itemsOf, REVENUE_SHARE } from "@/lib/data";
import { asset, won } from "@/lib/base";
import { HexTag } from "@/components/HexTag";

// 업로드 플로우 시안. 파일은 실제로 올라가지 않는다.
const steps = ["문서 올리기", "사진에 연결", "가격·공개 범위", "확인"] as const;

export default function UploadPage() {
  const [step, setStep] = useState(0);
  const [price, setPrice] = useState(49000);
  const [priceMode, setPriceMode] = useState<"hidden" | "range" | "public">("range");
  const [address, setAddress] = useState<"district" | "exact">("district");
  const [consent, setConsent] = useState({ owner: false, photo: false, rights: false });
  const demo = getProject("cafe-jeju")!;
  const demoItems = itemsOf(demo.slug);
  const photo = demo.photos[0];
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(demoItems.map((i) => [i.id, true])),
  );
  const allConsent = consent.owner && consent.photo && consent.rights;

  return (
    <section className="mx-auto max-w-[960px] px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight">스펙북 올리기</h1>
      <p className="mt-2 max-w-[66ch] text-[15px] leading-relaxed text-ink-2">
        올리는 데 10분이면 됩니다. 문서를 그대로 올리면 항목을 뽑아 드리고, 사진 위에 코드를 찍는 것만 직접 하시면 됩니다. 이
        화면은 시안이라 파일이 실제로 올라가지는 않습니다.
      </p>

      <ol className="mt-8 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13.5px] ${
                i === step ? "bg-ink text-paper" : i < step ? "bg-paper-2 text-ink" : "text-ink-3 hover:bg-paper-2"
              }`}
            >
              <span className="font-mono text-[12px]">{i + 1}</span>
              {s}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-lg border border-line p-6">
        {step === 0 && (
          <div>
            <h2 className="text-[20px] font-semibold">문서를 올려 주세요</h2>
            <p className="mt-1 text-[14px] text-ink-2">마감표·일람표·상세도·제조사 사양서. PDF, DWG, XLSX, 이미지 모두 됩니다.</p>
            <div className="mt-5 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-line bg-paper-2 px-6 py-14 text-center">
              <p className="text-[15px] font-medium">여기에 파일을 끌어다 놓기</p>
              <p className="mt-1 text-[13px] text-ink-3">또는 폴더째 선택</p>
            </div>
            <ul className="mt-5 divide-y divide-line rounded-lg border border-line text-[14px]">
              {[
                ["제주구좌카페_마감표_v3.xlsx", "마감표로 인식 · 항목 24개 추출", true],
                ["조명배치도_E-301.pdf", "조명 일람표로 인식 · 항목 9개 추출", true],
                ["천장설비통합상세_A-515.dwg", "상세도로 인식 · 코드 CL-03, MC-02와 연결", true],
                ["제조사 사양서 모음.zip", "tear sheet 31장 · 모델명 매칭 중", false],
              ].map(([name, note, done]) => (
                <li key={name as string} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[13px]">{name as string}</p>
                    <p className="text-[13px] text-ink-2">{note as string}</p>
                  </div>
                  <span className={`shrink-0 text-[12.5px] ${done ? "text-ok" : "text-ink-3"}`}>{done ? "완료" : "처리 중"}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="프로젝트 이름" value="제주 구좌 카페" />
              <Field label="용도" value="카페" />
              <Field label="준공" value="2025" />
              <Field label="설계" value="아틀리에 남" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-[20px] font-semibold">사진 위에 코드를 찍어 주세요</h2>
            <p className="mt-1 text-[14px] text-ink-2">
              문서에서 뽑은 항목이 오른쪽에 있습니다. 항목을 고르고 사진의 해당 위치를 누르면 태그가 생깁니다. 직접 찍은 태그는
              &lsquo;설계자 검증&rsquo;으로 표시됩니다.
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_280px]">
              <figure className="relative overflow-hidden rounded-lg bg-paper-3">
                <img src={asset(photo.src)} alt={photo.caption} className="block aspect-[4/3] w-full object-cover" />
                {photo.hotspots
                  .filter((h) => checked[h.itemId])
                  .map((h) => {
                    const it = demoItems.find((i) => i.id === h.itemId)!;
                    return (
                      <span
                        key={h.itemId}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      >
                        <HexTag code={it.code} tone="tag" className="shadow-[0_1px_4px_rgba(0,0,0,.35)]" />
                      </span>
                    );
                  })}
                <span className="absolute bottom-3 left-3 rounded bg-paper/90 px-2 py-1 text-[12px] text-ink-2">
                  사진을 눌러 태그 추가 (시안에서는 비활성)
                </span>
              </figure>
              <ul className="max-h-[420px] space-y-1 overflow-y-auto rounded-lg border border-line p-2 text-[13.5px]">
                {demoItems.map((it) => (
                  <li key={it.id}>
                    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-paper-2">
                      <input
                        type="checkbox"
                        checked={!!checked[it.id]}
                        onChange={(e) => setChecked({ ...checked, [it.id]: e.target.checked })}
                        className="accent-tag"
                      />
                      <HexTag code={it.code} />
                      <span className="min-w-0 truncate">{it.publicName}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-[20px] font-semibold">가격과 공개 범위</h2>
            <div className="mt-5 grid gap-8 md:grid-cols-2">
              <div>
                <label className="block text-[14px] font-medium">스펙북 가격</label>
                <input
                  type="range"
                  min={19000}
                  max={149000}
                  step={5000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-3 w-full accent-tag"
                />
                <div className="mt-1 flex justify-between text-[12.5px] text-ink-3">
                  <span>{won(19000)}</span>
                  <span>{won(149000)}</span>
                </div>
                <div className="mt-4 rounded-lg bg-paper-2 p-4 text-[14px]">
                  <div className="flex justify-between"><span>판매가</span><span className="font-medium">{won(price)}</span></div>
                  <div className="mt-1 flex justify-between text-ink-2"><span>플랫폼 수수료 {Math.round((1 - REVENUE_SHARE) * 100)}%</span><span>−{won(Math.round(price * (1 - REVENUE_SHARE)))}</span></div>
                  <div className="mt-2 flex justify-between border-t border-line pt-2 text-[15px] font-semibold"><span>내 몫 (건당)</span><span>{won(Math.round(price * REVENUE_SHARE))}</span></div>
                  <p className="mt-2 text-[12.5px] text-ink-3">월 20건 팔리면 {won(Math.round(price * REVENUE_SHARE) * 20)}. 구독 열람은 열람 비중대로 배분.</p>
                </div>
              </div>
              <div className="space-y-5">
                <fieldset>
                  <legend className="text-[14px] font-medium">단가 공개</legend>
                  <div className="mt-2 space-y-1.5 text-[14px]">
                    {(
                      [
                        ["hidden", "비공개 — 제품 정보만, 단가는 숨김"],
                        ["range", "범위만 — '㎡당 4~5만 원' 식으로"],
                        ["public", "공개 — 발주 당시 단가 그대로"],
                      ] as const
                    ).map(([v, l]) => (
                      <label key={v} className="flex items-center gap-2">
                        <input type="radio" name="price" checked={priceMode === v} onChange={() => setPriceMode(v)} className="accent-tag" />
                        {l}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-[14px] font-medium">위치 공개</legend>
                  <div className="mt-2 space-y-1.5 text-[14px]">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="addr" checked={address === "district"} onChange={() => setAddress("district")} className="accent-tag" />
                      시·구까지만 (기본)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="addr" checked={address === "exact"} onChange={() => setAddress("exact")} className="accent-tag" />
                      정확한 위치 — 상업시설처럼 공개된 건물일 때
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-[20px] font-semibold">권리 확인</h2>
            <p className="mt-1 max-w-[62ch] text-[14px] leading-relaxed text-ink-2">
              설계도서의 저작권은 설계자에게 있지만 건축주에게도 이용권이 남고, 한 번 공개하면 철회가 어렵습니다. 세 가지를 확인한
              뒤에만 게시됩니다.
            </p>
            <div className="mt-5 space-y-3 text-[14.5px]">
              {(
                [
                  ["owner", "건축주(또는 운영자)에게 스펙북과 사진 공개 동의를 받았습니다."],
                  ["photo", "사진의 저작권을 보유하거나 사용 허락을 받았습니다 (촬영자 표기 포함)."],
                  ["rights", "제조사 사양서는 공개 배포 가능한 자료이며, 단가는 선택한 범위 안에서만 공개합니다."],
                ] as const
              ).map(([k, l]) => (
                <label key={k} className="flex items-start gap-3 rounded-lg border border-line p-4">
                  <input
                    type="checkbox"
                    checked={consent[k]}
                    onChange={(e) => setConsent({ ...consent, [k]: e.target.checked })}
                    className="mt-1 accent-tag"
                  />
                  <span>{l}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-paper-2 p-4 text-[14px]">
              <p className="font-medium">게시 요약</p>
              <ul className="mt-2 space-y-1 text-ink-2">
                <li>제주 구좌 카페 · 카페 · 2025</li>
                <li>사양 항목 {Object.values(checked).filter(Boolean).length}개 태그 · 문서 11쪽</li>
                <li>
                  가격 {won(price)} · 단가 {priceMode === "hidden" ? "비공개" : priceMode === "range" ? "범위" : "공개"} · 위치{" "}
                  {address === "district" ? "시·구" : "정확"}
                </li>
              </ul>
            </div>
            <button
              type="button"
              disabled={!allConsent}
              className="mt-5 inline-flex h-11 items-center rounded-md bg-ink px-5 text-[15px] font-medium text-paper disabled:cursor-not-allowed disabled:bg-paper-3 disabled:text-ink-3"
            >
              {allConsent ? "게시하기 (시안 — 실제 게시 없음)" : "세 항목을 모두 확인하면 게시할 수 있습니다"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="h-10 rounded-md border border-line px-4 text-[14px] disabled:opacity-40"
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="h-10 rounded-md bg-ink px-4 text-[14px] font-medium text-paper disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-[13.5px]">
      <span className="text-ink-2">{label}</span>
      <input defaultValue={value} className="mt-1 h-10 w-full rounded-md border border-line bg-paper px-3 text-[14px]" />
    </label>
  );
}
