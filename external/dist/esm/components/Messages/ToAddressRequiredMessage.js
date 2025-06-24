import { jsx as _jsx } from "react/jsx-runtime";
import Wallet from "@mui/icons-material/Wallet";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AlertMessage } from "./AlertMessage.js";
export const ToAddressRequiredMessage = ({ ...props }) => {
  const { t } = useTranslation();
  return _jsx(AlertMessage, {
    title: _jsx(Typography, {
      variant: "body2",
      sx: {
        px: 1,
        color: "text.primary",
      },
      children: t("info.message.toAddressIsRequired"),
    }),
    icon: _jsx(Wallet, {}),
    multiline: true,
    ...props,
  });
};
//# sourceMappingURL=ToAddressRequiredMessage.js.map
