import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Block from "@mui/icons-material/Block";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export const NotFound = () => {
  const { t } = useTranslation();
  return _jsxs(Box, {
    sx: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      flex: 1,
      padding: 3,
    },
    children: [
      _jsx(Typography, {
        sx: {
          fontSize: 48,
        },
        children: _jsx(Block, { fontSize: "inherit" }),
      }),
      _jsx(Typography, {
        sx: {
          fontSize: 18,
          fontWeight: 700,
        },
        children: t("tooltip.notFound.title"),
      }),
      _jsx(Typography, {
        sx: {
          fontSize: 14,
          color: "text.secondary",
          textAlign: "center",
          mt: 2,
        },
        children: t("tooltip.notFound.text"),
      }),
    ],
  });
};
//# sourceMappingURL=NotFound.js.map
