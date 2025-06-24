import type { Route } from "@lifi/sdk";
import type { BoxProps } from "@mui/material";
type WarningMessagesProps = BoxProps & {
  route?: Route;
  allowInteraction?: boolean;
};
export declare const WarningMessages: React.FC<WarningMessagesProps>;
export {};
