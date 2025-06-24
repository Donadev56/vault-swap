import { jsx as _jsx } from "react/jsx-runtime";
import { useAccountDisconnect } from "@lifi/wallet-management";
import PowerSettingsNewRounded from "@mui/icons-material/PowerSettingsNewRounded";
import { IconButton } from "@mui/material";
export const DisconnectIconButton = ({ account }) => {
  const disconnect = useAccountDisconnect();
  return _jsx(IconButton, {
    size: "medium",
    onClick: async (e) => {
      e.stopPropagation();
      await disconnect(account);
    },
    children: _jsx(PowerSettingsNewRounded, {}),
  });
};
//# sourceMappingURL=DisconnectIconButton.js.map
