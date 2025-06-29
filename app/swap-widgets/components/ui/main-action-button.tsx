import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { cn } from "@/lib/utils";
import { Button } from "@mui/material";
type ButtonProps = React.ComponentProps<typeof Button>;

export const MainActionButton = ({
  className,
  children,
  ...props
}: ButtonProps) => {
  const config = useCustomLifiConfig();
  return (
    <Button
      sx={{ ...props.sx, textTransform: props.sx ?? "none" }}
      style={{
        backgroundColor: props.style?.backgroundColor ?? config.themeColor,
        color: props.style?.color ?? "var(--background)",
        borderRadius: props.style?.borderRadius ?? 10,
        ...props.style,
      }}
      className={cn(
        "px-12 py-5 text-foreground rounded-2xl w-full flex",
        className,
      )}
      {...(props as any)}
    >
      {children}
    </Button>
  );
};
