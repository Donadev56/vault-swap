import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ChainType, ExtendedChain, getChains } from "@lifi/sdk";

// Define the shape of the context
interface ChainsContextType {
  chains: ExtendedChain[];
  getChains: () => Promise<ExtendedChain[]>;
}

// Create context with default undefined
const ChainsContext = createContext<ChainsContextType | undefined>(undefined);

// Provider component
export const ChainsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chains, setChains] = useState<ExtendedChain[]>(() => {
    if (typeof localStorage != "undefined") {
      return JSON.parse(localStorage.getItem("chainList") || "[]");
    }
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await fetchChains();
    if (result.length > 0) {
      if (chains.length == 0) {
        setChains(result);
      } else {
        const currentChains = [...chains];
        const currentIds = currentChains.map((e) => e.id);
        for (const eachChain of result) {
          if (!currentIds.includes(eachChain.id)) {
            currentChains.push(eachChain);
          }
        }
        setChains(currentChains);
      }
    }
  };

  const fetchChains = async () => {
    try {
      return await getChains({ chainTypes: [ChainType.EVM] });
    } catch (error) {
      console.error("Failed to fetch chains:", error);
      return [];
    }
  };

  const contextValue: ChainsContextType = {
    chains,
    getChains: fetchChains,
  };

  return (
    <ChainsContext.Provider value={contextValue}>
      {children}
    </ChainsContext.Provider>
  );
};

export const useChains = (): ChainsContextType => {
  const context = useContext(ChainsContext);
  if (!context) {
    throw new Error("useChains must be used within a ChainsProvider");
  }
  return context;
};
