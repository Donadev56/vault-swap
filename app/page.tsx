"use client";

import { ChatComponent } from "@/components/chat";
import FAQsThree from "@/components/faqs-3";
import FooterSection from "@/components/footer";
import { Header } from "@/components/header";
import { LoaderView } from "@/components/loader-view";
import { MainWidget } from "@/components/MainWidget";
import { SwapDataView } from "@/components/swap-data-view";
import { CupertinoPage } from "@/components/ui/cupertino-page";
import { FloatingButton, FloatingButtonContainer } from "@/components/ui/floating-button";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { Edit, Sparkles } from "lucide-react";
import React from "react";

export default function Home() {

    const [isChatOpen, setIsChatOpen] = React.useState(false);
    const buttonSendRef = React.useRef<HTMLButtonElement | null>(null);
    const textInputRef = React.useRef<HTMLDivElement | null>(null);
    const [inputText, setInputText] = React.useState("");
    const [mounted , setMounted] = React.useState(false)
    const config = useCustomLifiConfig()

     const toggleIsOpen = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  React.useEffect(()=> {
    setMounted(true)

  }, [])
  

if (!mounted) {
 return <div style={{backgroundColor : "#0a0a0a"}} className="grid h-[100shv] w-full  place-items-center  ">

        <div className="loader-start" />
            
    </div>
}
 
  return (
    <main className="">
      <Header setChatOpen={setIsChatOpen} />
 
      <MainWidget />
      <SwapDataView />
       <FloatingButtonContainer >
      <FloatingButton className="active:scale-95 transition-all border  cursor-pointer" backgroundColor={config.themeColor} color={"var(--background)"} onClick={toggleIsOpen}>
        <Sparkles />
      </FloatingButton>
     </FloatingButtonContainer>
      <ChatComponent isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen } inputText={inputText} setInputText={setInputText} buttonSendRef={buttonSendRef as any} textInputRef={textInputRef as any}  />

      <FAQsThree />
      <FooterSection />
    </main>
  );
}
