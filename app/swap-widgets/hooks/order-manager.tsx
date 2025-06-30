"use client";
import { Chain, Token, Route } from "@lifi/sdk";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface OrderManagerContextType {
  orderType: "swap" | "cross";
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
}
const initialState: OrderManagerContextType = {
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
};
const OrderManagerContext =
  createContext<OrderManagerContextType>(initialState);

export const OrderManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState();
  const [steps, setSteps] = useState([]);
  const [route, setRoute] = useState<any>();
  const [destination, setDestination] = useState<string | undefined>();
  const [fromToken, setFromToken] = useState<Token | undefined>();
  const [toToken, setToToken] = useState<Token | undefined>();
  const [fromChain, setFromChain] = useState<Chain | undefined>();
  const [toChain, setToChain] = useState<Chain | undefined>();
  const [orderType, setOrderType] = useState<"swap" | "cross">("swap");
  const [orderId, setOrderId] = useState("");

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

  function tokensFilled() {
    return !!toToken && !!fromToken;
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
