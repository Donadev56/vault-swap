"ue client";

import { Route } from "@lifi/sdk";
import { useOrderManager } from "../hooks/order-manager";
import {
  SwapInputCard,
  SwapInputContent,
  SwapInputTitle,
} from "./ui/swap-input";
import { CryptoAvatar } from "./ui/crypto-avatar";
import { NumberFormatterUtils } from "../utils/utils";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { FaGasPump } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { cn } from "@/lib/utils";
import { TranslateY } from "./ui/animated-components";

type SwapCardDiv = React.ComponentProps<typeof SwapInputCard>;
interface RouteRendererDiv extends SwapCardDiv {
  route: Route;
  isBestReturn: boolean;
  isToChainAvailable: boolean;
  isToTokenAvailable: boolean;
}
const RouteCard = ({
  route,
  isToChainAvailable,
  isToTokenAvailable,
  className,
  isBestReturn,
  ...props
}: RouteRendererDiv) => {
  const orderManager = useOrderManager();
  const config = useCustomLifiConfig();

  function calculatePercent(value: string, newValue: string) {
    const percent = NumberFormatterUtils.calculatePercent(
      Number(value),
      Number(newValue),
    );
    return percent;
  }

  return (
    <SwapInputCard {...props} className={cn("overflow-hidden", className)}>
      <SwapInputTitle>Receive</SwapInputTitle>
      <TranslateY condition={isBestReturn}>
        <div className="px-2 text-[13px] py-1 ">
          <div
            style={{
              backgroundColor: `${config.themeColor}20`,
              color: config.themeColor,
            }}
            className="flex px-4 py-1 justify-center rounded-3xl items-center "
          >
            Best Return
          </div>
        </div>
      </TranslateY>
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
        <div
          data-slot="swap-main-element"
          className="flex ml-2 flex-col justify-center"
        >
          <div className="font-bold text-foreground text-[24px]">
            {NumberFormatterUtils.toEth(
              BigInt(route.toAmount ?? 0),
              route.toToken?.decimals || 0,
            )}
          </div>
          <div className="flex items-center text-[13px] gap-2">
            <div>${route.toAmountUSD}</div>

            <div>•</div>

            <div>
              {calculatePercent(route.fromAmountUSD, route.toAmountUSD)}%
            </div>
            <div>•</div>

            <div className="flex truncate gap-2 items-center ">
              <img
                className="w-[25px] min-w-[25px] min-h-[25px] h-[25px] rounded-full "
                src={route.steps[0]?.toolDetails.logoURI}
                alt=""
              />{" "}
              <div className="truncate text-[12px] max-w-full">
                {route.steps[0]?.toolDetails?.name?.split(" ")[0]}
              </div>
            </div>
          </div>
        </div>
      </SwapInputContent>

      <div className="px-2 py-2 flex w-full justify-between items-center">
        <div className="text-[12px] text-muted-foreground font-[500]">
          1 {orderManager.fromToken?.symbol} ≈{" "}
          {NumberFormatterUtils.formatNumber(
            Number(orderManager.fromToken?.priceUSD || "0") /
              Number(orderManager.toToken?.priceUSD || "0"),
          )}{" "}
          {orderManager.toToken?.symbol}
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <div>
              <FaGasPump />
            </div>
            <div className="text-muted-foreground text-[12px] font-[600]">
              {Number(route.gasCostUSD || 0) > 0.01
                ? `$${route.gasCostUSD}`
                : "<$0.01"}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <MdAccessTimeFilled />
            </div>
            <div className="text-muted-foreground text-[12px] font-[600]">
              {route.steps[0]?.estimate.executionDuration}S
            </div>
          </div>
        </div>
      </div>
    </SwapInputCard>
  );
};

const RouteCardSkeleton = ({ className, ...props }: SwapCardDiv) => {
  return (
    <SwapInputCard
      {...props}
      className={cn("overflow-hidden animate-pulse", className)}
    >
      {/* Title */}
      <SwapInputTitle>Receive</SwapInputTitle>

      {/* Best Return Badge */}
      <div className="px-2 py-1 text-[13px]">
        <div className="flex px-4 py-1 justify-center rounded-3xl items-center bg-muted text-muted-foreground w-[100px] h-[24px] mx-auto">
          &nbsp;
        </div>
      </div>

      {/* Swap Info Content */}
      <SwapInputContent>
        <div className="w-[40px] h-[40px] rounded-full bg-muted" />
        <div className="flex ml-2 flex-col justify-center gap-2 w-full">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="flex items-center text-[13px] gap-2">
            <div className="h-4 w-10 bg-muted rounded" />
            <div className="h-4 w-1 bg-muted rounded" />
            <div className="h-4 w-8 bg-muted rounded" />
            <div className="h-4 w-1 bg-muted rounded" />
            <div className="flex gap-2 items-center">
              <div className="w-[25px] h-[25px] rounded-full bg-muted" />
              <div className="h-4 w-[80px] bg-muted rounded" />
            </div>
          </div>
        </div>
      </SwapInputContent>

      {/* Footer Info */}
      <div className="px-2 py-2 flex w-full justify-between items-center">
        <div className="h-4 w-1/2 bg-muted rounded" />
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <FaGasPump className="text-muted" />
            <div className="h-4 w-10 bg-muted rounded" />
          </div>
          <div className="flex gap-2 items-center">
            <MdAccessTimeFilled className="text-muted" />
            <div className="h-4 w-10 bg-muted rounded" />
          </div>
        </div>
      </div>
    </SwapInputCard>
  );
};

export { RouteCard, RouteCardSkeleton };
