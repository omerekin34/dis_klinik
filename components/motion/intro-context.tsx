"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

export type IntroPhase = "intro" | "exit" | "done";

type IntroContextValue = {
  phase: IntroPhase;
  skip: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const skip = useCallback(() => {}, []);
  const value = useMemo(() => ({ phase: "done" as const, skip }), [skip]);

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  const value = useContext(IntroContext);
  if (!value) throw new Error("useIntro must be used within IntroProvider");
  return value;
}
