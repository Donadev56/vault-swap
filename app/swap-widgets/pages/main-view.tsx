import StAppbar from "@/components/ui/st-app-bar";
import { Card } from "../../../components/ui/card";
import { SwapRoutes } from "../routes/routes";
import {
  ConnectWalletButtonHeader,
  ConnectButton,
  IconButton,
} from "../components/ui/buttons";
import { Settings2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MainActionButton } from "../components/ui/main-action-button";
import React from "react";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import WalletIcon from "@mui/icons-material/Wallet";
import { MainContent } from "../components/main-content";
import { useOrderManager } from "../hooks/order-manager";
import { motion } from "framer-motion";
type MainComponentProps = {
  useExternalWallet?: boolean;
};

export const MainSwapView = () => {
  const orderManager = useOrderManager();

  const tabs = [
    {
      name: "Swap",
      value: "swap",
      onClick: () => orderManager.setOrderType("swap"),
    },
    {
      name: "Bridge",
      value: "cross",
      onClick: () => orderManager.setOrderType("cross"),
    },
  ];
  return (
    <Card className=" p-3  all-tr border-none">
      <StAppbar
        leadingStyle={{ minWidth: "80%" }}
        mainElementStyle={{ padding: 0 }}
        className="border-none p-0"
        fixed={false}
        leading={<ConnectWalletButtonHeader />}
        actions={[
          <a href={SwapRoutes.settings}>
            <IconButton>
              <Settings2 />
            </IconButton>
          </a>,
        ]}
        title={""}
      />
      <main className="flex  all-tr  gap-1.5 w-full flex-col items-center ">
        <Tabs
          className="flex gap-2 w-full "
          defaultValue={orderManager.orderType}
        >
          <motion.div className="">
            <TabsList style={{ height: 45 }} className="w-full shadow-none">
              {tabs.map((e) => {
                return (
                  <TabsTrigger
                    onClick={e.onClick}
                    style={{ height: 40 }}
                    className="shadow-none data-[state=active]:shadow-none"
                    value={e.value}
                  >
                    {e.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </motion.div>

          <TabsContent value="swap">
            <Swap />
          </TabsContent>
          <TabsContent value="cross">
            <Bridge />
          </TabsContent>
        </Tabs>
      </main>
    </Card>
  );
};

const Swap = ({ useExternalWallet }: MainComponentProps) => {
  return (
    <div>
      <MainContent />
    </div>
  );
};

const Bridge = ({ useExternalWallet }: MainComponentProps) => {
  return (
    <div>
      <MainContent bridge />
    </div>
  );
};
