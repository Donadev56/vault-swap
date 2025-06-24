import { jsx as _jsx } from "react/jsx-runtime";
import Wallet from "@mui/icons-material/Wallet";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { shortenAddress } from "../../utils/wallet.js";
import { AlertMessage } from "./AlertMessage.js";
export const MissingRouteRequiredAccountMessage = ({
  chain,
  address,
  ...props
}) => {
  const { t } = useTranslation();
  if (!chain) {
    return null;
  }
  return _jsx(AlertMessage, {
    title: _jsx(Typography, {
      variant: "body2",
      sx: {
        px: 1,
        color: "text.primary",
      },
      children: t("info.message.missingRouteRequiredAccount", {
        chainName: chain.name,
        address: address ? `(${shortenAddress(address)})` : "",
      }),
    }),
    icon: _jsx(Wallet, {}),
    multiline: true,
    ...props,
  });
};
//# sourceMappingURL=MissingRouteRequiredAccountMessage.js.map
