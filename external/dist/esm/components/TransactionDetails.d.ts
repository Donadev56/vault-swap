import type { RouteExtended } from "@lifi/sdk";
import type { CardProps } from "@mui/material";
interface TransactionDetailsProps extends CardProps {
  route: RouteExtended;
}
export declare const TransactionDetails: React.FC<TransactionDetailsProps>;
export {};
