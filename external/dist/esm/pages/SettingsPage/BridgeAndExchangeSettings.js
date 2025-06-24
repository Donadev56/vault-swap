import { jsx as _jsx } from "react/jsx-runtime";
import AirlineStops from "@mui/icons-material/AirlineStops";
import SwapHoriz from "@mui/icons-material/SwapHoriz";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { CardButton } from "../../components/Card/CardButton.js";
import { useSettingMonitor } from "../../hooks/useSettingMonitor.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { useSettingsStore } from "../../stores/settings/useSettingsStore.js";
import { HiddenUI } from "../../types/widget.js";
import { navigationRoutes } from "../../utils/navigationRoutes.js";
import { BadgedValue } from "./SettingsCard/BadgedValue.js";
const supportedIcons = {
  Bridges: AirlineStops,
  Exchanges: SwapHoriz,
};
export const BridgeAndExchangeSettings = ({ type }) => {
  const { isBridgesChanged, isExchangesChanged } = useSettingMonitor();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [enabledTools, tools] = useSettingsStore((state) => {
    const enabledTools = Object.values(state[`_enabled${type}`]);
    return [enabledTools.filter(Boolean).length, enabledTools.length];
  }, shallow);
  const { hiddenUI } = useWidgetConfig();
  if (type === "Bridges" && hiddenUI?.includes(HiddenUI.BridgesSettings)) {
    return null;
  }
  const customisationLookUp = {
    Bridges: isBridgesChanged,
    Exchanges: isExchangesChanged,
  };
  const handleClick = () => {
    navigate(navigationRoutes[type.toLowerCase()]);
  };
  const Icon = supportedIcons[type];
  return _jsx(CardButton, {
    onClick: handleClick,
    icon: _jsx(Icon, {}),
    title: t(`settings.enabled${type}`),
    children: _jsx(BadgedValue, {
      badgeColor: "info",
      showBadge: customisationLookUp[type],
      children: `${enabledTools}/${tools}`,
    }),
  });
};
//# sourceMappingURL=BridgeAndExchangeSettings.js.map
