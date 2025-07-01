"use client";

import React, { useEffect, useMemo } from "react";
import { Card } from "../../../components/ui/card";
import { ChainCards } from "../components/ui/chains-card";
import { useChains } from "../hooks/useChains";
import { Chain, ExtendedChain, Route, Token, TokenAmount } from "@lifi/sdk";
import { StHeader } from "../components/ui/st-header";
import { formatUnits } from "ethers";

import { SwapSearchInput } from "../components/ui/search-input";
import { useTokens } from "../hooks/useTokens";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import { SwapListTitle } from "../components/ui/swap-listTitle";
import { useModal } from "../hooks/modal-context";
import { Button as MuiButton } from "@mui/material";
import { useOnSelectToken } from "../hooks/useOnSelectToken";
import { useOnViewMoreChain } from "../hooks/useOnViewMoreChain";
import { useOrderManager } from "../hooks/order-manager";
import { SwapRoutes } from "../routes/routes";
import { Button } from "../components/ui/buttons";
import useWeb3 from "../hooks/useWeb3";
import { NumberFormatterUtils } from "../utils/utils";
const SelectChain = ({
  title,
  onContinue,
  targetChain,
  operationType,
}: {
  title: React.ReactNode;
  onContinue: (token: Token, chain?: Chain) => void;
  targetChain?: Chain;
  operationType: number;
}) => {
  const chains = useChains();
  const tokens = useTokens();
  const modalState = useModal();
  const web3 = useWeb3();
  const onSelectToken = useOnSelectToken();
  const onViewMore = useOnViewMoreChain();

  const [selectedChain, setSelectedChain] =
    React.useState<ExtendedChain | null>(null);
  const [query, setQuery] = React.useState("");
  const [chainList, setChainList] = React.useState<ExtendedChain[]>([]);
  const chain = useMemo(() => selectedChain || targetChain, [selectedChain]);
  const [currentTokens, setCurrentTokens] = React.useState<
    Record<number, TokenAmount[] | Token[]>
  >([]);

  React.useEffect(() => {
    setCurrentTokens(tokens.tokens);
  }, [tokens.tokens]);

  const tokenList: Token[] | TokenAmount[] = useMemo(() => {
    const value = query.toLowerCase();
    if (!chain) {
      return [];
    }
    const currentTokenList = currentTokens[chain.id] || [];
    return currentTokenList.filter(
      (e) =>
        e.name.toLowerCase().includes(value) ||
        e.symbol.toLowerCase().includes(value) ||
        e.address.toLowerCase().includes(value),
    );
  }, [currentTokens, query, chain]);

  function close() {
    modalState.hideModal();
  }
  function setChain(chain: ExtendedChain) {
    const targetChain = chains.chains.find((e) => e.id === chain.id);
    if (targetChain) {
      setChainList((prev) => {
        const filteredList = [...prev].filter((e) => e.id !== targetChain.id);
        const newList = [targetChain, ...filteredList];
        if (typeof localStorage != "undefined") {
          localStorage.setItem("chainList", JSON.stringify(newList));
        }
        return newList;
      });

      setSelectedChain(targetChain);
    }
  }

  React.useEffect(() => {
    setChainList(chains.chains);
  }, [chains.chains]);

  React.useEffect(() => {
    // getTokenListbalance();
  }, [chain?.id]);
  const skeleton = Array.from({ length: 10 }).map((e) => {
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
          title={
            <div className="h-[20px] w-[90px] rounded-2xl bg-foreground/10"></div>
          }
          subTitle={
            <div className="h-[20px] w-[50px] rounded-2xl bg-[var(--card-hover-color)]"></div>
          }
        />
      </MuiButton>
    );
  });

  return (
    <Card className=" p-3  all-tr border-none">
      <StHeader title={chain?.name ?? title} />
      {!targetChain && (
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
          selectedChain={chain as any}
          setSelectedChain={setSelectedChain}
        />
      )}
      {chain && (
        <SwapSearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={"Search By Token name or address"}
          className="text-foreground text-[16px] rounded-xl  px-2 w-full  "
        />
      )}
      <div className="flex max-h-[300px] overflow-y-scroll overflow-x-hidden w-full flex-col gap-2.5 ">
        {tokenList.length > 0
          ? tokenList.map((e) => {
              const amountBigInt = (e as TokenAmount).amount || 0;
              const amountUi = formatUnits(amountBigInt, e.decimals);

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
                      if (chain) {
                        onSelectToken(e, chain as any, {
                          onCancel: () => close(),
                          onContinue() {
                            onContinue(e, chain);
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
                        useSkeletonChain={!chain}
                        chain={chain as any}
                      />
                    }
                    title={<div className="font-[600]">{e.symbol}</div>}
                    subTitle={<div className="">{e.name}</div>}
                    actions={[
                      (e as any).amount && (
                        <div className="flex w-full justify-end flex-col">
                          <div className="font-bold flex w-full justify-end">
                            {NumberFormatterUtils.formatNumber(
                              Number(amountUi),
                            )}
                          </div>

                          <div className="flex justify-end w-full">
                            {NumberFormatterUtils.formatPriceUsd(
                              Number(amountUi) * Number(e.priceUSD),
                            )}
                          </div>
                        </div>
                      ),
                    ]}
                  />
                </MuiButton>
              );
            })
          : skeleton}
      </div>
    </Card>
  );
};

const SelectChainFrom = () => {
  const orderManager = useOrderManager();
  function onContinue(token: Token, chain?: Chain) {
    if (
      orderManager.toToken &&
      orderManager.toChain &&
      chain &&
      orderManager.toToken.address.trim().toLowerCase() ==
        token.address.trim().toLowerCase() &&
      orderManager.toChain?.id === chain?.id
    ) {
      orderManager.setFromToken(orderManager.toToken);
      orderManager.setFromChain(orderManager.toChain);

      orderManager.setToChain(undefined);
      orderManager.setToToken(undefined);
    } else {
      if (chain) {
        orderManager.setFromChain(chain);
      }
      orderManager.setFromToken(token);
    }

    window.location.hash = SwapRoutes.main;
  }
  return (
    <SelectChain
      operationType={0}
      title={"Exchange From"}
      onContinue={onContinue}
    />
  );
};

const SelectChainTo = () => {
  const orderManager = useOrderManager();
  const isBridge = orderManager.orderType === "cross";

  function onContinue(token: Token, chain?: Chain) {
    const targetChain = !isBridge ? orderManager.fromChain : chain;
    if (targetChain) {
      orderManager.setToChain(targetChain);
    }
    orderManager.setToToken(token);
    window.location.hash = SwapRoutes.main;
  }

  if (!isBridge && !orderManager.fromChain) {
    return (
      <div className="flex flex-col  w-full items-center  gap-1 ">
        <StHeader title={"Back"} />
        <div className="flex gap-2 py-2 flex-col items-center">
          <div>Select Chain and Token From</div>

          <a href={SwapRoutes.selectChainFrom}>
            {" "}
            <Button>Exchange From</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <SelectChain
      title={"Exchange To"}
      targetChain={isBridge ? undefined : orderManager.fromChain}
      onContinue={onContinue}
      operationType={1}
    />
  );
};

export { SelectChainTo, SelectChainFrom, SelectChain };
