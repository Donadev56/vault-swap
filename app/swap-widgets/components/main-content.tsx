import { ArrowDown } from "lucide-react";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import {
  SwapInputCard,
  SwapInputContent,
  SwapInputTitle,
} from "../components/ui/sawp-input";
import WalletIcon from "@mui/icons-material/Wallet";
import { SwapRoutes } from "../routes/routes";
import { useOrderManager } from "../hooks/order-manager";
import React from "react";
import { NumberFormatterUtils } from "../utils/utils";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";

export const MainContent = ({
  bridge = false,
  useExternalWallet,
}: {
  bridge?: boolean;
  useExternalWallet?: boolean;
}) => {
  const orderManager = useOrderManager();
  const config = useCustomLifiConfig();
  const [amount, setAmount] = React.useState("");
  const [fromBalance, setFromBalance] = React.useState(0);
  const isFromTokenAvailable = !!orderManager.fromToken;
  const isFromChainAvailable = !!orderManager.fromChain;
  const isToTokenAvailable = !!orderManager.toToken;
  const isToChainAvailable = !!orderManager.toChain;
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex  w-full justify-center flex-col gap-2">
        <a href={SwapRoutes.selectChainFrom}>
          <SwapInputCard className="cursor-pointer bg-hover hover:bg-[var(--card-hover-color)] ">
            <SwapInputTitle>From</SwapInputTitle>
            <SwapInputContent>
              <div data-slot="swap-avatar" className="">
                <CryptoAvatar
                  token={orderManager.fromToken}
                  chain={orderManager.fromChain as any}
                  useSkeletonChain={!isFromChainAvailable}
                  useSkeletonToken={!isFromTokenAvailable}
                  size={40}
                />
              </div>
              <div data-slot="swap-main-element" className="">
                {isFromChainAvailable && isFromTokenAvailable ? (
                  <div>
                    <div className="flex text-foreground font-bold w-full flex-col ">
                      {orderManager?.fromToken?.symbol || ""}
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      {orderManager?.fromChain?.name || ""}
                    </div>
                  </div>
                ) : (
                  <div>Select Chain and Token</div>
                )}
              </div>
            </SwapInputContent>
          </SwapInputCard>
        </a>
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => orderManager.toggleTokens()}
            className="w-[30px] min-w-[30px] scale-95 bg-background flex mt-[-15px] mb-[-15px] items-center justify-center min-h-[30px] h-[30%] border rounded-full "
          >
            <ArrowDown size={18} />
          </div>
        </div>
        <a href={SwapRoutes.selectChainTo}>
          <SwapInputCard className="cursor-pointer  bg-hover hover:bg-[var(--card-hover-color)] ">
            <SwapInputTitle>To</SwapInputTitle>
            <SwapInputContent>
              <div data-slot="swap-avatar" className="">
                <CryptoAvatar
                  token={orderManager.toToken}
                  chain={orderManager.toChain as any}
                  useSkeletonChain={!isToChainAvailable}
                  useSkeletonToken={!isToTokenAvailable}
                  size={40}
                />
              </div>
              <div data-slot="swap-main-element" className="">
                {isToTokenAvailable && isToChainAvailable ? (
                  <div className="flex w-full flex-col ">
                    <div className="flex text-foreground font-bold w-full flex-col ">
                      {orderManager?.toToken?.symbol || ""}
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      {orderManager?.toChain?.name || ""}
                    </div>
                  </div>
                ) : (
                  <div>
                    {bridge ? "Select Chain and Token" : "Select Token"}
                  </div>
                )}
              </div>
            </SwapInputContent>
          </SwapInputCard>
        </a>
      </div>

      <div>
        <SwapInputCard className="">
          <SwapInputTitle>Send</SwapInputTitle>
          <SwapInputContent>
            <div data-slot="swap-avatar" className="">
              <CryptoAvatar
                token={orderManager.fromToken}
                chain={orderManager.fromChain as any}
                useSkeletonChain={!isFromChainAvailable}
                useSkeletonToken={!isFromTokenAvailable}
                size={40}
              />
            </div>
            <div
              data-slot="swap-main-element"
              className="w-full flex flex-col gap-1"
            >
              <div className="flex justify-between gap-2">
                <input
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length == 0) {
                      setAmount("" as any);
                    }
                    if (!NumberFormatterUtils.isNumeric(value)) {
                      return;
                    }
                    setAmount(value);
                  }}
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="0"
                  className="outline-none  text-[20px] w-full text-foreground font-bold  "
                />
                {orderManager.tokensFilled() && (
                  <div
                    style={{
                      backgroundColor: `${config.themeColor}10`,
                      color: config.themeColor,
                    }}
                    className=" text-[14px] cursor-pointer  all-tr active:scale-95 px-2 py-1 rounded-3xl"
                  >
                    max
                  </div>
                )}
              </div>
              <div className="flex w-full justify-between text-[13px]">
                <div className="text-[13px]">$0.00</div>
                {orderManager.tokensFilled() && (
                  <div className="px-2">/ 0.0</div>
                )}
              </div>
            </div>
          </SwapInputContent>
        </SwapInputCard>
      </div>
      {useExternalWallet && (
        <div>
          <SwapInputCard className="border-dashed">
            <SwapInputTitle>Send To Wallet</SwapInputTitle>
            <SwapInputContent>
              <div data-slot="swap-avatar" className="">
                <div className="w-[35px] min-h-[35px] min-w-[35px] border-dashed flex items-center justify-center  h-[35px] border   rounded-[10px] ">
                  <WalletIcon style={{ width: 20 }} />
                </div>
              </div>
              <div data-slot="swap-main-element" className="w-full">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Enter Wallet Address"
                  className="outline-none  text-[18px] w-full text-foreground font-bold  "
                />
              </div>
            </SwapInputContent>
          </SwapInputCard>
        </div>
      )}
    </div>
  );
};
