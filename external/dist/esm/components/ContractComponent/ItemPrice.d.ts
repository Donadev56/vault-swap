import type { ContractCall } from "@lifi/sdk";
import type { TokenAmount } from "../../types/token.js";
export interface ItemPriceProps {
  token: TokenAmount;
  contractCalls?: ContractCall[];
}
export declare const ItemPrice: React.FC<ItemPriceProps>;
