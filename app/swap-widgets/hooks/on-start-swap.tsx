import { ExtendedChain } from "@lifi/sdk";
import { useModal } from "./modal-context";
import { CryptoAvatar } from "../components/ui/crypto-avatar";

import { useChains } from "./useChains";

import { StHeader } from "../components/ui/st-header";
import React from "react";
import {
  HeightCollapse,
  TranslateY,
} from "../components/ui/animated-components";
import {
  SwapInputCard,
  SwapInputContent,
  SwapInputTitle,
} from "../components/ui/swap-input";
import { useOrderManager } from "./order-manager";
import { MdAccessTimeFilled } from "react-icons/md";
import { ChevronDown, ChevronUp, WalletIcon } from "lucide-react";
import { NumberFormatterUtils } from "../utils/utils";
import { FaGasPump } from "react-icons/fa";
import { Button, IconButton } from "../components/ui/buttons";
import { FeeDetails } from "../components/fees-details";
import { Navigate } from "../routes/routes-utils";
import { SwapRoutes } from "../routes/routes";
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
