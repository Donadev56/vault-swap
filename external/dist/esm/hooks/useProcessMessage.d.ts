import type { EVMChain, LiFiStep, Process } from "@lifi/sdk";
import type { TFunction } from "i18next";
import type { SubvariantOptions, WidgetSubvariant } from "../types/widget.js";
export declare const useProcessMessage: (
  step?: LiFiStep,
  process?: Process,
) => {
  title?: string;
  message?: string;
};
export declare function getProcessMessage(
  t: TFunction,
  getChainById: (chainId: number) => EVMChain | undefined,
  step: LiFiStep,
  process: Process,
  subvariant?: WidgetSubvariant,
  subvariantOptions?: SubvariantOptions,
): {
  title?: string;
  message?: string;
};
