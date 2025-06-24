import type { ExtendedChain, Route } from "@lifi/sdk";
export declare const useRouteRequiredAccountConnection: (
  route?: Route,
  chain?: ExtendedChain,
) =>
  | {
      connected: boolean;
      missingChain?: undefined;
      missingAccountAddress?: undefined;
    }
  | {
      connected: boolean;
      missingChain: ExtendedChain;
      missingAccountAddress: string | undefined;
    };
