"use client";

import { useEffect } from "react";
import { setGaAnalyticsRuntimeEnabled } from "@/lib/analytics";

type AnalyticsRuntimeGateProps = {
  enabled: boolean;
};

export function AnalyticsRuntimeGate({
  enabled,
}: AnalyticsRuntimeGateProps) {
  useEffect(() => {
    setGaAnalyticsRuntimeEnabled(enabled);

    return () => setGaAnalyticsRuntimeEnabled(false);
  }, [enabled]);

  return null;
}
