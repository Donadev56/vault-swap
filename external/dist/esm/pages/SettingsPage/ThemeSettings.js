import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BrightnessAuto from "@mui/icons-material/BrightnessAuto";
import LightMode from "@mui/icons-material/LightMode";
import Nightlight from "@mui/icons-material/Nightlight";
import { Tooltip, useColorScheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CardValue } from "../../components/Card/CardButton.style.js";
import { CardTabs, Tab } from "../../components/Tabs/Tabs.style.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { HiddenUI } from "../../types/widget.js";
import { SettingCardExpandable } from "./SettingsCard/SettingCardExpandable.js";
const themeIcons = {
  light: LightMode,
  dark: Nightlight,
  system: BrightnessAuto,
};
// If the Tab is not the direct child of the Tabs component you can loose the switching
// The component passes the props to the Tab component so switching isn't lost
const ThemeTab = ({ title, value, Icon, ...props }) =>
  _jsx(Tooltip, {
    title: title,
    children: _jsx(Tab, {
      icon: Icon,
      value: value,
      ...props,
      disableRipple: true,
    }),
  });
export const ThemeSettings = () => {
  const { t } = useTranslation();
  const { mode, setMode } = useColorScheme();
  const { hiddenUI } = useWidgetConfig();
  if (hiddenUI?.includes(HiddenUI.Appearance)) {
    return null;
  }
  const appearance = mode ?? "system";
  const ThemeIcon = themeIcons[appearance];
  const handleThemeChange = (_, appearance) => {
    setMode(appearance);
  };
  return _jsx(SettingCardExpandable, {
    value: _jsxs(CardValue, { children: [t(`button.${appearance}`), " "] }),
    icon: _jsx(ThemeIcon, {}),
    title: t("settings.appearance"),
    children: _jsx(CardTabs, {
      value: appearance,
      "aria-label": "tabs",
      indicatorColor: "primary",
      onChange: handleThemeChange,
      sx: { mt: 1.5 },
      children: Object.entries(themeIcons).map(([theme, Icon]) => {
        const supportedThemeOption = theme;
        return _jsx(
          ThemeTab,
          {
            title: t(`button.${supportedThemeOption}`),
            value: supportedThemeOption,
            Icon: _jsx(Icon, {}),
          },
          supportedThemeOption,
        );
      }),
    }),
  });
};
//# sourceMappingURL=ThemeSettings.js.map
