"use client";
import ModalBottomSheet, { ModalSheetType } from "@/components/ui/swap-modal";
import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

type ModalContentProps = Omit<ModalSheetType, "open">;

interface ModalContextType {
  showModal: (content: ModalContentProps) => void;
  hideModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentProps>({});
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const target = document.getElementById("swap-modal-element");
    if (target) {
      setPortalElement(target);
    } else {
      console.warn("Portal target #swap-modal-element not found in DOM.");
    }
  }, []);

  const showModal = (content: ModalContentProps) => {
    if (isOpen) {
      setIsOpen(false);
    }
    setModalContent(content);
    setTimeout(() => {
      setIsOpen(true);
    }, 50);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalContent({});
  };

  const modal = <ModalBottomSheet open={isOpen} {...modalContent} />;
  return (
    <ModalContext.Provider value={{ showModal, hideModal, isOpen }}>
      {children}
      {portalElement ? ReactDOM.createPortal(modal, portalElement) : null}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
