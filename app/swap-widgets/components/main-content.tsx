"use client";
import { v4 as uuid } from "uuid";
import { AlertCircleIcon, ArrowDown, EyeClosed, Trash2 } from "lucide-react";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import {
  SwapInputCard,
  SwapInputContent,
  SwapInputTitle,
} from "./ui/swap-input";
import WalletIcon from "@mui/icons-material/Wallet";
import { SwapRoutes } from "../routes/routes";
import { useOrderManager } from "../hooks/order-manager";
import React, { useEffect, useRef } from "react";
import { NumberFormatterUtils } from "../utils/utils";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { useTokens } from "../hooks/useTokens";
import useWeb3 from "../hooks/useWeb3";
import { GasCost, Route, TokenAmount } from "@lifi/widget";
import { formatUnits } from "ethers";
import { AnimatePresence, motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Blur, TranslateY } from "./ui/animated-components";
import { toast } from "sonner";
import { FaGasPump } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { RouteCard, RouteCardSkeleton } from "./routeRenderer";
import { ConnectButton, IconButton } from "./ui/buttons";
import { MainActionButton } from "./ui/main-action-button";
import { Button } from "./ui/buttons";
import { title } from "process";
import { order } from "@mui/system";
import { useOnReviewSwap } from "../hooks/on-review-swap";
import { Navigate } from "../routes/routes-utils";
import { useModal } from "../hooks/modal-context";
import { useOnStartSwap } from "../hooks/on-start-swap";
import { IoIosArrowForward } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { SwapHistoryCard } from "./swap-history-card";

export const MainContent = ({ bridge = false }: { bridge?: boolean }) => {
  const orderManager = useOrderManager();
  const { amount, setAmount } = useOrderManager();
  const config = useCustomLifiConfig();
  const [fromBalance, setFromBalance] = React.useState<TokenAmount | null>(
    null,
  );
  const [useExternalWallet, setUseExternalWallet] = React.useState(false);
  const amountUI = React.useMemo(() => {
    return formatUnits(fromBalance?.amount ?? BigInt(0), fromBalance?.decimals);
  }, [fromBalance]);
  const tokens = useTokens();

  const web3 = useWeb3();
  const requestIdRef = useRef("");
  const [error, setError] = React.useState<{ title: string; desc: string }>();
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const onReviewSwap = useOnReviewSwap();
  const onStartSwap = useOnStartSwap();
  const [showOrderHistory, setShowOrderHistory] = React.useState(true);
  const isFromTokenAvailable = !!orderManager.fromToken;
  const isFromChainAvailable = !!orderManager.fromChain;
  const isToTokenAvailable = !!orderManager.toToken;
  const isToChainAvailable = !!orderManager.toChain;

  const getBalance = async () => {
    try {
      const balance = await tokens.balanceOf(
        web3.account as any,
        orderManager?.fromToken as any,
      );
      if (balance) {
        setFromBalance(balance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRoutes = async () => {
    try {
      if (!web3.isConnected) {
        throw Error("Not Connected to Web3");
      }
      const newId = uuid();
      requestIdRef.current = newId;
      const isSufficient = await tokens.isBalanceSufficient(amount);
      if (!isSufficient) {
        setError({
          title: "Amount exceeds the balance",
          desc: "You don't have enough funds to complete the transaction.",
        });
        return;
      } else {
        setError(undefined);
      }
      const results = await orderManager.fetchRoutes(web3.account);
      if (results) {
        console.log("Routes :", results);
        if (newId !== requestIdRef.current) {
          //console.warn("Request changed")
          return;
        }
        if (results.length == 0) {
          setError({
            title: "No routes available",
            desc: "Reasons for that could be: low liquidity, amount selected is too low, gas costs are too high or there are no routes for the selected combination.",
          });
          return;
        }
        setError(undefined);
        setRoutes(results);
        return;
      }
      throw Error("An error occured while fetching routes");
    } catch (error) {
      console.error(error);
      toast.error((error as any).toString());
    }
  };
  React.useEffect(() => {
    if (orderManager.tokensFilled() && Number(amount) > 0) {
      getRoutes();
    }
  }, [amount, orderManager.destination]);
  useEffect(() => {
    if (orderManager.fromToken !== undefined) {
      getBalance();
    }
  }, [
    orderManager.fromToken,
    orderManager.orderId,
    orderManager.orderSteps,
    orderManager.routeLoading,
  ]);

  function getButtonState() {
    let state: {
      title: string;
      onClick: () => any | undefined;
      onSubmit: () => any | undefined;
    } = {
      title: "Connect Wallet",
      onClick: connect,
      onSubmit: undefined as any,
    };
    if (!web3.isConnected) {
      return state;
    } else {
      if (orderManager.routeLoading) {
        return { title: "Loading..." };
      } else {
        if (routes.length == 0 || amount.length == 0 || Number(amount) === 0) {
          return {
            title: orderManager.isBridge() ? "Bridge" : "Swap",
            onClick: getRoutes,
          };
        } else {
          return { title: "Review Swap", onSubmit: onReviewSwap };
        }
      }
    }
  }
  async function connect() {
    try {
      await web3.connect();
    } catch (error) {
      toast.error((error as any).toString());
    }
  }

  function onContinue() {
    orderManager.createOrder();
    console.log(orderManager.orderId);
    onStartSwap();
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex  w-full justify-center flex-col gap-2">
        <TranslateY
          condition={
            showOrderHistory && orderManager.swapStateHistory.length > 0
          }
        >
          <div>
            {orderManager.swapStateHistory.map((e) => {
              return (
                <SwapHistoryCard
                  order={e}
                  onHide={() => setShowOrderHistory(false)}
                />
              );
            })}
          </div>
        </TranslateY>
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
                    onClick={() =>
                      setAmount(
                        NumberFormatterUtils.formatNumber(Number(amountUI)),
                      )
                    }
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
                <div className="text-[13px]">
                  $
                  {NumberFormatterUtils.formatNumber(
                    Number(amount) *
                      (Number(orderManager.fromToken?.priceUSD) ?? 0),
                  )}
                </div>
                {orderManager.tokensFilled() && (
                  <div className="px-2">
                    / {NumberFormatterUtils.formatNumber(Number(amountUI))}
                  </div>
                )}
              </div>
            </div>
          </SwapInputContent>
        </SwapInputCard>
      </div>

      <TranslateY condition={!!error}>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{error && error.title}</AlertTitle>
          {error && error.desc && (
            <AlertDescription>{error.desc}</AlertDescription>
          )}
        </Alert>
      </TranslateY>

      <TranslateY condition={!!useExternalWallet}>
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
                  value={orderManager.destination}
                  onChange={(e) => orderManager.setDestination(e.target.value)}
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Enter Wallet Address"
                  className="outline-none  text-[18px] w-full text-foreground font-bold  "
                />
              </div>
            </SwapInputContent>
          </SwapInputCard>
        </div>
      </TranslateY>

      <TranslateY
        condition={
          Number(amount) > 0 &&
          orderManager.tokensFilled() &&
          routes.length > 0 &&
          !error
        }
      >
        {orderManager.routeLoading ? (
          <RouteCardSkeleton />
        ) : (
          <RouteCard
            isBestReturn={true}
            route={routes[0]}
            isToTokenAvailable={isToTokenAvailable}
            isToChainAvailable={isToChainAvailable}
          />
        )}
      </TranslateY>

      <div
        data-slot="bottom-swap-button"
        className="flex mt-2 w-full max-w-[100%] gap-2"
      >
        <Button
          style={{ fontWeight: "bold", fontSize: "17px" }}
          onClick={() => {
            const onSubmit = getButtonState().onSubmit;
            if (onSubmit) {
              orderManager.setRoute(routes[0]);
              onSubmit({
                onContinue: onContinue,
              });
            }
            const onClick = getButtonState().onClick;
            if (onClick) {
              onClick();
            }
          }}
        >
          {getButtonState().title}
        </Button>

        <IconButton
          size={45 as any}
          onClick={() => {
            if (useExternalWallet) {
              orderManager.setDestination(undefined);
            }
            setUseExternalWallet(!useExternalWallet);
          }}
          style={{
            backgroundColor: !useExternalWallet
              ? `${config.themeColor}20`
              : config.themeColor,
            color: !useExternalWallet ? config.themeColor : "var(--background)",

            borderRadius: 10,
          }}
        >
          <WalletIcon />
        </IconButton>
      </div>
    </div>
  );
};
