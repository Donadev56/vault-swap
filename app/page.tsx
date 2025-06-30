"use client";

import { ChatComponent } from "@/components/chat";
import FAQsThree from "@/components/faqs-3";
import FooterSection from "@/components/footer";
import { Header } from "@/components/header";
import { LoaderView } from "@/components/loader-view";
import { MainWidget } from "@/app/swap-widgets/MainWidget";
import { SwapDataView } from "@/components/swap-data-view";
import { CupertinoPage } from "@/components/ui/cupertino-page";
import {
  FloatingButton,
  FloatingButtonContainer,
} from "@/components/ui/floating-button";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { Sparkles } from "lucide-react";
import React from "react";
import { RpcUrls } from "@/lib/utils";
import { createConfig, EVM } from "@lifi/sdk";
import { IconButton } from "./swap-widgets/components/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
export default function Home() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const buttonSendRef = React.useRef<HTMLButtonElement | null>(null);
  const textInputRef = React.useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const config = useCustomLifiConfig();
  const [canScroll, setCanScroll] = React.useState(false);

  const toggleIsOpen = () => {
    setIsChatOpen(!isChatOpen);
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoaderView />;
  }

  createConfig({
    integrator: "donadev",
    providers: [EVM({})],
    rpcUrls: RpcUrls,
    apiUrl: "/api/lifi-proxy",
    debug: true,
  });

  return (
    <main className="">
      <Header setChatOpen={setIsChatOpen} />
      <MainWidget />
      <FloatingButtonContainer>
        <FloatingButton
          className="active:scale-95 transition-all border  cursor-pointer"
          backgroundColor={config.themeColor}
          color={"var(--background)"}
          onClick={toggleIsOpen}
        >
          <Sparkles />
        </FloatingButton>
      </FloatingButtonContainer>
      <ChatComponent
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        inputText={inputText}
        setInputText={setInputText}
        buttonSendRef={buttonSendRef as any}
        textInputRef={textInputRef as any}
      />

      <div className="flex w-full justify-center items-center mt-[-20px] ">
        <IconButton
          onClick={() => setCanScroll(!canScroll)}
          className="border border-dashed"
          size={50 as any}
          style={{
            backgroundColor: config.themeColor,
            borderRadius: 50,
            border: "1px dashed var(--background)",
            color: "var(--background)",
          }}
        >
          {!canScroll ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>
      </div>
      {canScroll && (
        <>
          <SwapDataView />

          <FAQsThree />
          <FooterSection />
        </>
      )}
    </main>
  );
}
