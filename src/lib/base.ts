// 정적 자산 경로에 basePath를 붙인다 (GitHub Pages 서브경로 배포 대응).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

export function won(n: number): string {
  return `₩${n.toLocaleString("ko-KR")}`;
}
