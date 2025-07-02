import StAppBar from "@/components/ui/st-app-bar";
import ThemeToggle from "../components/ui/theme-toogle";
import { IconButton, StButton } from "../components/ui/buttons";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ListTitle from "@/components/ui/listTitle";
import { NavigateBack } from "../routes/routes-utils";
import { StHeader } from "../components/ui/st-header";
import useWeb3 from "../hooks/useWeb3";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Copy } from "lucide-react";
import { SwapListTitle } from "../components/ui/swap-listTitle";
import { copy } from "../utils/utils";
import { Switch } from "@mui/material";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
export const SwapSetting = () => {
  const web3 = useWeb3();

  const settings = [
    {
      title: "Theme",
      onClick: () => console.log(),
      actions: <ThemeToggle />,
    },
    {
      title: "Current chain",
      onClick: () => console.log(),
      actions: <div>{web3.chainId}</div>,
    },
    {
      chdilren: <RpcListViewer />,
    },
  ];
  return (
    <div className="flex flex-col gap-3 w-full items-center">
      <StHeader title="Settings" />

      <div className="flex flex-col items-center w-full ">
        {settings.map((e) => {
          if (e.chdilren) {
            return e.chdilren;
          }
          return (
            <ListTitle leading={""} title={e.title} actions={[e.actions]} />
          );
        })}
      </div>
    </div>
  );
};

const RpcListViewer = () => {
  const web3 = useWeb3();
  const config = useCustomLifiConfig();
  const [expended, setExpended] = React.useState(false);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => setExpended(!expended)}
        className="flex hover:opacity-60 cursor-pointer w-full "
      >
        <SwapListTitle
          leading=""
          title={"Rpc urls"}
          actions={[<ChevronDown />]}
        />
      </div>
      <div className="flex w-full flex-col">
        <AnimatePresence mode="wait">
          {" "}
          {expended && (
            <motion.div
              key={String(expended)}
              initial={{ height: "1%", opacity: "0.1" }}
              animate={{ height: "", opacity: "1" }}
              exit={{ height: "1%", opacity: "0.1" }}
              transition={{ duration: 0.5 }}
              className="flex w-full p-2 flex-col gap-2"
            >
              {new Set(web3.rpcUrls).values().map((e) => {
                const isCurrent =
                  web3.availableRpc.trim().toLowerCase() ===
                  e.trim().toLowerCase();
                return (
                  <SwapListTitle
                    leading=""
                    title={
                      <div
                        onClick={() => copy(e)}
                        className="max-w-full  truncate"
                      >
                        {e}
                      </div>
                    }
                    actions={[
                      <Switch
                        checked={isCurrent}
                        onChange={(value) => {
                          if (value) {
                            web3.setAvailableRpc(e);
                          }
                        }}
                      />,
                    ]}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
