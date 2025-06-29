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

const indexes: { [key: string]: number } = {
  "#": 0,
  "#main": 0,
  "#selectChainTo": 1,
  "#selectChainFrom": 2,
  "#settings": 3,
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
  return (
    <ModalProvider>
      <ChainsProvider>
        <TokensProvider>
          <TagRouteProvider main="#" indexes={indexes}>
            <Page />
          </TagRouteProvider>
        </TokensProvider>
      </ChainsProvider>
    </ModalProvider>
  );
};
