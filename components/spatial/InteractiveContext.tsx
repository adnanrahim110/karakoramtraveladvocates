"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { ServicePillar } from "@/lib/types/cms";

export type UnitSystem = "metric" | "imperial";

export interface InquiryContextPayload {
  tripTitle?: string;
  tripSlug?: string;
  serviceType?: ServicePillar;
  regionName?: string;
  preferredDates?: string;
}

interface InteractiveContextValue {
  unit: UnitSystem;
  toggleUnit: () => void;
  setUnit: (unit: UnitSystem) => void;
  isInquiryOpen: boolean;
  inquiryContext: InquiryContextPayload;
  openInquiry: (payload?: InquiryContextPayload) => void;
  closeInquiry: () => void;
  cursorTelemetry: string | null;
  setCursorTelemetry: (label: string | null) => void;
}

const InteractiveContext = createContext<InteractiveContextValue | null>(null);

export function InteractiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState<InquiryContextPayload>(
    {},
  );
  const [cursorTelemetry, setCursorTelemetry] = useState<string | null>(null);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }, []);

  const openInquiry = useCallback((payload?: InquiryContextPayload) => {
    setInquiryContext(payload ?? {});
    setIsInquiryOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsInquiryOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      unit,
      toggleUnit,
      setUnit,
      isInquiryOpen,
      inquiryContext,
      openInquiry,
      closeInquiry,
      cursorTelemetry,
      setCursorTelemetry,
    }),
    [
      unit,
      toggleUnit,
      isInquiryOpen,
      inquiryContext,
      openInquiry,
      closeInquiry,
      cursorTelemetry,
    ],
  );

  return (
    <InteractiveContext.Provider value={value}>
      {children}
    </InteractiveContext.Provider>
  );
}

export function useInteractive(): InteractiveContextValue {
  const ctx = useContext(InteractiveContext);
  if (!ctx) {
    throw new Error(
      "useInteractive must be used within an InteractiveProvider",
    );
  }
  return ctx;
}
