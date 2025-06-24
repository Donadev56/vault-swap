import type { FormType } from "../stores/form/types.js";
export type UpdateToAddressArgs = {
  formType: FormType;
  selectedToAddress?: string;
  selectedChainId?: number;
  selectedOppositeTokenAddress?: string;
  selectedOppositeChainId?: number;
};
/**
 * Automatically populates toAddress field if bridging across ecosystems and compatible wallet is connected
 */
export declare const useToAddressAutoPopulate: () => ({
  formType,
  selectedToAddress,
  selectedChainId,
  selectedOppositeTokenAddress,
  selectedOppositeChainId,
}: UpdateToAddressArgs) => string | undefined;
