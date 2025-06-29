import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import React from "react";

export interface AppBarProps {
  title?: React.ReactNode;
  leading?: React.ReactNode;
  actions?: React.ReactNode[];
  fixed?: boolean;
  zIndex?: number;
  className?: string;
  onClose?: () => void;
  style?: React.CSSProperties;
  mainElementStyle?: React.CSSProperties;
  leadingStyle?: React.CSSProperties;
  actionStyle?: React.CSSProperties;
}

const StAppBar = ({
  title,
  actions,
  leading,
  fixed = true,
  zIndex,
  onClose,
  className,
  style,
  leadingStyle,
  mainElementStyle,
  actionStyle,
}: AppBarProps) => {
  return (
    <div
      style={{
        position: style?.position ?? (fixed ? "fixed" : "relative"),
        top: fixed ? 0 : "",
        zIndex: zIndex,
      }}
      className={cn(`w-full border-b fixed  left-0 right-0`, className)}
    >
      <div
        style={mainElementStyle}
        className="flex h-full text-color py-[15px] px-[12px]  gap-[10px] w-full bg-[varr(--second-color)]  flex-row "
      >
        <div
          style={leadingStyle}
          className="flex flex-row items-center justify-start w-full gap-[10px]"
        >
          {leading ?? <ChevronLeft onClick={onClose} />}

          {title ?? "AppBar"}
        </div>
        <div
          style={actionStyle}
          className="flex gap-[10px] justify-end items-center w-full  flex-row "
        >
          {actions && actions.map((e, i) => <div key={i}>{e}</div>)}
        </div>
      </div>
    </div>
  );
};

export default StAppBar;
