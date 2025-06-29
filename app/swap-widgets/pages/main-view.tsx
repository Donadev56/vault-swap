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

type MainComponentProps = {
  useExternalWallet?: boolean;
};

export const MainSwapView = () => {
  const [useExternalWallet, setUseExternalWallet] = React.useState(false);
  const lifiConfig = useCustomLifiConfig();
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
        <Tabs className="flex gap-2 w-full " defaultValue="swap">
          <TabsList style={{ height: 45 }} className="w-full shadow-none">
            <TabsTrigger
              style={{ height: 40 }}
              className="shadow-none data-[state=active]:shadow-none"
              value="swap"
            >
              Swap
            </TabsTrigger>
            <TabsTrigger
              style={{ height: 40 }}
              className="shadow-none data-[state=active]:shadow-none"
              value="bridge"
            >
              Bridge
            </TabsTrigger>
          </TabsList>
          <TabsContent value="swap">
            <Swap useExternalWallet={useExternalWallet} />
          </TabsContent>
          <TabsContent value="bridge">
            <Bridge useExternalWallet={useExternalWallet} />
          </TabsContent>
        </Tabs>
        <div className="flex mt-2 w-full max-w-[100%] gap-2">
          <ConnectButton />

          <MainActionButton
            onClick={() => setUseExternalWallet(!useExternalWallet)}
            style={{
              backgroundColor: !useExternalWallet
                ? `${lifiConfig.themeColor}20`
                : lifiConfig.themeColor,
              color: !useExternalWallet
                ? lifiConfig.themeColor
                : "var(--background)",
              maxWidth: 48,
              minWidth: 48,
              maxHeight: 48,
              minHeight: 48,
              borderRadius: 10,
            }}
          >
            <WalletIcon />
          </MainActionButton>
        </div>
      </main>
    </Card>
  );
};

const Swap = ({ useExternalWallet }: MainComponentProps) => {
  return (
    <div>
      <MainContent useExternalWallet={useExternalWallet} />
    </div>
  );
};

const Bridge = ({ useExternalWallet }: MainComponentProps) => {
  return (
    <div>
      <MainContent bridge useExternalWallet={useExternalWallet} />
    </div>
  );
};
