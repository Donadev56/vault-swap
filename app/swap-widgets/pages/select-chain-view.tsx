"use client";

import React, { useMemo } from "react";
import { Card } from "../../../components/ui/card";
import { ChainCards } from "../components/ui/chains-card";
import { useChains } from "../hooks/useChains";
import { ExtendedChain } from "@lifi/sdk";
import { StHeader } from "../components/ui/st-header";

import { SwapSearchInput } from "../components/ui/search-input";
import { useTokens } from "../hooks/useTokens";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import { SwapListTitle } from "../components/ui/swap-listTitle";
import { useModal } from "../hooks/modal-context";
import { Button as MuiButton } from "@mui/material";
import { useOnSelectToken } from "../hooks/useOnSelectToken";
import { useOnViewMoreChain } from "../hooks/useOnViewMoreChain";
const SelectChain = ({ title }: { title: React.ReactNode }) => {
  const chains = useChains();
  const tokens = useTokens();
  const modalState = useModal();
  const onSelectToken = useOnSelectToken();
  const onViewMore = useOnViewMoreChain();

  const [selectedChain, setSelectedChain] =
    React.useState<ExtendedChain | null>(null);
  const [query, setQuery] = React.useState("");
  const [chainList, setChainList] = React.useState<ExtendedChain[]>([]);

  const tokenList = useMemo(() => {
    if (!selectedChain) {
      return [];
    }
    const finalTokens = tokens.tokens[selectedChain.id] || [];
    const value = query.toLowerCase();
    return finalTokens.filter(
      (e) =>
        e.name.toLowerCase().includes(value) ||
        e.symbol.toLowerCase().includes(value) ||
        e.address.toLowerCase().includes(value),
    );
  }, [tokens.tokens, selectedChain, query]);

  function close() {
    modalState.hideModal();
  }
  function setChain(chain: ExtendedChain) {
    const targetChain = chains.chains.find((e) => e.id === chain.id);
    if (targetChain) {
      setChainList((prev) => {
        const newList = [...prev].filter((e)=> e.id !== targetChain.id);
        return [targetChain, ...newList];
      });
      if (typeof localStorage != "undefined") {
        localStorage.setItem("chainList", JSON.stringify(chainList));
      }
      setSelectedChain(targetChain);
    }
  }

  React.useEffect(() => {
    setChainList(chains.chains);
  }, [chains.chains]);

  const skeleton = Array.from({length : 10}).map((e) => {
            return (
              <MuiButton
                style={{
                  padding: 0,
                  margin: 0,
                  borderRadius: 16,
                  color: "var(--foreground)",
                }}
              >
                <SwapListTitle
                  className="bg-hover cursor-pointer all-tr px-2 py-2 rounded-2xl"
                  leading={
                    <CryptoAvatar
                      size={40}
                      useSkeletonChain={true}
                      useSkeletonToken={true}
                      
                    />
                  }
                  title={<div className="h-[20px] w-[90px] rounded-2xl bg-foreground/10"></div>}
                  subTitle={<div className="h-[20px] w-[50px] rounded-2xl bg-[var(--card-hover-color)]"></div>}
                />
              </MuiButton>
            );
          })

  return (
    <Card className=" p-3  all-tr border-none">
      <StHeader title={selectedChain?.name ?? title} />
      <ChainCards
        onViewMore={() => {
          onViewMore({
            onCancel: close,
            onSelect(chain) {
              setChain(chain);
              close();
            },
          });
        }}
        chains={chainList}
        selectedChain={selectedChain as any}
        setSelectedChain={setSelectedChain}
      />
      {selectedChain && (
        <SwapSearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={"Search By Token name or address"}
          className="text-foreground text-[16px] rounded-xl  px-2 w-full  "
        />
      )}
      <div className="flex max-h-[300px] overflow-y-scroll overflow-x-hidden w-full flex-col gap-2.5 ">
        {tokenList.length > 0  ?
          tokenList.map((e) => {
            return (
              <MuiButton
                style={{
                  padding: 0,
                  margin: 0,
                  borderRadius: 16,
                  color: "var(--foreground)",
                }}
              >
                <SwapListTitle
                  onClick={() => {
                    if (selectedChain) {
                      onSelectToken(e, selectedChain, {
                        onCancel: () => close(),
                        onContinue() {
                          console.log("Selected Token :", e);
                          close();
                        },
                      });
                    }
                  }}
                  className="bg-hover cursor-pointer all-tr px-2 py-2 rounded-2xl"
                  leading={
                    <CryptoAvatar
                      size={40}
                      token={e}
                      useSkeletonChain={!selectedChain}
                      chain={selectedChain || undefined}
                    />
                  }
                  title={<div className="">{e.name}</div>}
                  subTitle={<div className="">{e.symbol}</div>}
                />
              </MuiButton>
            );
          }) : skeleton}
      </div>
    </Card>
  );
};

const SelectChainFrom = () => {
  return <SelectChain title={"Exchange From"} />;
};

const SelectChainTo = () => {
  return <SelectChain title={"Exchange To"} />;
};

export { SelectChainTo, SelectChainFrom, SelectChain };
