import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EvStation from "@mui/icons-material/EvStation";
import { useTranslation } from "react-i18next";
import { CardTabs, Tab } from "../../components/Tabs/Tabs.style.js";
import { useSettingMonitor } from "../../hooks/useSettingMonitor.js";
import { useSettings } from "../../stores/settings/useSettings.js";
import { useSettingsActions } from "../../stores/settings/useSettingsActions.js";
import { BadgedValue } from "./SettingsCard/BadgedValue.js";
import { SettingCardExpandable } from "./SettingsCard/SettingCardExpandable.js";
export const GasPriceSettings = () => {
  const { t } = useTranslation();
  const { setValue } = useSettingsActions();
  const { isGasPriceChanged } = useSettingMonitor();
  const { gasPrice } = useSettings(["gasPrice"]);
  const handleGasPriceChange = (_, gasPrice) => {
    setValue("gasPrice", gasPrice);
  };
  return _jsx(SettingCardExpandable, {
    value: _jsx(BadgedValue, {
      badgeColor: "info",
      showBadge: isGasPriceChanged,
      children: t(`settings.gasPrice.${gasPrice}`),
    }),
    icon: _jsx(EvStation, {}),
    title: t("settings.gasPrice.title"),
    children: _jsxs(CardTabs, {
      value: gasPrice,
      "aria-label": "tabs",
      indicatorColor: "primary",
      onChange: handleGasPriceChange,
      sx: { mt: 1.5 },
      children: [
        _jsx(Tab, {
          label: t("settings.gasPrice.slow"),
          value: "slow",
          disableRipple: true,
        }),
        _jsx(Tab, {
          label: t("settings.gasPrice.normal"),
          value: "normal",
          disableRipple: true,
        }),
        _jsx(Tab, {
          label: t("settings.gasPrice.fast"),
          value: "fast",
          disableRipple: true,
        }),
      ],
    }),
  });
};
//# sourceMappingURL=GasPriceSettings.js.map
