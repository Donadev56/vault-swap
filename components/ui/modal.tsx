import React from "react";
import styled from "styled-components";
export const ElementOpen = "element-open";
export const ElementClose = "element-close";

export interface ModalSheetType {
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  ContentTopSpace?: string;
  barrierStyle?: React.CSSProperties;
  header?: React.ReactNode;
  open: boolean;
}

const ModalBottomSheet = ({
  containerStyle,
  children,
  className,
  header,
  open,

  ContentTopSpace = "0px",
}: ModalSheetType) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [open]);
  return (
    <ModalSheetStyle>
      <div
        style={{
          ...containerStyle,
          maxHeight: containerStyle?.maxHeight,
        }}
        className={` ${className} ${open ? ElementOpen : ElementClose} z-[1300] all-transition fixed bottom-0 left-0 right-0`}
      >
        <div className="sheet-body relative  gap-[10px] w-full h-full  flex flex-col justify-center items-center ">
          <div className="header flex-col justify-center items-center flex gap-[10px] w-full ">
            {header}
          </div>

          <div
            style={{
              marginTop: ContentTopSpace,
            }}
            className="flex  flex-col w-full justify-center items-center p-[15px]"
          >
            {children ?? "Add Children to build Modal"}
          </div>
        </div>
      </div>
    </ModalSheetStyle>
  );
};

export default ModalBottomSheet;

const ModalSheetStyle = styled.div`
  .element-open {
    transform: translateY(0);
  }

  .element-close {
    transform: translateY(120%);
  }

  .all-transition {
    transition: all 0.5s;
  }
`;
