import Link from "next/link";

const nav = [
  { href: "/projects/", label: "사례" },
  { href: "/materials/", label: "자재 색인" },
  { href: "/map/", label: "지도" },
  { href: "/pricing/", label: "이용 방식" },
  { href: "/about/", label: "기획 초안" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <span className="hex-tag inline-flex h-[22px] w-[34px] items-center justify-center bg-ink font-mono text-[11px] font-medium text-paper">
            SB
          </span>
          <span className="text-[17px] font-semibold tracking-tight">스펙북</span>
          <span className="hidden text-[12px] text-ink-3 sm:inline">프로토타입 v0.1</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 text-[14px] text-ink-2 hover:bg-paper-2 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/upload/"
          className="inline-flex h-9 items-center rounded-md bg-ink px-3.5 text-[14px] font-medium text-paper hover:bg-ink-2"
        >
          스펙북 올리기
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-line px-3 py-1.5 md:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="shrink-0 rounded-md px-3 py-1 text-[13px] text-ink-2">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
