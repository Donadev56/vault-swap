import { cn } from "@/lib/utils";

export const Card = ({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={style}
      className={cn(
        "bg-background border rounded-2xl w-[100%] max-w-[416px] flex items-center gap-2.5 p-5 flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
};
