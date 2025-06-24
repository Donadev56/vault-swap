"use client";

import { GetSavedTransactions } from "@/app/server-actions/transaction-history";
import { RouteExtended, Token } from "@/external/dist/esm";
import React from "react";
import ListTitle from "./ui/listTitle";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { Chain, ChainsResponse } from "@/app/types/types";
import { RiFileList3Line } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { TbBrandTorchain } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";

export const SwapDataView = () => {
  const config = useCustomLifiConfig();
  const [transactions, setTransactions] = React.useState<RouteExtended[]>([]);
  const [chains, setChains] = React.useState<ChainsResponse>({ chains: [] });
  const [chainQuery, setChainQuery] = React.useState("");
  const [trxQuery, setTrxQuery] = React.useState("");
  console.log(trxQuery);

  const filteredChains = React.useMemo(() => {
    const query = chainQuery.toLowerCase();

    if (!query.trim()) {
      return chains.chains;
    }
    return chains.chains.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.chainType.toLowerCase().includes(query) ||
        e.nativeToken.name.toLowerCase().includes(query) ||
        e.id === Number(query),
    );
  }, [chains, chainQuery]);

  const filteredTrx = React.useMemo(() => {
    const query = trxQuery.toLowerCase();
    console.log(query);

    if (!query.trim()) {
      return transactions;
    }

    const found = transactions.filter(
      (e) =>
        e?.fromAddress?.toLowerCase().includes(query) ||
        e?.toAddress?.toLowerCase().includes(query) ||
        e.toToken.name.toLowerCase().includes(query) ||
        e.fromToken.name.toLowerCase().includes(query),
    );
    return found;
  }, [transactions, trxQuery]);

  const isMobile = useIsMobile();

  const fetchChains = async () => {
    let chainResponse: ChainsResponse = { chains: [] };
    await fetch("/api/lifi-proxy/chains")
      .then(async (result) => {
        if (result.status === 200) {
          await result.json().then((data) => {
            chainResponse = data;
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setChains(chainResponse);
  };

  const fetchTransactions = async () => {
    try {
      const result = await GetSavedTransactions();
      if (transactions) {
        setTransactions(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchTransactions();
    fetchChains();
  }, []);

  function openScan(wallet: string) {
    window.open("https://scan.li.fi/wallet/" + wallet);
  }
  function openChainList(id: string) {
    window.open("https://chainlist.org/?search=" + id);
  }
  return (
    <div className="flex border-t border-b py-3 border-dashed my-2 justify-center rounded-b-4xl rounded-t-4xl  w-full">
      <div
        className={cn(
          "flex flex-col  w-[90%] gap-2 justify-between max-w-[1028px] ",
          isMobile && "flex-col",
        )}
      >
        <div
          className={cn(
            "flex gap-2 max-w-[100%] w-[100%] py-2 flex-col",
            isMobile && "w-full max-w-full",
          )}
        >
          <div className="font-bold flex items-center  gap-2 m-2 text-[20px] opacity-70">
            Transactions <RiFileList3Line />
          </div>
          <div>
            <SearchInput
              value={trxQuery}
              placeholder="Search Wallet"
              onChange={setTrxQuery}
            />
          </div>

          <div className="flex max-h-[400px]  overflow-scroll gap-2 w-full py-2 flex-col">
            {filteredTrx.map((e) => {
              const fromChain = chains.chains.find(
                (c) => c.id === e.fromChainId,
              );
              const toChain = chains.chains.find((c) => c.id === e.toChainId);
              const fromToken = e.fromToken;
              const toToken = e.toToken;
              return (
                <div className="border border-dashed w-full flex flex-col  rounded-2xl">
                  <ListTitle
                    onClick={() => openScan(e.fromAddress ?? fromToken.address)}
                    className="pb-0 hover:opacity-50 cursor-pointer transition-all rounded-2xl "
                    leading={
                      <CryptoPicture
                        chain={fromChain}
                        size={40}
                        token={fromToken}
                      />
                    }
                    title={
                      <div className={"font-bold"}> From {fromToken.name}</div>
                    }
                    subTitle={<div className="truncate ">{e.fromAddress}</div>}
                    leftStyle={{
                      maxWidth: "40%",
                      justifyContent: "start",
                    }}
                    actions={[
                      <div className="truncate max-w-[50%]">
                        {Number(e.fromAmount) / 1e18}
                      </div>,
                    ]}
                  />
                  <div
              
                    className={
                      "bg-[var(--second-color)] ml-7 h-8 my-1 rounded-3xl w-1 "
                    }
                  ></div>
                  <ListTitle
                    onClick={() => openScan(e.toAddress ?? toToken.address)}
                    leftStyle={{
                      maxWidth: "40%",
                      justifyContent: "start",
                    }}
                    className="pt-0 hover:opacity-50 cursor-pointer transition-all rounded-2xl"
                    subTitle={<div className="truncate ">{e.toAddress}</div>}
                    actions={[
                      <div className="truncate max-w-[50%]">
                        {Number(e.toAmount) / 1e18}
                      </div>,
                    ]}
                    leading={
                      <CryptoPicture
                        chain={toChain}
                        size={40}
                        token={toToken}
                      />
                    }
                    title={
                      <div className={"font-bold"}> To {toToken.name}</div>
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

     { false &&   <div
          className={cn(
            "flex flex-col  w-full gap-2",
            !isMobile && "max-w-[100%]",
          )}
        >
          <div className="font-bold flex items-center  gap-2 m-2 text-[20px] opacity-70">
            Chains <TbBrandTorchain />
          </div>
          <div>
            <SearchInput
              value={chainQuery}
              placeholder="Search Chain"
              onChange={setChainQuery}
            />
          </div>

          <div
            className={cn(
              "max-h-[400px]  overflow-scroll gap-2 border border-dashed rounded-2xl flex w-full flex-col",
            )}
          >
            {filteredChains.map((e) => {
              return (
                <div>
                  <ListTitle
                    className="hover:opacity-70 cursor-pointer transition-all"
                    onClick={() => openChainList(e.id as any)}
                    leading={
                      <CryptoPicture
                        size={40}
                        token={e.nativeToken as any}
                        logoUri={e.logoURI}
                      />
                    }
                    title={<div>{e.nativeToken.name}</div>}
                    subTitle={<div>{e.nativeToken.priceUSD}</div>}
                  />
                </div>
              );
            })}
          </div>
        </div>}
      </div>
    </div>
  );
};

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="relative w-full flex ">
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "py-2  border rounded-[10px] focus:outline-0 pl-10",
          isMobile && "w-full",
        )}
      />
      <div className={"absolute  left-[10px] top-[50%] translate-y-[-50%]"}>
        <IoSearchSharp />
      </div>
    </div>
  );
};
export const CryptoPicture = ({
  size,
  token,
  chain,
  logoUri,
}: {
  token: Token;
  size: number;
  chain?: Chain;
  logoUri?: string;
}) => {
  const isUrlAvailable = !!token.logoURI;
  const divider = 2;
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${logoUri || token.logoURI})`,
        backgroundSize: "cover",
      }}
      className="flex rounded-full justify-center items-center font-bold text-muted-foreground  relative "
    >
      {isUrlAvailable ? undefined : (token.name[0] ?? "U")}

      {chain && (
        <div className="absolute left-[62%] top-[60%]">
          <div
            style={{
              width: size / divider,
              height: size / divider,
              backgroundImage: `url(${chain.logoURI})`,
              backgroundSize: "cover",
            }}
            className="flex border-background border-2 rounded-full justify-center items-center font-bold text-muted-foreground  relative "
          ></div>
        </div>
      )}
    </div>
  );
};
