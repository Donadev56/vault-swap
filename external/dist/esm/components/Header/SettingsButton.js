import { jsx as _jsx } from "react/jsx-runtime";
import Settings from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigateBack } from "../../hooks/useNavigateBack.js";
import { useSettingMonitor } from "../../hooks/useSettingMonitor.js";
import { navigationRoutes } from "../../utils/navigationRoutes.js";
import {
  SettingsIconBadge,
  SettingsIconButton,
} from "./SettingsButton.style.js";
export const SettingsButton = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigateBack();
  const { isCustomRouteSettings, isRouteSettingsWithWarnings } =
    useSettingMonitor();
  const variant = isRouteSettingsWithWarnings
    ? "warning"
    : isCustomRouteSettings
      ? "info"
      : undefined;
  const tooltipMessage = variant
    ? t("tooltip.settingsModified")
    : t("header.settings");
  return _jsx(Tooltip, {
    title: tooltipMessage,
    children: _jsx(SettingsIconButton, {
      size: "medium",
      onClick: () => navigate(navigationRoutes.settings),
      variant: variant,
      children: variant
        ? _jsx(SettingsIconBadge, {
            variant: "dot",
            color: variant,
            children: _jsx(Settings, {}),
          })
        : _jsx(Settings, {}),
    }),
  });
};
//# sourceMappingURL=SettingsButton.js.map
