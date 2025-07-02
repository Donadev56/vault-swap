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

export function useOnReviewSwap() {
  const modalState = useModal();
  const chains = useChains();

  function onReviewSwap({ onContinue }: { onContinue?: () => void }) {
    const ModalContent = () => {
      const { route, isBridge, fromChain, toChain, createOrder } =
        useOrderManager();

      return (
        <div className="flex w-full all-tr flex-col px-2  gap-2 items-center">
          <TranslateY
            className="w-full flex flex-col gap-2 "
            condition={!!route}
          >
            {route && (
              <div className="w-full flex flex-col gap-2 ">
                <SwapInputCard className="w-full">
                  <SwapInputTitle className="flex w-full justify-between items-center">
                    <div className="font-bold">
                      {isBridge() ? "Swap and Bridge" : "Swap"}
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <MdAccessTimeFilled />
                      </div>
                      <div className="text-muted-foreground text-[12px] font-[600]">
                        {route.steps[0]?.estimate.executionDuration}S
                      </div>
                    </div>
                  </SwapInputTitle>
                  <div className="flex gap-2 flex-col items-center">
                    <SwapInputContent>
                      <div data-slot="swap-avatar" className="">
                        <CryptoAvatar
                          token={route.fromToken}
                          chain={fromChain as any}
                          size={40}
                        />
                      </div>
                      <div data-slot="swap-main-element" className="w-full">
                        <div className="font-bold text-foreground text-[20px]">
                          {NumberFormatterUtils.toEth(
                            BigInt(route.fromAmount),
                            route.fromToken.decimals,
                          )}
                        </div>
                        <div className="flex items-center text-[13px] gap-2">
                          <div>${route.fromAmountUSD}</div>

                          <div>•</div>

                          <div>
                            {route.fromToken.symbol} on {fromChain?.name}
                          </div>
                        </div>
                      </div>
                    </SwapInputContent>{" "}
                    <SwapInputContent>
                      <div data-slot="swap-avatar" className="">
                        <CryptoAvatar
                          size={40}
                          useSkeletonChain={false}
                          logoUri={route.steps[0]?.toolDetails.logoURI}
                        />
                      </div>
                      <div data-slot="swap-main-element" className="w-full">
                        <div className="font-bold text-foreground text-[20px]">
                          {route.steps[0].toolDetails.name}
                        </div>
                      </div>
                    </SwapInputContent>{" "}
                    <SwapInputContent>
                      <div data-slot="swap-avatar" className="">
                        <CryptoAvatar
                          token={route.toToken}
                          chain={toChain as any}
                          size={40}
                        />
                      </div>
                      <div data-slot="swap-main-element" className="w-full">
                        <div className="font-bold text-foreground text-[20px]">
                          {NumberFormatterUtils.toEth(
                            BigInt(route.toAmount),
                            route.toToken.decimals,
                          )}
                        </div>
                        <div className="flex items-center text-[13px] gap-2">
                          <div>${route.toAmountUSD}</div>

                          <div>•</div>

                          <div>
                            {route.toToken.symbol} on {toChain?.name}
                          </div>
                        </div>
                      </div>
                    </SwapInputContent>
                  </div>
                </SwapInputCard>
                <FeeDetails route={route} />
                <Button
                  onClick={onContinue}
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Start Swapping
                </Button>
              </div>
            )}
          </TranslateY>
        </div>
      );
    };
    modalState.showModal({
      canScroll: true,
      className: "max-h-[90%] all-tr  overflow-y-hidden",
      containerStyle: {
        backgroundColor: "var(--background)",
      },

      header: (
        <div className="px-3.5 pt-2 w-full">
          {" "}
          <StHeader onBack={modalState.hideModal} title={"Review swap"} />
        </div>
      ),

      children: <ModalContent />,
    });
  }

  return onReviewSwap;
}
