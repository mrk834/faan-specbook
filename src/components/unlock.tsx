"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// 구매·구독 상태 시뮬레이션. 실제 결제 없음 — 프로토타입에서 "구매 후 화면"을 보여주기 위한 장치.
type UnlockState = {
  subscribed: boolean;
  purchased: string[]; // project slugs
};

type Ctx = UnlockState & {
  ready: boolean;
  isUnlocked: (projectSlug: string) => boolean;
  togglePurchase: (projectSlug: string) => void;
  setSubscribed: (v: boolean) => void;
  reset: () => void;
};

const KEY = "specbook.unlock.v1";
const UnlockContext = createContext<Ctx | null>(null);

export function UnlockProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UnlockState>({ subscribed: false, purchased: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const persist = useCallback((next: UnlockState) => {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      ready,
      isUnlocked: (slug) => state.subscribed || state.purchased.includes(slug),
      togglePurchase: (slug) =>
        persist({
          ...state,
          purchased: state.purchased.includes(slug)
            ? state.purchased.filter((s) => s !== slug)
            : [...state.purchased, slug],
        }),
      setSubscribed: (v) => persist({ ...state, subscribed: v }),
      reset: () => persist({ subscribed: false, purchased: [] }),
    }),
    [state, ready, persist],
  );

  return <UnlockContext.Provider value={value}>{children}</UnlockContext.Provider>;
}

export function useUnlock(): Ctx {
  const ctx = useContext(UnlockContext);
  if (!ctx) throw new Error("UnlockProvider missing");
  return ctx;
}
