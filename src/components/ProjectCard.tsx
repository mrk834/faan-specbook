import Link from "next/link";
import type { Project } from "@/lib/data";
import { itemsOf } from "@/lib/data";
import { asset, won } from "@/lib/base";
import { HexTag } from "./HexTag";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.photos.find((p) => p.id === project.cover) ?? project.photos[0];
  const items = itemsOf(project.slug);
  const sample = cover.hotspots.slice(0, 3);
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group block overflow-hidden rounded-lg border border-line bg-paper hover:border-ink/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
        <img src={asset(cover.src)} alt={cover.caption} className="block h-full w-full object-cover" />
        {sample.map((h) => (
          <span
            key={h.itemId}
            className="absolute block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper ring-2 ring-ink/60"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-hidden
          />
        ))}
        <span className="absolute left-3 top-3 rounded bg-paper/90 px-2 py-0.5 text-[12px] text-ink">
          {project.useType}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-[16px] font-semibold leading-snug group-hover:underline">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-ink-2">{project.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {items.slice(0, 4).map((it) => (
            <HexTag key={it.id} code={it.code} tone="paper" />
          ))}
          {items.length > 4 && <span className="self-center text-[12px] text-ink-3">+{items.length - 4}</span>}
        </div>
        <div className="mt-4 flex items-center justify-between text-[13px] text-ink-2">
          <span>
            {project.uploader.name} · {project.uploader.studio}
          </span>
          <span className="font-medium text-ink">{won(project.price)}</span>
        </div>
      </div>
    </Link>
  );
}
