import type { ExtendedChain } from "@lifi/sdk";
import type { BoxProps } from "@mui/material";
interface MissingRouteRequiredAccountMessageProps extends BoxProps {
  chain?: ExtendedChain;
  address?: string;
}
export declare const MissingRouteRequiredAccountMessage: React.FC<MissingRouteRequiredAccountMessageProps>;
export {};
