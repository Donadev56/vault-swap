import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EvStation from "@mui/icons-material/EvStation";
import { Box, Collapse, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGasRefuel } from "../../hooks/useGasRefuel.js";
import { useSettings } from "../../stores/settings/useSettings.js";
import { useSettingsActions } from "../../stores/settings/useSettingsActions.js";
import { AlertMessage } from "./AlertMessage.js";
import { InfoMessageSwitch } from "./GasRefuelMessage.style.js";
export const GasRefuelMessage = (props) => {
  const { t } = useTranslation();
  const { setValue } = useSettingsActions();
  const { enabledAutoRefuel } = useSettings(["enabledAutoRefuel"]);
  const { enabled, chain, isLoading: isRefuelLoading } = useGasRefuel();
  const onChange = (_, checked) => {
    setValue("enabledAutoRefuel", checked);
  };
  const showGasRefuelMessage = chain && enabled && !isRefuelLoading;
  return _jsx(Collapse, {
    timeout: 225,
    in: showGasRefuelMessage,
    unmountOnExit: true,
    mountOnEnter: true,
    children: _jsx(AlertMessage, {
      icon: _jsx(EvStation, {}),
      title: _jsxs(Box, {
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 1,
        },
        children: [
          _jsx(Typography, {
            variant: "body2",
            sx: {
              fontWeight: 700,
            },
            children: t("info.title.autoRefuel", {
              chainName: chain?.name ?? "",
            }),
          }),
          _jsx(InfoMessageSwitch, {
            checked: enabledAutoRefuel,
            onChange: onChange,
          }),
        ],
      }),
      ...props,
      children: _jsx(Collapse, {
        timeout: 225,
        in: enabledAutoRefuel,
        unmountOnExit: true,
        mountOnEnter: true,
        children: _jsx(Typography, {
          variant: "body2",
          sx: {
            px: 2,
            pt: 1,
          },
          children: t("info.message.autoRefuel", {
            chainName: chain?.name,
          }),
        }),
      }),
    }),
  });
};
//# sourceMappingURL=GasRefuelMessage.js.map
