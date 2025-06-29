import React, { useMemo } from "react";
import { Card } from "../../../components/ui/card";
import { ChainCards } from "../components/ui/chains-card";
import { useChains } from "../hooks/useChains";
import { SwapRoutes } from "../routes/routes";
import { ExtendedChain } from "@lifi/sdk";
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

const SelectChain = ({ title }: { title: React.ReactNode }) => {
  const chains = useChains();
  const tokens = useTokens();
  const [selectedChain, setSelectedChain] =
    React.useState<ExtendedChain | null>(null);
  const tokenList = useMemo(() => {
    if (!selectedChain) {
      return tokens.tokens[1];
    }
    return tokens.tokens[selectedChain.id] || [];
  }, [tokens.tokens, selectedChain]);

  return (
    <Card className=" p-3  all-tr border-none">
      <StHeader title={selectedChain?.name ?? title} />
      <ChainCards
        onViewMore={() => console.log("View More")}
        chains={chains.chains}
        selectedChain={selectedChain as any}
        setSelectedChain={setSelectedChain}
      />
      <SwapSearchInput
        onChange={(e) => console.log(e)}
        placeholder={"Search By Token name or address"}
        className="text-foreground text-[16px] rounded-xl  pl-2 w-full  "
      />
      <div className="flex max-h-[300px] overflow-y-scroll w-full flex-col gap-2 ">
        {tokenList &&
          tokenList.map((e) => {
            return (
              <SwapListTitle
                className="bg-hover cursor-pointer all-tr rounded-2xl"
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
