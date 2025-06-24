import type { Chain, StaticToken } from "@lifi/sdk";
import type { SxProps, Theme } from "@mui/material";
export declare const TokenAvatar: React.FC<{
  token?: StaticToken;
  chain?: Chain;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}>;
export declare const TokenAvatarFallback: React.FC<{
  token?: StaticToken;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}>;
export declare const TokenAvatarBase: React.FC<{
  token?: StaticToken;
  chain?: Chain;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}>;
