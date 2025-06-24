import type { Token } from "@lifi/sdk";
import type { CardProps } from "@mui/material";
import type { ReactNode } from "react";
import { type FormTypeProps } from "../../stores/form/types.js";
export declare const AmountInput: React.FC<FormTypeProps & CardProps>;
export declare const AmountInputBase: React.FC<
  FormTypeProps &
    CardProps & {
      token?: Token;
      startAdornment?: ReactNode;
      endAdornment?: ReactNode;
      bottomAdornment?: ReactNode;
      disabled?: boolean;
    }
>;
