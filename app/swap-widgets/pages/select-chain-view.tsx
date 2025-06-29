"use client";

import React, { useMemo } from "react";
import { Card } from "../../../components/ui/card";
import { ChainCards } from "../components/ui/chains-card";
import { useChains } from "../hooks/useChains";
import { SwapRoutes } from "../routes/routes";
import { ExtendedChain, Token } from "@lifi/sdk";
import { StHeader } from "../components/ui/st-header";
import {
  Content,
  Icon,
  SwapInputCard,
  SwapInputContent,
} from "../components/ui/sawp-input";
import { Search } from "lucide-react";
import { SwapSearchInput } from "../components/ui/search-input";
import { useTokens } from "../hooks/useTokens";
import ListTitle from "@/components/ui/listTitle";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import { SwapListTitle } from "../components/ui/swap-listTitle";
import { useModal } from "../hooks/modal-context";
import AppBar from "@/components/ui/app_bar";
import StAppBar from "@/components/ui/st-app-bar";
import { NumberFormatterUtils } from "../utils/utils";
import { cn, RpcUrls } from "@/lib/utils";
import chainData from "../../../lib/chains.json";
import { Web3Utils } from "../utils/web3-utils";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { Button } from "../components/ui/buttons";
import { Button as MuiButton } from "@mui/material";
const SelectChain = ({ title }: { title: React.ReactNode }) => {
  const chains = useChains();
  const tokens = useTokens();
  const modalState = useModal();
  const lifiConfig = useCustomLifiConfig();

  const [selectedChain, setSelectedChain] =
    React.useState<ExtendedChain | null>(null);
  const [query, setQuery] = React.useState("");
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

  function explore(token: Token) {
    const chain = chainData.find(
      (e) => e.result.data.chain.chainId === selectedChain?.id,
    );
    if (chain) {
      if (typeof window != "undefined") {
        window.open(
          `${chain.result.data.chain.explorers[0].url}/address/${token.address}`,
        );
      }
    }
  }
  function onSelectToken(token: Token) {
    const details = [
      {
        title: "Name",
        value: token.name,
      },
      {
        title: "Symbol",
        value: token.symbol,
      },
      {
        title: "Decimal",
        value: token.decimals,
      },
      {
        title: "Contract",
        value: Web3Utils.truncatedAddress(token.address),
        onclick: () => explore(token),
        isLink: true,
      },
    ];
    modalState.showModal({
      className: "rounded-t-[35px]",
      containerStyle: {
        backgroundColor: "var(--background)",
      },
      header: (
        <StAppBar
          fixed={false}
          className="px-[20px]"
          title={<div className="font-bold text-[19px]">{token.symbol}</div>}
          leading={
            <CryptoAvatar
              size={40}
              token={token}
              useSkeletonChain={!selectedChain}
              chain={selectedChain || undefined}
            />
          }
          actions={[
            <div className="font-bold max-w-full truncate">
              ${NumberFormatterUtils.formatPriceUsd(Number(token.priceUSD))}
            </div>,
          ]}
        />
      ),

      children: (
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center">
            {details.map((e) => {
              return (
                <ListTitle
                  leading=""
                  title={e.title}
                  actions={[
                    <div
                      className={cn(
                        "truncate  text-foreground/80 font-bold max-w-full",
                        e.isLink && "underline",
                      )}
                    >
                      {e.value}
                    </div>,
                  ]}
                  onClick={e.onclick}
                />
              );
            })}
          </div>
          <div className="flex w-full gap-2 justify-center items-center p-2">
            <Button
              style={{
                width: "100%",
                paddingInline: 10,
                paddingBlock: 8,
              }}
              className="w-full px-4 py-2"
            >
              Continue
            </Button>
            <Button
              onClick={() => modalState.hideModal()}
              style={{
                width: "100%",
                paddingInline: 10,
                paddingBlock: 8,
                backgroundColor: "var(--destructive)",
              }}
            >
              Close
            </Button>
          </div>
        </div>
      ),
    });
  }

  return (
    <Card className=" p-3  all-tr border-none">
      <StHeader title={selectedChain?.name ?? title} />
      <ChainCards
        onViewMore={() => console.log("View More")}
        chains={chains.chains}
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
        {tokenList &&
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
                  onClick={() => onSelectToken(e)}
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
          })}
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
