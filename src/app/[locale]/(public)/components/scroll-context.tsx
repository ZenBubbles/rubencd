"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { type MotionValue } from "motion/react";

interface ScrollContextValue {
  scrollProgress: MotionValue<number> | null;
  setScrollProgress: (progress: MotionValue<number>) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollProgress: null,
  setScrollProgress: () => {},
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgressState] = useState<MotionValue<number> | null>(null);
  const setScrollProgress = useCallback((progress: MotionValue<number>) => {
    setScrollProgressState(progress);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollProgress, setScrollProgress }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  return useContext(ScrollContext);
}
