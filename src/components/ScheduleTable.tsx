"use client";

import Link from "next/link";
import type { Project, SpecItem } from "@/lib/data";
import { SURFACE_ORDER } from "@/lib/data";
import { HexTag } from "./HexTag";
import { useUnlock } from "./unlock";

// 실내재료마감표를 닮은 표. 잠금 열은 구매 전에는 흐리게.
export function ScheduleTable({ project, items }: { project: Project; items: SpecItem[] }) {
  const { isUnlocked, ready } = useUnlock();
  const open = ready && isUnlocked(project.slug);
  const sorted = [...items].sort(
    (a, b) =>
      a.room.localeCompare(b.room, "ko") ||
      SURFACE_ORDER.indexOf(a.surface) - SURFACE_ORDER.indexOf(b.surface) ||
      a.code.localeCompare(b.code),
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[760px] border-collapse text-[13.5px]">
        <thead>
          <tr className="bg-paper-2 text-left text-[12.5px] text-ink-2">
            <th className="px-3 py-2 font-medium">코드</th>
            <th className="px-3 py-2 font-medium">실</th>
            <th className="px-3 py-2 font-medium">부위</th>
            <th className="px-3 py-2 font-medium">재료</th>
            <th className="px-3 py-2 font-medium">제조사 · 모델</th>
            <th className="px-3 py-2 font-medium">규격</th>
            <th className="px-3 py-2 font-medium">상세도</th>
            <th className="px-3 py-2 font-medium">색인</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((it, i) => (
            <tr key={it.id} className={`border-t border-line ${i % 2 ? "bg-paper" : "bg-paper"}`}>
              <td className="px-3 py-2">
                <HexTag code={it.code} />
              </td>
              <td className="px-3 py-2">{it.room}</td>
              <td className="px-3 py-2 text-ink-2">{it.surface}</td>
              <td className="px-3 py-2">
                <span className="font-medium">{it.publicName}</span>
                <span className="block text-[12.5px] text-ink-3">{it.colorNote}</span>
              </td>
              <td className={`px-3 py-2 ${open ? "" : "locked"}`}>
                {it.manufacturer}
                <span className="block font-mono text-[12px] text-ink-2">{it.model}</span>
              </td>
              <td className={`px-3 py-2 ${open ? "" : "locked"}`}>{it.size}</td>
              <td className={`px-3 py-2 font-mono text-[12px] ${open ? "" : "locked"}`}>{it.detailRef}</td>
              <td className="px-3 py-2">
                <Link href={`/materials/${it.materialSlug}/`} className="text-tag hover:underline">
                  보기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
