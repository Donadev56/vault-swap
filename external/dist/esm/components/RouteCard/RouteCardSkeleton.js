import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Skeleton } from "@mui/material";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { Card } from "../Card/Card.js";
import { TokenSkeleton } from "../Token/Token.js";
export const RouteCardSkeleton = ({ variant, ...other }) => {
  const { subvariant } = useWidgetConfig();
  const cardContent = _jsxs(Box, {
    sx: {
      flex: 1,
    },
    children: [
      subvariant !== "refuel" && subvariant !== "custom"
        ? _jsx(Box, {
            sx: {
              display: "flex",
              alignItems: "center",
              mb: 2,
            },
            children: _jsx(Skeleton, {
              variant: "rectangular",
              width: 112,
              height: 24,
              sx: (theme) => ({
                borderRadius: theme.vars.shape.borderRadius,
              }),
            }),
          })
        : null,
      _jsx(TokenSkeleton, {}),
      _jsxs(Box, {
        sx: {
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
        },
        children: [
          _jsx(Skeleton, { variant: "text", width: 64, height: 20 }),
          _jsx(Skeleton, { variant: "text", width: 56, height: 20 }),
        ],
      }),
    ],
  });
  return subvariant === "refuel" || variant === "cardless"
    ? cardContent
    : _jsx(Card, { indented: true, ...other, children: cardContent });
};
//# sourceMappingURL=RouteCardSkeleton.js.map
