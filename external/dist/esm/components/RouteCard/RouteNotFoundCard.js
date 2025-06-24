import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Route from "@mui/icons-material/Route";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export const RouteNotFoundCard = () => {
  const { t } = useTranslation();
  return _jsxs(Box, {
    sx: {
      py: 1.625,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      flex: 1,
    },
    children: [
      _jsx(Typography, {
        sx: {
          fontSize: 48,
        },
        children: _jsx(Route, { fontSize: "inherit" }),
      }),
      _jsx(Typography, {
        sx: {
          fontSize: 18,
          fontWeight: 700,
        },
        children: t("info.title.routeNotFound"),
      }),
      _jsx(Typography, {
        sx: {
          fontSize: 14,
          color: "text.secondary",
          textAlign: "center",
          mt: 2,
        },
        children: t("info.message.routeNotFound"),
      }),
    ],
  });
};
//# sourceMappingURL=RouteNotFoundCard.js.map
