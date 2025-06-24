"use client";
import { Edit, Menu } from "lucide-react";
import { Logo } from "./logo";
import AppBar from "./ui/app_bar";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { colors } from "@mui/material";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import React from "react";
import ModalBottomSheet from "./ui/modal";
import BarrierOverlay from "./ui/barrier";
import { IoTelescopeOutline } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import ListTitle from "./ui/listTitle";
import { FaPhoneAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import { FloatingButton, FloatingButtonContainer } from "./ui/floating-button";

export const Header = ({
  setChatOpen 
} : 
{
  setChatOpen : (state : boolean)=> void
}) => {
  const { LifiConfig, colors, themeColor, setThemeColor } =
    useCustomLifiConfig();
  const [isHover , setIsHover] = React.useState(false)

  const options = [
    {
      name: "Explorer",
      path: "https://scan.li.fi/",
      icon: IoTelescopeOutline,
      onclick: null,
    },
    {
      name: "Ask AI",
      onClick: () => setChatOpen(true),
      icon: LuSparkles,
      path: null,
    },
    {
      name: "Contact Us",
      onClick: null,
      icon: FaPhoneAlt,
      path: "https://t.me/@Opennode_tech",
      actions: [<div>@Opennode_tech</div>],
    },
  ];

  const [modalState, setModalState] = React.useState(false);
  const isMobile = useIsMobile();

  function toggleModalState() {
    setModalState(!modalState);
  }

  const ColorsWidgetDesk = (
    <div className="flex gap-[10px] items-center justify-center">
      {colors.map((e) => {
        const selected = themeColor === e;

        return (
          <div
            onClick={() => setThemeColor(e)}
            style={{
              backgroundColor: selected ? "" : e,
              border: selected ? `3px solid ${e}` : "",
            }}
            className={cn(
              ` transition-all active:opacity-80 hover:opacity-95 cursor-pointer rounded-3xl hover:scale-110  size-[25px] `,
            )}
          ></div>
        );
      })}
    </div>
  );
  const optionsDesk =  <motion.div  initial="hidden"
  animate="visible" variants={{
    hidden : {opacity : 0, transition: { duration: 0.5 },backdropFilter : "blur(100px)", },
    visible : {opacity : 1, transition: { duration: 0.5 }, backdropFilter : "blur(0px)", },
    
    
  }} className="flex gap-4">
                  {options.map((e) => {
                    return (
                      <button
                      
                        onClick={() => {
                          if (e.onClick) {
                            e.onClick();
                          } else {
                            window.open(e.path);
                          }
                        }}
                        className="cursor-pointer hover:opacity-70 transition-all flex gap-2 items-center"
                      >
                    <e.icon />    {e.name}
                      </button>
                    );
                  })}
                </motion.div>

  return (
    <>
    <div onMouseLeave={()=> setIsHover(false)} onMouseEnter={()=> setIsHover(true)} >
      <AppBar
        leading={
          <Logo
            color={
              (LifiConfig?.theme?.colorSchemes?.dark?.palette?.primary as any)
                ?.main ?? undefined
            }
          />
        }
        actions={
          isMobile
            ? [<Menu onClick={toggleModalState} />]
            : [
              <AnimatePresence>
                {isHover &&optionsDesk}
              </AnimatePresence>
              
               ,
                ColorsWidgetDesk,
              ]
        }
        className="  truncate  z-50"
        title={<div className="font-bold text-[16px]">Vault Swap</div>}
      />
      <BarrierOverlay isOpen={modalState} toggleModalState={()=> setModalState(false)} />

      <ModalBottomSheet
        className="bg-background rounded-t-2xl"
        header={
          <AppBar
            fixed={false}
            actions={[ColorsWidgetDesk]}
            title="Back"
            className="border-b-0 rounded-b-none  rounded-t-2xl my-1 mt-3 p-0 "
            onClose={toggleModalState}
          />
        }
        open={modalState}
      >
        <div className="w-full flex flex-col">
          {options.map((e) => {
            return (
              <ListTitle
                onClick={() => {
                  if (e.onClick) {
                    e.onClick();
                  } else {
                    window.open(e.path);
                  }
                }}
                actions={e.actions}
                leading={<e.icon />}
                title={
                  <div
                    className="truncate
              "
                  >
                    {e.name}
                  </div>
                }
              />
            );
          })}
        </div>
      </ModalBottomSheet>
      </div>
    </>
  );
};
