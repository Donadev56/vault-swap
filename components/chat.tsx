import React from "react";
import { FloatingButton, FloatingButtonContainer } from "./ui/floating-button";
import { Book, Edit } from "lucide-react";
import { ChatBox, Conversation, MessageType } from "./ui/chat";
import { IoNewspaperOutline } from "react-icons/io5";
import { chatCompletion, } from "@/app/services/chat_server/chat_message";
import { pushMessageTodb } from "@/app/services/db/conversation_db";
import { systemPrompt } from "@/lib/utils";
import { Logo } from "./logo";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";

export interface ChatProps {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  buttonSendRef: React.RefObject<HTMLButtonElement>;
  textInputRef: React.RefObject<HTMLDivElement>;

}
export const ChatComponent =({
  isChatOpen,
  setIsChatOpen,
  inputText,
  setInputText,
  buttonSendRef,
  textInputRef,

} :ChatProps )=> {

const config = useCustomLifiConfig()

  return (
      <ChatBox
        logo={<Logo color={config.themeColor}/>}
        buttonSendRef={buttonSendRef}
        textInputRef={textInputRef}
        inputText={inputText}
        setInputText={setInputText}
        systemPrompt={systemPrompt}
        options={[
          {
            title: "What is Vault",
            icon: <Book />,
            color: "",
          },
          {
            title: "What is minimum ?",
            icon: <IoNewspaperOutline />,
            color: "",
          },
        ]}
        
        title="VAULT AI"
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        onChat={chatCompletion as any}
        onAddMessageToDb={pushMessageTodb}
        bordersColor={"var(--second-color)"}
        appBarStyle={{

        }}
    
        chatWidgetStyle={{
          backgroundColor: "var(--background)",
          color: "var(--text-color)",
        }}
        optionStyle={{
          backgroundColor: "var(--text-color)",
          color: "var(--bg-color)",
        }}
      />
  );
}