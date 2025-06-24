import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layers from "@mui/icons-material/Layers";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IconTypography } from "../IconTypography.js";
export const RouteCardEssentialsExpanded = ({ route }) => {
  const { t } = useTranslation();
  return _jsxs(Box, {
    sx: {
      flex: 1,
      mt: 2,
    },
    children: [
      _jsxs(Box, {
        sx: {
          display: "flex",
          alignItems: "center",
        },
        children: [
          _jsx(IconTypography, { ml: 1, mr: 3, children: _jsx(Layers, {}) }),
          _jsx(Typography, {
            sx: {
              fontSize: 16,
              color: "text.primary",
              fontWeight: "600",
              lineHeight: 1.125,
            },
            children: route.steps.length,
          }),
        ],
      }),
      _jsx(Box, {
        sx: {
          mt: 0.5,
          ml: 7,
        },
        children: _jsx(Typography, {
          sx: {
            fontSize: 12,
            color: "text.secondary",
            fontWeight: "500",
            lineHeight: 1.125,
          },
          children: t("tooltip.numberOfSteps"),
        }),
      }),
    ],
  });
};
//# sourceMappingURL=RouteCardEssentialsExpanded.js.map
