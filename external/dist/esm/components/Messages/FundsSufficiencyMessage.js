import { jsx as _jsx } from "react/jsx-runtime";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AlertMessage } from "./AlertMessage.js";
export const FundsSufficiencyMessage = (props) => {
  const { t } = useTranslation();
  return _jsx(AlertMessage, {
    severity: "warning",
    icon: _jsx(WarningRounded, {}),
    title: _jsx(Typography, {
      variant: "body2",
      sx: {
        color: "text.primary",
      },
      children: t("warning.message.insufficientFunds"),
    }),
    multiline: true,
    ...props,
  });
};
//# sourceMappingURL=FundsSufficiencyMessage.js.map
