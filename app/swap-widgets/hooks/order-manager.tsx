"use client";
import { Chain, Token, Route, getRoutes, RoutesRequest } from "@lifi/sdk";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useTokens } from "./useTokens";
import { parseUnits } from "ethers";
import useWeb3 from "./useWeb3";
import { NumberFormatterUtils } from "../utils/utils";

interface OrderManagerContextType {
  orderType: "swap" | "cross";
  amount: string;
  setAmount: (value: string) => void;
  orderId: string;
  destination: string | undefined;
  fromToken: Token | undefined;
  toToken: Token | undefined;
  fromChain: Chain | undefined;
  toChain: Chain | undefined;
  route: Route | undefined;
  RouteSteps: any[];
  currentStep: any;
  setRoute: (route: any) => void;
  setDestination: (address: string) => void;
  setCurrentStep: (value: any) => void;
  setFromToken: (token: Token | undefined) => void;
  setToToken: (token: Token | undefined) => void;
  setFromChain: (chain: Chain | undefined) => void;
  setToChain: (chain: Chain | undefined) => void;
  setOrderType: (type: "swap" | "cross") => void;
  toggleTokens: () => void;
  tokensFilled: () => boolean;
  fetchRoutes: (account: string) => Promise<Route[] | undefined>;
  routeLoading: boolean;
  isBridge: () => boolean;
}
const initialState: OrderManagerContextType = {
  amount: "",
  setAmount: () => {},
  orderType: "swap",
  orderId: " ",
  RouteSteps: [],
  destination: undefined,
  fromToken: undefined,
  toToken: undefined,
  fromChain: undefined,
  toChain: undefined,
  route: undefined,
  currentStep: undefined,
  setRoute: () => {},
  setDestination: () => {},
  setCurrentStep: () => {},
  setFromToken: () => {},
  setToToken: () => {},
  setFromChain: () => {},
  setToChain: () => {},
  setOrderType: () => {},
  toggleTokens: () => {},
  tokensFilled: () => false,
  fetchRoutes: () => undefined as any,
  isBridge: () => false,
  routeLoading: false,
};
const OrderManagerContext =
  createContext<OrderManagerContextType>(initialState);

export const OrderManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState();
  const [steps, setSteps] = useState([]);
  const [route, setRoute] = useState<Route>();
  const [destination, setDestination] = useState<string | undefined>();
  const [fromToken, setFromToken] = useState<Token | undefined>();
  const [toToken, setToToken] = useState<Token | undefined>();
  const [fromChain, setFromChain] = useState<Chain | undefined>();
  const [toChain, setToChain] = useState<Chain | undefined>();
  const [orderType, setOrderType] = useState<"swap" | "cross">("swap");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [routeLoading, setRouteLoading] = useState(false);
  function setOrderRoute(route: any) {
    setRoute(route);
  }

  function toggleTokens() {
    const tokenTo = toToken;
    const tokenFrom = fromToken;
    const chainTo = toChain;
    const chainFrom = fromChain;

    setFromChain(chainTo);
    setFromToken(tokenTo);
    setToChain(chainFrom);
    setToToken(tokenFrom);
  }

  async function fetchRoutes(account: string) {
    try {
      setRouteLoading(true);
      if (!tokensFilled()) {
        throw Error("Token from and to must be selected");
      }
      if (!amount.trim()) {
        throw Error("Amount not specified");
      }
      const toAddress = destination || account;
      if (fromChain && toChain && toToken && fromToken) {
        const params: RoutesRequest = {
          fromChainId: fromChain.id,
          toChainId: toChain.id,
          fromAmount: NumberFormatterUtils.toWei(
            amount,
            fromToken.decimals,
          ).toString(),
          fromTokenAddress: fromToken.address,
          toTokenAddress: toToken.address,
          fromAddress: account,
          toAddress: toAddress,
        };
        const routes = await getRoutes(params, {
          integrator: "donadev",
          fee: 0.025,
          order: "CHEAPEST",
        } as any);
        if (routes) {
          return routes.routes;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setRouteLoading(false);
    }
  }
  function tokensFilled() {
    return !!toToken && !!fromToken;
  }
  function isBridge() {
    return orderType === "cross";
  }

  useEffect(() => {
    if (orderType === "swap") {
      if (fromChain && fromChain.id !== toChain?.id) {
        setToChain(undefined);
        setToToken(undefined);
      }
    }
  }, [fromChain, toChain, orderType]);

  useEffect(() => {
    if (fromToken && toToken) {
      if (
        toToken.address.trim().toLowerCase() ===
          fromToken.address.trim().toLowerCase() &&
        toChain?.id == fromChain?.id
      ) {
        setToToken(fromToken);
        setFromToken(undefined);
      }
    }
  }, [fromChain, toChain, toToken, fromToken]);

  const state: OrderManagerContextType = {
    isBridge,
    routeLoading,
    toggleTokens,
    orderId,
    orderType,
    setOrderType,
    currentStep,
    RouteSteps: steps,
    route,
    destination,
    fromToken,
    toChain,
    fromChain,
    toToken,
    setRoute: setOrderRoute,
    setDestination,
    setCurrentStep,
    setFromToken,
    setToToken,
    setToChain,
    setFromChain,
    tokensFilled,
    amount,
    setAmount,
    fetchRoutes,
  };

  return (
    <OrderManagerContext.Provider value={state}>
      {children}
    </OrderManagerContext.Provider>
  );
};

export const useOrderManager = (): OrderManagerContextType => {
  const context = useContext(OrderManagerContext);
  if (!context) {
    throw new Error(
      "useOrderManager must be used within a OrderManagerContext",
    );
  }
  return context;
};
