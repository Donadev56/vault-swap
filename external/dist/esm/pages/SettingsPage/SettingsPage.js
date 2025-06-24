import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { PageContainer } from "../../components/PageContainer.js";
import { useHeader } from "../../hooks/useHeader.js";
import { BridgeAndExchangeSettings } from "./BridgeAndExchangeSettings.js";
import { GasPriceSettings } from "./GasPriceSettings.js";
import { LanguageSetting } from "./LanguageSetting.js";
import { ResetSettingsButton } from "./ResetSettingsButton.js";
import { RoutePrioritySettings } from "./RoutePrioritySettings.js";
import { SettingsList } from "./SettingsCard/SettingCard.style.js";
import { SettingsCardAccordion } from "./SettingsCard/SettingsAccordian.js";
import { SlippageSettings } from "./SlippageSettings/SlippageSettings.js";
import { ThemeSettings } from "./ThemeSettings.js";
export const SettingsPage = () => {
  const { t } = useTranslation();
  useHeader(t("header.settings"));
  return _jsxs(PageContainer, {
    bottomGutters: true,
    children: [
      _jsx(SettingsList, {
        children: _jsxs(SettingsCardAccordion, {
          children: [
            _jsx(ThemeSettings, {}),
            _jsx(LanguageSetting, {}),
            _jsx(RoutePrioritySettings, {}),
            _jsx(GasPriceSettings, {}),
            _jsx(SlippageSettings, {}),
            _jsx(BridgeAndExchangeSettings, { type: "Bridges" }),
            _jsx(BridgeAndExchangeSettings, { type: "Exchanges" }),
          ],
        }),
      }),
      _jsx(ResetSettingsButton, {}),
    ],
  });
};
//# sourceMappingURL=SettingsPage.js.map
