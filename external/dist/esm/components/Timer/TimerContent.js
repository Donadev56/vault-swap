import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AccessTimeFilled from "@mui/icons-material/AccessTimeFilled";
import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { IconTypography } from "../IconTypography.js";
export const TimerContent = ({ children }) => {
  const { t } = useTranslation();
  return _jsx(Tooltip, {
    title: t("tooltip.estimatedTime"),
    sx: { cursor: "help" },
    children: _jsxs(Box, {
      component: "span",
      sx: {
        display: "flex",
        alignItems: "center",
        height: 14,
      },
      children: [
        _jsx(IconTypography, {
          as: "span",
          sx: { marginRight: 0.5, fontSize: 16 },
          children: _jsx(AccessTimeFilled, { fontSize: "inherit" }),
        }),
        _jsx(Box, {
          component: "span",
          sx: {
            fontVariantNumeric: "tabular-nums",
            cursor: "help",
          },
          children: children,
        }),
      ],
    }),
  });
};
//# sourceMappingURL=TimerContent.js.map
