# faan-specbook — 스펙북 프로토타입 v0.1

건축가·인테리어 디자이너의 **스펙북**(마감표·일람표·상세도·제조사 사양서)을 올리고, 완공 사진의 각 요소를 그 사양에 연결하는 전문가용 아카이브의 첫 시안.

- 라이브: https://mrk834.github.io/faan-specbook/
- 기획 초안과 질문: `/about/`
- 사진 출처: `/credits/` (Wikimedia Commons CC). **사양 데이터는 전부 시연용 가상값.**

## 구조

```
src/lib/data.ts          데이터 모델(SpecItem·Hotspot·Photo·Project·Material) + 시연 데이터
src/components/
  HotspotViewer.tsx      사진 위 마감 코드 태그 + 사양 패널
  SpecCard.tsx           공개/잠금 필드 카드 (구매 시뮬레이션)
  ScheduleTable.tsx      실내재료마감표형 표
  MapView.tsx            Leaflet 지도 (OSM 타일)
  unlock.tsx             구매·구독 상태 (localStorage, 결제 없음)
src/app/                 / 사례 / 자재 색인 / 지도 / 업로드 / 이용 방식 / 기획 초안 / 출처
```

## 개발

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # 정적 내보내기 → out/
NEXT_PUBLIC_BASE_PATH=/faan-specbook pnpm build   # GitHub Pages용
```

배포는 `main` push 시 GitHub Actions(`.github/workflows/pages.yml`)가 Pages로 올린다. Vercel로 옮길 때는 `NEXT_PUBLIC_BASE_PATH`를 비우면 된다.
