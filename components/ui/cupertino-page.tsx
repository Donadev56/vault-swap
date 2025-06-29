import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export type CupertinoPageType = {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  scale?: number;
  translateY?: number;
  radius?: number;
};

export const CupertinoPage = ({
  style,
  className,
  translateY = -15,
  children,
  isOpen,
  scale = 0.9,
  radius = 10,
}: CupertinoPageType) => {
  return (
    <motion.div
      style={{
        ...style,
      }}
      className={cn(
        ` bg-[var(--bg-color)] overflow-hidden ${isOpen ? "rounded-2xl" : ""} flex w-full justify-center items-center flex-col h-full`,
        className,
      )}
      animate={{
        scale: isOpen ? scale : 1,
        translateY: isOpen ? translateY : 0,
        borderRadius: isOpen ? radius : 0,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};
