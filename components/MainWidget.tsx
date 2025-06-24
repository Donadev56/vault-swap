"use client";

import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { Header } from "./header";
import { Widget } from "./Widget";
import { WidgetEvents } from "./WidgetEvents";

export const MainWidget = () => {
  const { LifiConfig } = useCustomLifiConfig();
  return (
    <main
      style={{
        backgroundColor: (
          LifiConfig.theme?.colorSchemes?.dark?.palette?.primary as any
        )?.main,
      }}
      className="flex w-full rounded-b-4xl pb-[40px] justify-center uppercase  items-center"
    >
      <WidgetEvents />

      <Widget />
    </main>
  );
};
