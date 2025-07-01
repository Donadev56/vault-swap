import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  ChainType,
  TokensResponse,
  getTokens,
  getToken,
  Token,
  TokenAmount,
} from "@lifi/sdk";
import { NumberFormatterUtils, ZeroAddress } from "../utils/utils";
import useWeb3 from "./useWeb3";
import { TokenStateLess } from "../utils/st-token";
import Web3 from "web3";
import { RpcUrls } from "@/lib/utils";
import { Web3Utils } from "../utils/web3-utils";
import { useOrderManager } from "./order-manager";
import { parseUnits } from "ethers";

// Type for Ethereum addresses
export type EthAddress = `0x${string}`;

// Context shape
interface TokensContextType {
  tokens: TokensResponse["tokens"];
  getTokens: () => Promise<TokensResponse>;
  getToken: (tokenAddress: EthAddress, chainId: number) => Promise<Token>;
  balanceOf: (wallet: EthAddress, token: Token) => Promise<TokenAmount | null>;
  balancesOf: (wallet: EthAddress, tokens: Token[]) => Promise<TokenAmount[]>;
  isBalanceSufficient: (amount: string) => Promise<boolean | undefined>;
}

// Create the context
const TokensContext = createContext<TokensContextType | undefined>(undefined);

// Provider component
export const TokensProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<TokensResponse>({ tokens: {} });
  const web3 = useWeb3();
  const orderManager = useOrderManager();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await fetchTokens();
      if (response) {
        setTokens(response);
      }
    } catch (error) {
      console.error("Failed to initialize tokens:", error);
    }
  };

  const fetchTokens = async (): Promise<TokensResponse> => {
    try {
      return await getTokens({ chainTypes: [ChainType.EVM] });
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
      return { tokens: {} };
    }
  };

  const fetchToken = async (
    tokenAddress: EthAddress,
    chainId: number,
  ): Promise<Token> => {
    try {
      return await getToken(chainId, tokenAddress);
    } catch (error) {
      console.error("Failed to fetch token:", error);
      throw error;
    }
  };
  const isNative = (address: string) =>
    address.trim().toLowerCase() === ZeroAddress.trim().toLowerCase();

  async function getBalance(
    wallet: EthAddress,
    token: Token,
  ): Promise<TokenAmount> {
    try {
      const chainId = token.chainId;
      const rpcUrls = RpcUrls[chainId];
      if (rpcUrls) {
        const available =
          (await Web3Utils.findAvailableRpc(rpcUrls)) || rpcUrls[0];
        const web3 = new Web3(available);
        let balance = BigInt(0);

        if (isNative(token.address)) {
          balance = await web3.eth.getBalance(wallet);
        } else {
          const contract = new TokenStateLess(web3, token.address);
          const tokenBalance = await contract.balanceOf(wallet);
          if (tokenBalance) {
            balance = tokenBalance;
          }
        }
        return {
          ...token,
          amount: balance,
        };
      }
      throw Error("An error has occured");
    } catch (error) {
      console.error(error);
      return {
        ...token,
        amount: BigInt(0),
      };
    }
  }

  const balancesOf = async (wallet: EthAddress, tokens: Token[]) => {
    try {
      const results = await Promise.all(
        tokens.map((e) => {
          return getBalance(wallet, e);
        }),
      );

      return results;
    } catch (error) {
      console.error("Failed to get balances:", error);
      throw error;
    }
  };
  async function isBalanceSufficient(amount: string) {
    try {
      if (amount === "0") {
        return true;
      }
      const balance = await getBalance(
        web3.account as any,
        orderManager?.fromToken as any,
      );
      const amountBigInt = NumberFormatterUtils.toWei(
        amount,
        orderManager.fromToken?.decimals ?? 0,
      );
      if (balance && (balance.amount || BigInt(0)) < amountBigInt) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  const contextValue: TokensContextType = {
    tokens: tokens.tokens,
    getTokens: fetchTokens,
    getToken: fetchToken,
    balanceOf: getBalance,
    balancesOf: balancesOf,
    isBalanceSufficient,
  };

  return (
    <TokensContext.Provider value={contextValue}>
      {children}
    </TokensContext.Provider>
  );
};

// Consumer hook
export const useTokens = (): TokensContextType => {
  const context = useContext(TokensContext);
  if (!context) {
    throw new Error("useTokens must be used within a TokensProvider");
  }
  return context;
};
