"use client";

import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";

import { BrowserRouter } from "react-router-dom";
import { TagRouteProvider, useTagRouter } from "@/hooks/useTagRoute";
import React from "react";
import { MainSwapView } from "./pages/main-view";
import { SelectChainFrom, SelectChainTo } from "./pages/select-chain-view";
import { motion } from "motion/react";
import { SwapSetting } from "./pages/setting";
import { ChainsProvider } from "./hooks/useChains";
import { TokensProvider } from "./hooks/useTokens";
import { ModalProvider, useModal } from "./hooks/modal-context";
import { CupertinoPage } from "@/components/ui/cupertino-page";
import BarrierOverlay from "@/components/ui/barrier";
import { Web3Provider } from "./hooks/useWeb3";
import { useOrderManager } from "./hooks/order-manager";
import { RpcUrls } from "@/lib/utils";
import { Web3Utils } from "./utils/web3-utils";
import { TransactionView } from "./components/transaction-view";

const indexes: { [key: string]: number } = {
  "#": 0,
  "#main": 0,
  "#selectChainTo": 1,
  "#selectChainFrom": 2,
  "#settings": 3,
  "#transactionView": 4,
};

const Page = () => {
  const { LifiConfig } = useCustomLifiConfig();
  const modalState = useModal();
  const router = useTagRouter();
  const pages = [
    MainSwapView(),
    SelectChainTo(),
    SelectChainFrom(),
    SwapSetting(),
    TransactionView(),
  ];
  const pageVariants = {
    initial: { x: 50 },
    animate: { x: 0 },
  };

  const pageTransition = {
    duration: 0.25,
  };
  return (
    <main
      style={{
        backgroundColor: (
          LifiConfig.theme?.colorSchemes?.dark?.palette?.primary as any
        )?.main,
      }}
      className="flex w-full all-tr pt-30 pb-[40px] rounded-b-3xl justify-center   items-center"
    >
      <div className=" flex rounded-2xl  all-tr  max-w-[90%] overflow-x-hidden justify-center  flex-1  items-center">
        <div className="p-2 flex rounded-2xl relative  all-tr w-full  bg-background max-w-[416px] overflow-x-hidden  flex-1  items-center">
          <CupertinoPage isOpen={modalState.isOpen}>
            <motion.div
              key={router.pageIndex}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full  flex  justify-center items-center flex-1 "
            >
              {pages[router.pageIndex]}
            </motion.div>

            <BarrierOverlay
              style={{ position: "absolute" }}
              isOpen={modalState.isOpen}
              toggleModalState={modalState.hideModal}
            />
          </CupertinoPage>

          <div id="swap-modal-element"></div>
        </div>
      </div>
    </main>
  );
};

export const MainWidget = () => {
  const orderManager = useOrderManager();
  const chainId = React.useMemo(
    () => orderManager.fromChain?.id || 1,
    [orderManager.fromChain?.id],
  );
  const rpcUrls = React.useMemo(() => RpcUrls[chainId] || [], [chainId]);

  return (
    <Web3Provider chainId={chainId} rpcUrls={rpcUrls}>
      <ModalProvider>
        <ChainsProvider>
          <TokensProvider>
            <TagRouteProvider main="#" indexes={indexes}>
              <Page />
            </TagRouteProvider>
          </TokensProvider>
        </ChainsProvider>
      </ModalProvider>
    </Web3Provider>
  );
};
