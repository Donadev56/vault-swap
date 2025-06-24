import { jsx as _jsx } from "react/jsx-runtime";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AlertMessage } from "./AlertMessage.js";
export const AccountNotDeployedMessage = (props) => {
  const { t } = useTranslation();
  return _jsx(AlertMessage, {
    title: _jsx(Typography, {
      variant: "body2",
      sx: { color: "text.primary" },
      children: t("warning.message.accountNotDeployedMessage"),
    }),
    icon: _jsx(WarningRounded, {}),
    severity: "warning",
    multiline: true,
    ...props,
  });
};
//# sourceMappingURL=AccountNotDeployedMessage.js.map
