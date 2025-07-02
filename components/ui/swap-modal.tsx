import { cn } from "@/lib/utils";
import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export const ElementOpen = "element-open";
export const ElementClose = "element-close";

export interface ModalSheetType {
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  barrierStyle?: React.CSSProperties;
  header?: React.ReactNode;
  open: boolean;
  canScroll?: boolean;
  mainContentStyle?: React.CSSProperties;
}

const ModalBottomSheet = ({
  containerStyle,
  children,
  className,
  header,
  open,
  canScroll = false,
  mainContentStyle,
}: ModalSheetType) => {
  React.useEffect(() => {
    if (!canScroll) document.body.style.overflow = open ? "hidden" : "scroll";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ ...containerStyle }}
          className={cn("z-[1200] absolute bottom-0 left-0 right-0", className)}
        >
          <div className="sheet-body relative gap-[10px] w-full h-full flex flex-col justify-center items-center">
            <div className="header flex-col justify-center items-center flex gap-[10px] w-full">
              {header}
            </div>

            <div
              style={mainContentStyle}
              className="flex flex-col w-full justify-center items-center p-[15px]"
            >
              {children ?? "Add Children to build Modal"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalBottomSheet;
