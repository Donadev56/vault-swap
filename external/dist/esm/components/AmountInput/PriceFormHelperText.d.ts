import type { TokenAmount } from "@lifi/sdk";
import type { FormTypeProps } from "../../stores/form/types.js";
export declare const PriceFormHelperText: React.FC<FormTypeProps>;
export declare const PriceFormHelperTextBase: React.FC<
  FormTypeProps & {
    isLoading?: boolean;
    tokenAddress?: string;
    token?: TokenAmount;
  }
>;
