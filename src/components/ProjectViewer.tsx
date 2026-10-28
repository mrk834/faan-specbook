"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Project } from "@/lib/data";
import { getItem } from "@/lib/data";
import { HotspotViewer } from "./HotspotViewer";

// 정적 내보내기에서는 서버가 ?item= 을 알 수 없으므로 클라이언트에서 읽는다.
function Inner({ project }: { project: Project }) {
  const sp = useSearchParams();
  const itemId = sp.get("item");
  const item = itemId ? getItem(itemId) : undefined;
  const photo = item ? project.photos.find((p) => p.hotspots.some((h) => h.itemId === item.id)) : undefined;
  return (
    <HotspotViewer
      key={itemId ?? "none"}
      project={project}
      initialPhotoId={photo?.id}
      initialItemId={item?.id}
    />
  );
}

export function ProjectViewer({ project }: { project: Project }) {
  return (
    <Suspense fallback={<HotspotViewer project={project} />}>
      <Inner project={project} />
    </Suspense>
  );
}
