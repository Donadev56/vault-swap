import { jsx as _jsx } from "react/jsx-runtime";
import Route from "@mui/icons-material/Route";
import { useTranslation } from "react-i18next";
import { CardTabs, Tab } from "../../components/Tabs/Tabs.style.js";
import { useSettingMonitor } from "../../hooks/useSettingMonitor.js";
import { useSettings } from "../../stores/settings/useSettings.js";
import { useSettingsActions } from "../../stores/settings/useSettingsActions.js";
import { BadgedValue } from "./SettingsCard/BadgedValue.js";
import { SettingCardExpandable } from "./SettingsCard/SettingCardExpandable.js";
const Priorities = ["CHEAPEST", "FASTEST"];
export const RoutePrioritySettings = () => {
  const { t } = useTranslation();
  const { setValue } = useSettingsActions();
  const { isRoutePriorityChanged } = useSettingMonitor();
  const { routePriority } = useSettings(["routePriority"]);
  const currentRoutePriority = routePriority ?? "";
  const handleRoutePriorityChange = (_, routePriority) => {
    setValue("routePriority", routePriority);
  };
  return _jsx(SettingCardExpandable, {
    value: _jsx(BadgedValue, {
      badgeColor: "info",
      showBadge: isRoutePriorityChanged,
      children: t(`main.tags.${currentRoutePriority.toLowerCase()}`),
    }),
    icon: _jsx(Route, {}),
    title: t("settings.routePriority"),
    children: _jsx(CardTabs, {
      value: currentRoutePriority,
      "aria-label": "tabs",
      indicatorColor: "primary",
      onChange: handleRoutePriorityChange,
      orientation: "vertical",
      sx: { mt: 1.5 },
      children: Priorities.map((priority) => {
        return _jsx(
          Tab,
          {
            label: t(`main.tags.${priority.toLowerCase()}`),
            value: priority,
            disableRipple: true,
          },
          priority,
        );
      }),
    }),
  });
};
//# sourceMappingURL=RoutePrioritySettings.js.map
