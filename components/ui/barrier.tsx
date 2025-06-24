import React from "react";
import styled from "styled-components";

export interface BarrierOverlayType {
  isOpen: boolean;
  toggleModalState: () => void;
  openZIndex?: number;
  closeZIndex?: number;
  openOpacity?: number;
  closeOpacity?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const BarrierOverlay = ({
  isOpen,
  toggleModalState,
  openZIndex = 1000,
  closeZIndex = -1,
  openOpacity = 1,
  closeOpacity = 0,
  style,
  children,
}: BarrierOverlayType) => {
  return (
    <BarrierStyles>
      <div
        onClick={() => toggleModalState()}
        style={{
          ...style,
          opacity: isOpen ? openOpacity : closeOpacity,
          zIndex: isOpen ? openZIndex : closeZIndex,
        }}
        className={`barrier-overlay all-transition `}
      >
        {children}
      </div>
    </BarrierStyles>
  );
};

export default BarrierOverlay;

const BarrierStyles = styled.div`
  .barrier-overlay {
    position: fixed;
    inset: 0px;
    cursor: pointer;
    transition: all 0.5s;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.695);
    z-index: 1000;
  }
`;
