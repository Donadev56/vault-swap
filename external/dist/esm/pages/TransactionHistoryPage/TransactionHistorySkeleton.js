import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Skeleton } from "@mui/material";
import { Card } from "../../components/Card/Card.js";
import { TokenSkeleton } from "../../components/Token/Token.js";
import { TokenDivider } from "../../components/Token/Token.style.js";
export const TransactionHistoryItemSkeleton = () => {
  return _jsxs(Card, {
    style: {
      marginBottom: "16px",
    },
    children: [
      _jsxs(Box, {
        sx: {
          pt: 2,
          px: 2,
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
        },
        children: [
          _jsx(Skeleton, {
            variant: "rectangular",
            width: 96,
            height: 16,
            sx: (theme) => ({
              borderRadius: theme.vars.shape.borderRadius,
            }),
          }),
          _jsx(Skeleton, {
            variant: "rectangular",
            width: 64,
            height: 16,
            sx: (theme) => ({
              borderRadius: theme.vars.shape.borderRadius,
            }),
          }),
        ],
      }),
      _jsxs(Box, {
        sx: {
          px: 2,
          py: 2,
        },
        children: [
          _jsx(TokenSkeleton, {}),
          _jsx(Box, {
            sx: {
              pl: 2.375,
              py: 0.5,
            },
            children: _jsx(TokenDivider, {}),
          }),
          _jsx(TokenSkeleton, {}),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=TransactionHistorySkeleton.js.map
