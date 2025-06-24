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
  translateY = -20,
  children,
  isOpen,
  scale = 0.98,
  radius = 10,
}: CupertinoPageType) => {
  return (
    <div className="bg-[#000000] ">
      <motion.div
        style={{
          ...style,
        }}
        className={`${className} bg-[var(--bg-color)] overflow-hidden ${isOpen ? "rounded-2xl" : ""} flex w-full justify-center items-center flex-col h-full`}
        animate={{
          scale: isOpen ? scale : 1,
          translateY: isOpen ? translateY : 0,
          borderRadius: isOpen ? radius : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
