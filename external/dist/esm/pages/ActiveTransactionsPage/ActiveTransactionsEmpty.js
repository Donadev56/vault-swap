import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SwapHoriz from "@mui/icons-material/SwapHoriz";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export const ActiveTransactionsEmpty = () => {
  const { t } = useTranslation();
  return _jsxs(Container, {
    sx: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingY: 12,
    },
    children: [
      _jsx(Typography, {
        sx: {
          fontSize: 48,
        },
        children: _jsx(SwapHoriz, { fontSize: "inherit" }),
      }),
      _jsx(Typography, {
        sx: {
          fontSize: 18,
          fontWeight: 700,
        },
        children: t("info.title.emptyActiveTransactions"),
      }),
      _jsx(Typography, {
        sx: {
          fontSize: 14,
          color: "text.secondary",
          textAlign: "center",
          mt: 2,
        },
        children: t("info.message.emptyActiveTransactions"),
      }),
    ],
  });
};
//# sourceMappingURL=ActiveTransactionsEmpty.js.map
