"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { type MotionValue } from "motion/react";

interface ScrollContextValue {
  scrollProgress: MotionValue<number> | null;
  setScrollProgress: (progress: MotionValue<number>) => void;
  darkHeaderHeight: number;
  setDarkHeaderHeight: (height: number) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollProgress: null,
  setScrollProgress: () => {},
  darkHeaderHeight: 0,
  setDarkHeaderHeight: () => {},
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgressState] = useState<MotionValue<number> | null>(null);
  const [darkHeaderHeight, setDarkHeaderHeightState] = useState(0);
  const setScrollProgress = useCallback((progress: MotionValue<number>) => {
    setScrollProgressState(progress);
  }, []);
  const setDarkHeaderHeight = useCallback((height: number) => {
    setDarkHeaderHeightState(height);
  }, []);

  return (
    <ScrollContext.Provider
      value={{ scrollProgress, setScrollProgress, darkHeaderHeight, setDarkHeaderHeight }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  return useContext(ScrollContext);
}
