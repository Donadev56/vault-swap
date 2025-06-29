import React from "react";
import { SendHorizonal, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { AnimatePresence, motion } from "motion/react";
import { IconMaximize } from "@tabler/icons-react";
import ScrollArea from "./scroll-area";
import styled from "styled-components";
import MessageElement from "./chat-message";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { cn } from "@/lib/utils";

export type Conversations = {
  conversations: Conversation[];
};

export interface ChatBoxProps {
  title: string;
  isChatOpen: boolean;
  setIsChatOpen: (state: boolean) => void;
  buttonSendRef: React.RefObject<HTMLButtonElement | null>;
  textInputRef: React.RefObject<HTMLDivElement | null>;
  inputText: string;
  setInputText: (text: string) => void;
  onChat: (messages: MessageType[]) => Promise<MessageType | undefined>;
  options: OptionItem[];
  onAddMessageToDb: (
    message: MessageType,
    conversationId: string,
  ) => Promise<Conversation>;
  logo?: React.ReactNode;
  systemPrompt: string;
  chatWidgetStyle?: React.CSSProperties;
  appBarStyle?: React.CSSProperties;
  bordersColor?: string;
  aiMsgStyle?: React.CSSProperties;
  userMsgStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
}

export interface Conversation {
  id: string;
  messages: MessageType[];
}

export type OptionItem = {
  title: string;
  icon: React.ReactNode;
  color: string;
};

export interface MessageType {
  role: "user" | "assistant" | "loader" | "error" | "system";
  content: string;
  id: string;
  timestamp: number;
}
export const ChatBox = ({
  setIsChatOpen,
  isChatOpen,
  buttonSendRef,
  textInputRef,
  setInputText,
  inputText,
  onChat,
  onAddMessageToDb,
  logo,
  systemPrompt,
  options,
  title,
  chatWidgetStyle,
  appBarStyle,
  bordersColor,
  optionStyle,
  aiMsgStyle = {
    backgroundColor: "#252525",
    color: "white",
  },
  userMsgStyle = {
    backgroundColor: "white",
    color: "#000000",
  },
}: ChatBoxProps) => {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [screeHeight, setScreenHeight] = React.useState(0);
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [chatId, setChatid] = React.useState<string | null>(null);
  const config = useCustomLifiConfig();

  const isMobile = React.useMemo(() => {
    return screenWidth < 725;
  }, [screenWidth]);

  const messageScrollElement = React.useRef<HTMLDivElement | null>(null);
  const chatWidgetRef = React.useRef<HTMLDivElement | null>(null);

  const toggleChatOpenState = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const date = new Date();
    const time = Number(date.getTime() / 1000);
    const newMessage: MessageType = {
      role: "user",
      content: inputText,
      timestamp: time,
      id: uuidv4(),
    };

    const normalMessages = normalizedAndAddMessage();
    if (normalMessages.length == 0) {
      const system: MessageType = {
        role: "system",
        content: systemPrompt,
        timestamp: time,
        id: uuidv4(),
      };
      normalMessages.push(system);
      setChatid(uuidv4());
      saveMessage(system);

      pushMessage(system);
    }
    normalMessages.push(newMessage);
    saveMessage(newMessage);
    pushMessage(newMessage);

    pushMessage({
      role: "loader",
      content: "Typing...",
      id: uuidv4(),
      timestamp: time,
    });

    setInputText("");
    resetInput();

    try {
      scrollMessageElementToBottom();
      const response = await onChat(normalMessages);
      if (!response) {
        throw "The response is null";
      }
      pushMessage(response);
      saveMessage(response);

      return;
    } catch (error) {
      console.error(error);
    }

    pushMessage({
      role: "error",
      content: `An error has occured`,
      timestamp: time,
      id: uuidv4(),
    });
  };

  const saveMessage = async (message: MessageType) => {
    try {
      const response = await onAddMessageToDb(message, chatId ?? uuidv4());
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const normalizedAndAddMessage = (): MessageType[] => {
    let previousMessages: MessageType[] = [...messages];

    return previousMessages.filter(
      (e) => e.role != "loader" && e.role != "error",
    );
  };
  const pushMessage = (message: MessageType) => {
    setMessages((prev) => {
      const previousMessages = prev.filter(
        (e) => e.role != "loader" && e.role != "error",
      );
      return [...previousMessages, message];
    });
    scrollMessageElementToBottom();
  };
  const resetInput = () => {
    const el = textInputRef.current;
    if (!el) return;
    el.textContent = "";
  };

  const scrollMessageElementToBottom = () => {
    const el = messageScrollElement.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
    setTimeout(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  React.useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setScreenHeight(height);
      setScreenWidth(width);
    };
    handleResize();
    if (typeof window != "undefined") {
      window.addEventListener("resize", handleResize);
    }
    if (typeof window != "undefined") {
      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("resize", handleResize);
        }
      };
    }
  }, []);

  return (
    <AnimatePresence>
      <ChatBoxStyle>
        {isChatOpen && (
          <motion.div
            key={"Chat-key"}
            initial={{ opacity: 0, y: 20, backdropFilter: "blur(30px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, backdropFilter: "blur(30px)" }}
            transition={{ duration: 0.3 }}
            ref={chatWidgetRef}
            style={{
              right: !isMobile ? "30px" : 0,
              bottom: !isMobile ? "130px" : 0,
              top: !isMobile ? "" : 0,
              left: !isMobile ? "" : 0,
              height: !isMobile ? "" : "100%",
              maxWidth: !isMobile ? 500 : "",
            }}
            className={`fixed flex   transition-05s w-full  z-[99999]  fade ${isChatOpen ? "fade-enter-active" : "fade-exit-active"}`}
          >
            <ChatWidgetContainer
              className={cn("border", isMobile && "border-0")}
              style={{
                ...chatWidgetStyle,
                height: chatWidgetStyle?.height ?? (!isMobile ? "" : "100%"),
                borderRadius:
                  chatWidgetStyle?.borderRadius ?? (isMobile ? 0 : 20),
                paddingInline: chatWidgetStyle?.paddingInline ?? 0,
                width: chatWidgetStyle?.width ?? "100%",
                maxWidth: chatWidgetStyle?.maxWidth ?? (!isMobile ? 500 : ""),
                display: chatWidgetStyle?.display ?? "flex",
                flexDirection: chatWidgetStyle?.flexDirection ?? "column",
                maxHeight:
                  chatWidgetStyle?.maxHeight ??
                  (!isMobile ? screeHeight * 0.75 : ""),
              }}
            >
              <ChatAppBar
                bg="transparent"
                titleStyle={{
                  fontWeight: "bold",
                }}
                appBarContainerStyle={{
                  ...appBarStyle,
                  position: appBarStyle?.position ?? "sticky",
                  paddingInline: appBarStyle?.paddingInline ?? 20,
                  backgroundColor:
                    appBarStyle?.backgroundColor ?? "transparent",
                  paddingBottom: appBarStyle?.paddingBottom ?? "10px",
                  borderBottom:
                    appBarStyle?.borderBottom ?? `1px solid ${bordersColor}`,
                }}
                leading={logo}
                title={title}
                actions={[
                  !isMobile ? (
                    <IconMaximize
                      onClick={() => setScreenWidth(700)}
                      className="touch-opacity"
                    />
                  ) : null,
                  <X
                    className="touch-opacity"
                    onClick={() => {
                      if (typeof window != "undefined") {
                        setScreenWidth(window.innerWidth);
                      }
                      toggleChatOpenState();
                    }}
                  />,
                ]}
              />

              <div className="relative flex justify-center  px-[0px]  grow min-h-[0px]">
                <ScrollArea
                  ref={messageScrollElement}
                  pb={50}
                  width={"100%"}
                  maxWidth={600}
                  maxHeight={isMobile ? screeHeight : screeHeight * 0.6}
                  height={"100%"}
                >
                  {messages.length == 0 ? (
                    <div className="flex flex-col gap-[10px] justify-center items-center h-[150px]">
                      <p className="m-[10px]">How can i help you ?</p>

                      <div className="flex justify-center items-center gap-[10px]  flex-wrap ">
                        {options.map((e) => {
                          return (
                            <Chip
                              style={optionStyle}
                              onClick={() => {
                                const el = textInputRef.current;
                                if (!el) return;
                                el.innerHTML = "<div>" + e.title + "</div>";
                                setInputText(e.title);

                                setTimeout(() => {
                                  const el = buttonSendRef.current;
                                  if (!el) return;

                                  el.click();
                                }, 500);
                              }}
                              text={e.title}
                              icon={e.icon}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="gap-[15px] px-[20px] py-[20px] flex flex-col">
                      <AnimatePresence>
                        {messages.map((e) => {
                          return (
                            <motion.div
                              key={e.id}
                              initial={{
                                opacity: 0,
                                y: 20,
                                backdropFilter: "blur(30px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                backdropFilter: "blur(0px)",
                              }}
                              exit={{
                                opacity: 0,
                                y: -20,
                                backdropFilter: "blur(30px)",
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <MessageElementManager
                                aiMsgStyle={aiMsgStyle ?? {}}
                                userMsgStyle={userMsgStyle ?? {}}
                                message={e}
                              />
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </ScrollArea>
              </div>
              <div className="w-full  flex items-center justify-center ">
                <div
                  style={{
                    maxWidth: 600,
                    width: "100%",
                    borderTop: `1px solid ${bordersColor}`,
                  }}
                  className="flex w-full px-[20px] justify-center  items-center py-[10px]  space-x-2"
                >
                  <div
                    ref={textInputRef}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text/plain");
                      document.execCommand("insertText", false, text);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    onInputCapture={(e) => {
                      console.log(e.target);

                      setInputText(
                        e.currentTarget.textContent !== null
                          ? e.currentTarget.textContent
                          : "",
                      );
                    }}
                    data-placeholder="Ask Anything..."
                    contentEditable={true}
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      borderColor: config.themeColor,
                    }}
                    className={` contentEditableText ${inputText.trim().length == 0 ? "placeholder" : ""} relative`}
                  ></div>

                  <button
                    onClick={() => {
                      sendMessage();
                    }}
                    ref={buttonSendRef}
                    style={{
                      width: 50,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                    className="touch-opacity flex justify-center items-center"
                  >
                    <SendHorizonal color="#121212" size={20} />
                  </button>
                </div>
              </div>
            </ChatWidgetContainer>
          </motion.div>
        )}
      </ChatBoxStyle>
    </AnimatePresence>
  );
};

const Chip = ({
  text,
  icon,
  onClick,
  style,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className="flex shadow-stone-800 touch-opacity justify-center items-center rounded-[10px] gap-[5px] px-[15px] py-[5px]"
    >
      <div>{icon}</div>

      <p>{text}</p>
    </div>
  );
};

const MessageElementManager = ({
  message,
  aiMsgStyle,
  userMsgStyle,
}: {
  message: MessageType;
  aiMsgStyle: React.CSSProperties;
  userMsgStyle: React.CSSProperties;
}): React.JSX.Element => {
  const role = message.role;
  console.log(role);
  if (role == "error") {
    return (
      <MessageElement
        key={message.id}
        style={{
          backgroundColor: "#ff4278",
          color: "white",
        }}
        text={message.content}
      />
    );
  } else if (role == "loader") {
    return (
      <MessageElement
        key={message.id}
        style={aiMsgStyle}
        text={message.content}
      />
    );
  } else if (role == "assistant") {
    return (
      <MessageElement
        key={message.id}
        style={aiMsgStyle}
        text={message.content}
      />
    );
  } else if (role == "user") {
    return (
      <MessageElement
        key={message.id}
        style={{
          ...userMsgStyle,
          marginLeft: "auto",
        }}
        text={message.content}
      />
    );
  } else if (role == "system") {
    return <></>;
  }
  return (
    <MessageElement
      key={message.id}
      style={{
        marginLeft: "auto",
        ...userMsgStyle,
      }}
      text={message.content}
    />
  );
};

export interface AppBarType {
  leading?: React.ReactNode;
  title?: string;
  actions?: React.ReactNode[];
  bg?: string;
  rounded?: number;
  className?: string;
  px?: number;
  py?: number;
  appBarStyle?: React.CSSProperties;
  leadingStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  actionsStyle?: React.CSSProperties;
  leftStyle?: React.CSSProperties;
  rightStyle?: React.CSSProperties;
  appBarContainerStyle?: React.CSSProperties;
}
export const ChatAppBar = ({
  leading,
  title,
  actions,
  rounded = 0,
  px = 0,
  py = 0,
  className,
  appBarStyle,
  leadingStyle,
  leftStyle,
  appBarContainerStyle,
  rightStyle,
  titleStyle,
}: AppBarType) => {
  return (
    <div
      className={className}
      style={{
        borderRadius: rounded,
        paddingInline: px,
        paddingBlock: py,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        ...appBarContainerStyle,
      }}
    >
      <div
        style={appBarStyle}
        className=" flex justify-between items-center w-full"
      >
        <div
          style={leftStyle}
          className="flex gap-[10px] items-center justify-between"
        >
          <div style={leadingStyle}>{leading}</div>
          <div style={titleStyle} className="text-balance  text-[20px]">
            {title}
          </div>
        </div>

        <div
          style={rightStyle}
          className="max-w-[30%] flex gap-[10px] items-center justify-between"
        >
          {actions &&
            actions.map((e, index) => {
              return <div key={index}>{e}</div>;
            })}
        </div>
      </div>
    </div>
  );
};

export interface ChatContainerType {
  className?: string;
  px?: number;
  py?: number;
  bg?: string;
  rounded?: number;
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ChatWidgetContainer = ({
  className = "",
  rounded = 20,
  color = "#FFFFFF",
  bg = "#252525",
  px = 20,
  py = 20,
  children,
  style,
}: ChatContainerType) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: bg,
    color,
    borderRadius: rounded,
    paddingInline: px,
    paddingBlock: py,
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
};

const ChatBoxStyle = styled.div`
  .ZoomInAnimation {
    animation: zoomIn 2s ease-out;
  }

  .fade-enter {
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
  }

  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
  }

  .fade-exit {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease;
  }

  .fade-exit-active {
    opacity: 0;
    transform: scale(0.95);
  }

  .contentEditableText {
    min-height: 40px;
    width: 100%;
    display: flex;
    max-height: 100px;
    padding-inline: 15px;
    padding-block: 7px;
    border-radius: 10px;
    overflow-y: scroll;
    word-wrap: break-word;
    white-space: pre-wrap;
    white-space: break-spaces;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0;
    flex-direction: column;
    scrollbar-width: 0px;
    scroll-behavior: smooth;
    scrollbar-color: transparent transparent;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  [contenteditable="true"]:empty:before {
    content: attr(data-placeholder);
    pointer-events: none;
    display: block;
    opacity: 0.4;
  }
`;
