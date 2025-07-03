import { useModal } from "./modal-context";

import React from "react";

import { TransactionView } from "../components/transaction-view";

export function useOnStartSwap() {
  const modalState = useModal();

  function OnStartSwap() {
    modalState.showModal({
      canScroll: true,
      className: "max-h-[100%] min-h-[100%] all-tr h-full overflow-y-hidden",
      containerStyle: {
        backgroundColor: "var(--background)",
        height: "100%",
      },
      mainContentStyle: {
        height: "100%",
        overflowY: "scroll",
      },
      children: <TransactionView />,
    });
  }

  return OnStartSwap;
}
