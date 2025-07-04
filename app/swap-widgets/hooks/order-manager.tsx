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
import { SaveTransaction } from "@/app/server-actions/transaction-history";

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
  route?: Route;
  hash?: string;
  completedTime: number;
};

export interface OrderManagerContextType {
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
  executeRouteSteps: () => Promise<boolean>;
  generateSteps: () => Promise<void>;
  createOrder: () => void;
  cleanOrder: () => void;
  lastTransactionHash?: string;
  reCreateOrder(targetState: OrderManagerContextType): void;
  swapStateHistory: OrderManagerContextType[];
  deleteSwapState(id: string): void;
}
const initialState: OrderManagerContextType = {
  deleteSwapState: () => {},
  swapStateHistory: {} as any,
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
  reCreateOrder: () => {},
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
  const [swapStateHistory, setSwapStateHistory] = useState<
    OrderManagerContextType[]
  >([]);

  const [trExeState, setTrExeState] = useState<
    TrnasactionHandlertype | undefined
  >();
  const [lastTransactionHash, setlastTransactionHash] = useState("");
  const statekey = "vault-swap-app-state";
  console.log("Swap state :", swapStateHistory);

  useEffect(() => {
    setSwapStateHistory(getSwapStateList());
  }, []);

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

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
  const changeNetwork = async (chainId: number) => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
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
          integrator: "vswap.io",
          fee: 0.005,
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
      let approvalRequestAdded = false;

      let generatedSteps: OrderStep[] = [];

      for (let i = 0; i < route.steps.length; i++) {
        const eachStep = route.steps[i];
        const step = await getStepTransaction(eachStep);
        const isNative =
          route.fromToken.address.trim().toLowerCase() ===
          ZeroAddress.trim().toLowerCase();
        if (!isNative && !approvalRequestAdded) {
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
                route,
                completedTime: 0,
              };
              console.log(newOrderStep);
              generatedSteps.push(newOrderStep);
              approvalRequestAdded = true;
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
          route: route,
          completedTime: 0,
        };

        generatedSteps.push(newOrderStep);
      }

      if (generatedSteps.length == 0) {
        throw Error("No Step Generated \n Try again");
      }
      setOrderSteps(generatedSteps);
      console.log({ generatedSteps });
      updateTrGenState(Status.Done, orderId);
    } catch (error) {
      console.error(error);
      if (orderId) {
        updateTrGenState(Status.Failed, orderId);
      }
      throw error;
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
      saveSwapState(targetSteps);

      if (targetSteps.length == 0) {
        throw Error("No Step Generated\n Try Again");
      }
      for (let i = 0; i < targetSteps.length; i++) {
        const eachStep = targetSteps[i];
        if (eachStep.status === Status.Done) {
          console.log("Transaction done");
          continue;
        }

        let hash = "";
        console.log("Sending transactiom :", eachStep.name + "\n");
        updateStepState(eachStep, Status.Pending);
        console.log("Sending transaction for :", eachStep.id);
        const targetChainId = eachStep.transactionData.chainId;
        if (targetChainId) {
          await changeNetwork(targetChainId);
        }
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
          await sleep(1000);

          do {
            try {
              const response = await web3.eth.getTransactionReceipt(hash);
              if (response) {
                status = response.status;
              }
            } catch (error) {
              console.error(error);
            }

            console.log(`Transaction status for ${hash}:`, status);
            await new Promise((resolve) => setTimeout(resolve, 5000));
          } while (status === undefined);
          if (!status) {
            console.error(`Transaction ${hash} failed`);
            updateStepState(eachStep, Status.Failed);
            throw Error("Execution failed for step :" + eachStep.id);
          } else {
            if (i === targetSteps.length - 1) {
              deleteSwapState(orderId);
              saveTransaction(eachStep, hash);
            }
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

      return true;
    } catch (error) {
      console.log(error);
      if (orderId) {
        updateTrExeState(Status.Failed, orderId);
      }
      throw error;
    }
  }

  async function saveTransaction(step: OrderStep, hash: string) {
    try {
      await SaveTransaction({
        ...step,
        hash: hash,
        completedTime: Number((Date.now() / 1000).toFixed(0)),
      });
    } catch (error) {
      console.error(error);
    }
  }

  const state: OrderManagerContextType = {
    deleteSwapState,
    swapStateHistory,
    reCreateOrder,
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

  function saveSwapState(steps: OrderStep[]) {
    try {
      setOrderSteps((prev) => {
        steps = [...prev];
        return steps;
      });
      const appState = [{ ...state, orderSteps: steps }];
      setSwapStateHistory(appState);
      if (localStorage !== undefined) {
        localStorage.setItem(statekey, JSON.stringify(appState));
      }
    } catch (error) {
      console.error(error);
    }
  }

  function getSwapStateList(): OrderManagerContextType[] {
    try {
      if (localStorage !== undefined) {
        return JSON.parse(localStorage.getItem(statekey) || "[]") || [];
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  function deleteSwapState(id: string) {
    try {
      const states = getSwapStateList();
      if (states.length === 0) {
        return;
      }
      const newStates = states.filter(
        (e) =>
          e.orderId?.trim().toLocaleLowerCase() !== id.trim().toLowerCase(),
      );
      setSwapStateHistory(newStates);
      localStorage.setItem(statekey, JSON.stringify(newStates));
    } catch (error) {
      console.error(error);
    }
  }
  function reCreateOrder(targetState: OrderManagerContextType) {
    setRoute(targetState.route);
    setAmount(targetState.amount);
    setDestination(targetState.destination);
    setOrderId(targetState.orderId);
    setFromChain(targetState.fromChain);
    setToChain(targetState.toChain);
    setOrderType(targetState.orderType);
    setToToken(targetState.toToken);
    setFromToken(targetState.fromToken);
  }
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
