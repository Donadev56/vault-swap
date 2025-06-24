import { jsx as _jsx } from "react/jsx-runtime";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AlertMessage } from "./AlertMessage.js";
export const AccountDeployedMessage = ({ ...props }) => {
  const { t } = useTranslation();
  return _jsx(AlertMessage, {
    title: _jsx(Typography, {
      variant: "body2",
      sx: {
        px: 1,
        color: "text.primary",
      },
      children: t("info.message.accountDeployedMessage"),
    }),
    icon: _jsx(WarningRounded, {}),
    severity: "warning",
    multiline: true,
    ...props,
  });
};
//# sourceMappingURL=AccountDeployedMessage.js.map
