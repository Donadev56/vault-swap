import { ExtendedChain } from "@lifi/sdk";
import { useModal } from "./modal-context";
import { CryptoAvatar } from "../components/ui/crypto-avatar";

import { useChains } from "./useChains";

import { Button as MuiButton } from "@mui/material";
import { SwapListTitle } from "../components/ui/swap-listTitle";
import { StHeader } from "../components/ui/st-header";
import { SwapSearchInput } from "../components/ui/search-input";
import React from "react";

export function useOnViewMoreChain() {
  const modalState = useModal();
  const chains = useChains();
  

  function onViewMore({
    onCancel,
    onSelect,
  }: {
    onCancel?: () => void;
    onSelect?: (chain: ExtendedChain) => void;
  }) {

    const ModalContent = ()=> { 
    const [query, setQuery] = React.useState("");

    const chainList = React.useMemo(() => {
    const value = query.toLowerCase();
    return chains.chains.filter(
      (e) =>
        e.name.toLowerCase().includes(value) || e.id.toString().includes(value),
    );
  }, [query, chains.chains]);

 return <div className="flex w-full flex-col items-center">
          <div className=" w-full">
            <SwapSearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-foreground"
              placeholder="Search by name or Chain Id"
            />
          </div>
          <div className="flex w-full flex-col max-h-[400px] overflow-y-scroll items-center">
            {chainList.map((e) => {
              return (
                <MuiButton
                  style={{
                    padding: 0,
                    margin: 0,
                    borderRadius: 16,
                    color: "var(--foreground)",
                    width : "100%"
                  }}
                >
                  <SwapListTitle
                    onClick={() => {
                      if (onSelect) {
                        onSelect(e);
                      }
                    }}
                    className="bg-hover cursor-pointer all-tr px-2 py-2 rounded-2xl"
                    leading={<CryptoAvatar size={40} logoUri={e.logoURI} />}
                    title={<div className="">{e.name}</div>}
                  />
                </MuiButton>
              );
            })}
          </div>
        </div>
    }
    modalState.showModal({
      className: "max-h-[90%] min-h-[90%] overflow-y-hidden",
      containerStyle: {
        backgroundColor: "var(--background)",

      },
    
      header: <div className="px-3.5 pt-2 w-full"> <StHeader onBack={onCancel} title={"Select Chain"} /></div>,

      children: (
       <ModalContent/>
      ),
    });
  }

  return onViewMore;
}
