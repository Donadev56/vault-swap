"use client";

import type { WidgetConfig } from "@lifi/widget";
import { ClientOnly } from "./ClientOnly";
import { LiFiWidget, WidgetSkeleton } from "@/external/dist/esm";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";

export function Widget() {
  const { LifiConfig } = useCustomLifiConfig();

  return (
    <ClientOnly fallback={<WidgetSkeleton config={LifiConfig} />}>
      <div className="relative mt-30 items-center max-w-[90%] flex justify-center w-full ">
        <LiFiWidget config={LifiConfig as any} integrator="donadev" />
      </div>
    </ClientOnly>
  );
}
