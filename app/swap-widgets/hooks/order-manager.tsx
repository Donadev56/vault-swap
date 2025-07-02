"use client";
import {
  Chain,
  Token,
  Route,
  getRoutes,
  RoutesRequest,
  getStepTransaction,
  getStatus,
  TransactionRequest,
} from "@lifi/sdk";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { NumberFormatterUtils, ZeroAddress } from "../utils/utils";
import TransactionSigner from "../utils/signer";
import Web3 from "web3";
import { Web3Utils } from "../utils/web3-utils";
import { TokenStateFull } from "../utils/st-token";
import { v4 } from "uuid";
import { steps } from "framer-motion";

export enum Status {
  Done = "Done",
  Failed = "Failed",
  Pending = "Pending",
}

export type OrderStep = {
  name: string;
  description: string;
  transactionData: TransactionRequest;
  status: Status;
  id: string;
};

interface OrderManagerContextType {
  orderType: "swap" | "cross";
  amount: string;
  setAmount: (value: string) => void;
  orderId: string | undefined;
  destination: string | undefined;
  fromToken: Token | undefined;
  toToken: Token | undefined;
  fromChain: Chain | undefined;
  toChain: Chain | undefined;
  route: Route | undefined;
  currentStep: any;
  orderSteps: OrderStep[];
  trGeneratorState: TrnasactionHandlertype | undefined;
  trExeState: TrnasactionHandlertype | undefined;
  setRoute: (route: any) => void;
  setDestination: (value: string | undefined) => void;
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
  executeRouteSteps: () => Promise<void>;
  generateSteps: () => Promise<void>;
  createOrder: () => void;
  cleanOrder: () => void;
  lastTransactionHash?: string;
}
const initialState: OrderManagerContextType = {
  amount: "",
  setAmount: () => {},
  orderType: "swap",
  orderId: " ",
  destination: undefined,
  fromToken: undefined,
  toToken: undefined,
  fromChain: undefined,
  toChain: undefined,
  route: undefined,
  currentStep: undefined,
  orderSteps: [],
  trGeneratorState: undefined,
  trExeState: undefined,
  lastTransactionHash: undefined,
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
  executeRouteSteps: () => undefined as any,
  generateSteps: async () => {},
  createOrder: () => {},
  cleanOrder: () => {},
};
const OrderManagerContext =
  createContext<OrderManagerContextType>(initialState);

type TrnasactionHandlertype = { [orderId: string]: Status };

export const OrderManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState();
  const [orderSteps, setOrderSteps] = useState<OrderStep[]>([]);
  const [route, setRoute] = useState<Route>();
  const [destination, setDestination] = useState<string | undefined>();
  const [fromToken, setFromToken] = useState<Token | undefined>();
  const [toToken, setToToken] = useState<Token | undefined>();
  const [fromChain, setFromChain] = useState<Chain | undefined>();
  const [toChain, setToChain] = useState<Chain | undefined>();
  const [orderType, setOrderType] = useState<"swap" | "cross">("swap");
  const [orderId, setOrderId] = useState<string | undefined>();
  const [amount, setAmount] = useState("");
  const [routeLoading, setRouteLoading] = useState(false);
  const [trGeneratorState, setTrGeneratorState] =
    useState<TrnasactionHandlertype>();
  const [trExeState, setTrExeState] = useState<
    TrnasactionHandlertype | undefined
  >();
  const [lastTransactionHash, setlastTransactionHash] = useState("");

  function setOrderRoute(route: any) {
    setRoute(route);
  }
  function createOrder() {
    setOrderId(v4());
  }
  function cleanOrder() {
    setDestination(undefined);
    setRouteLoading(false);
    setOrderId(undefined);
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

  function updateTrGenState(state: Status, orderId: string) {
    setTrGeneratorState((prev) => {
      const previousState = { ...prev };
      if (previousState) {
        previousState[orderId] = state;
        return previousState;
      }
      return previousState;
    });
  }
  function updateTrExeState(state: Status, orderId: string) {
    setTrExeState((prev) => {
      const previousState = { ...prev };
      if (previousState) {
        previousState[orderId] = state;
        return previousState;
      }
      return previousState;
    });
  }
  async function generateSteps() {
    try {
      if (!orderId || !orderId.trim()) {
        throw Error("No Order Created ");
      }
      updateTrGenState(Status.Pending, orderId);
      setOrderSteps([]);
      if (!route) {
        throw Error("Route is not deifined");
      }
      if (!fromToken || !toToken) {
        throw Error("Step Error");
      }

      const rpc = await Web3Utils.getRpcUrlofchain(route.fromChainId);
      const web3 = new Web3(rpc);
      console.log({ stepslen: route.steps.length });

      for (const eachStep of route.steps) {
        const step = await getStepTransaction(eachStep);
        const isNative =
          route.fromToken.address.trim().toLowerCase() ===
          ZeroAddress.trim().toLowerCase();
        console.log({ isNative });
        if (!isNative) {
          const approvalAddress = step.estimate.approvalAddress;
          const tokenContract = new TokenStateFull(web3, fromToken.address);
          const allowance = await tokenContract.allowance(
            route.fromAddress || "",
            approvalAddress,
          );
          console.log({ allowance });
          if (
            typeof allowance === "bigint" &&
            allowance < BigInt(route.fromAmount)
          ) {
            console.log("Sending allowance request");
            const approvalRequest =
              await tokenContract.createApprovalTransaction({
                address: approvalAddress,
              });
            console.log({ approvalRequest });
            if (approvalRequest) {
              const newOrderStep: OrderStep = {
                name: fromToken.symbol + " spending approval",
                description: "Allow the contract to spend tokens",
                transactionData: approvalRequest,
                id: v4(),
                status: Status.Pending,
              };
              console.log(newOrderStep);
              setOrderSteps((prev) => [...prev, newOrderStep]);
            }
          }
        }
        const request = step.transactionRequest;
        if (!request) {
          throw Error("Request not found");
        }
        const newOrderStep: OrderStep = {
          name: "Sign swap transaction",
          description: "Sign Swap Transaction using " + step.tool,
          status: Status.Pending,
          transactionData: request,
          id: v4(),
        };

        setOrderSteps((prev) => [...prev, newOrderStep]);
        updateTrGenState(Status.Done, orderId);
      }
    } catch (error) {
      console.error(error);
      if (orderId) {
        updateTrGenState(Status.Failed, orderId);
      }
    }
  }

  function updateStepState(targetStep: OrderStep, status: Status) {
    setOrderSteps((prev) =>
      prev.map((step) =>
        step.id === targetStep.id ? { ...step, status } : step,
      ),
    );
  }
  async function executeRouteSteps() {
    try {
      if (!route) {
        throw Error("Route is not deifined");
      }
      if (!orderId) {
        throw Error("Order not created");
      }
      updateTrExeState(Status.Pending, orderId);

      const rpc = await Web3Utils.getRpcUrlofchain(route.fromChainId);
      const web3 = new Web3(rpc);
      const signer = new TransactionSigner(web3);
      let targetSteps: OrderStep[] = [];
      setOrderSteps((prev) => {
        if (prev) {
          targetSteps = [...prev];
        }
        return [...prev];
      });

      console.log({ targetSteps });
      for (const eachStep of targetSteps) {
        if (eachStep.status === Status.Done) {
          console.log("Transaction done");
          continue;
        }

        let hash = "";
        console.log("Sending transactiom :", eachStep.name + "\n");
        updateStepState(eachStep, Status.Pending);
        console.log("Sending transaction for :", eachStep.id);
        const response = await signer.sendTransaction(eachStep.transactionData);
        if (response.success) {
          hash = response.message;
        } else {
          updateStepState(eachStep, Status.Failed);
          throw Error(response.message);
        }
        if (hash) {
          console.log("Transaction hash :", hash);
          let status: BigInt | undefined;
          do {
            const response = await web3.eth.getTransactionReceipt(hash);
            if (response) {
              status = response.status;
            }

            console.log(`Transaction status for ${hash}:`, status);
            await new Promise((resolve) => setTimeout(resolve, 5000));
          } while (status === undefined);
          if (!status) {
            console.error(`Transaction ${hash} failed`);
            updateStepState(eachStep, Status.Failed);
            throw Error("Execution failed for step :" + eachStep.id);
          } else {
            setlastTransactionHash(hash);
            console.log("transaction executed :", eachStep.id);
            updateStepState(eachStep, Status.Done);
          }
        } else {
          throw Error("Transaction failed");
        }
      }

      cleanOrder();

      console.log("All steps executed successfully");

      updateTrExeState(Status.Done, orderId);
    } catch (error) {
      console.log(error);
      if (orderId) {
        updateTrExeState(Status.Failed, orderId);
      }
      throw error;
    }
  }

  const state: OrderManagerContextType = {
    lastTransactionHash,
    cleanOrder,
    createOrder,
    trExeState,
    trGeneratorState,
    generateSteps,
    orderSteps,
    executeRouteSteps,
    isBridge,
    routeLoading,
    toggleTokens,
    orderId,
    orderType,
    setOrderType,
    currentStep,
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
