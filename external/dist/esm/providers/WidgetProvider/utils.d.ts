import type { WidgetConfig } from "../../types/widget.js";
export declare const attemptToFindMatchingToAddressInConfig: (
  address: string,
  config: WidgetConfig,
) =>
  | import("../../index.js").ToAddress
  | {
      address: string;
      chainType: import("@lifi/sdk").ChainType | undefined;
    };
