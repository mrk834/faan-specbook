// 도면의 육각 마감 태그. 코드(FL-01)를 담는 가장 작은 단위의 브랜드 요소.
export function HexTag({
  code,
  size = "sm",
  tone = "ink",
  className = "",
}: {
  code: string;
  size?: "sm" | "md";
  tone?: "ink" | "tag" | "paper";
  className?: string;
}) {
  const tones = {
    ink: "bg-ink text-paper",
    tag: "bg-tag text-paper",
    paper: "bg-paper text-ink ring-1 ring-ink/80",
  } as const;
  const sizes = {
    sm: "h-[22px] min-w-[58px] px-3 text-[11px]",
    md: "h-[28px] min-w-[76px] px-4 text-[13px]",
  } as const;
  return (
    <span
      className={`hex-tag inline-flex items-center justify-center whitespace-nowrap font-mono font-medium tracking-wide leading-none ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {code}
    </span>
  );
}
