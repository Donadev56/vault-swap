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
  getTokenBalance,
  getToken,
  Token,
  TokenAmount,
} from "@lifi/sdk";

// Type for Ethereum addresses
export type EthAddress = `0x${string}`;

// Context shape
interface TokensContextType {
  tokens: TokensResponse["tokens"];
  getTokens: () => Promise<TokensResponse>;
  getToken: (tokenAddress: EthAddress, chainId: number) => Promise<Token>;
  balanceOf: (
    wallet: EthAddress,
    tokenAddress: EthAddress,
    chainId: number,
  ) => Promise<TokenAmount | null>;
}

// Create the context
const TokensContext = createContext<TokensContextType | undefined>(undefined);

// Provider component
export const TokensProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<TokensResponse>({ tokens: {} });

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

  const getBalance = async (
    wallet: EthAddress,
    tokenAddress: EthAddress,
    chainId: number,
  ) => {
    try {
      const token = await fetchToken(tokenAddress, chainId);
      return await getTokenBalance(wallet, token);
    } catch (error) {
      console.error("Failed to get balance:", error);
      throw error;
    }
  };

  const contextValue: TokensContextType = {
    tokens: tokens.tokens,
    getTokens: fetchTokens,
    getToken: fetchToken,
    balanceOf: getBalance,
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
