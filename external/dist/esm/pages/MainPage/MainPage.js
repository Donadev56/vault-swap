import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ActiveTransactions } from "../../components/ActiveTransactions/ActiveTransactions.js";
import { AmountInput } from "../../components/AmountInput/AmountInput.js";
import { ContractComponent } from "../../components/ContractComponent/ContractComponent.js";
import { GasRefuelMessage } from "../../components/Messages/GasRefuelMessage.js";
import { PageContainer } from "../../components/PageContainer.js";
import { PoweredBy } from "../../components/PoweredBy/PoweredBy.js";
import { Routes } from "../../components/Routes/Routes.js";
import { SelectChainAndToken } from "../../components/SelectChainAndToken.js";
import { SendToWalletButton } from "../../components/SendToWallet/SendToWalletButton.js";
import { SendToWalletExpandButton } from "../../components/SendToWallet/SendToWalletExpandButton.js";
import { useHeader } from "../../hooks/useHeader.js";
import { useWideVariant } from "../../hooks/useWideVariant.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { HiddenUI } from "../../types/widget.js";
import { MainWarningMessages } from "./MainWarningMessages.js";
import { ReviewButton } from "./ReviewButton.js";
export const MainPage = () => {
  const { t } = useTranslation();
  const wideVariant = useWideVariant();
  const { subvariant, subvariantOptions, contractComponent, hiddenUI } =
    useWidgetConfig();
  const custom = subvariant === "custom";
  const showPoweredBy = !hiddenUI?.includes(HiddenUI.PoweredBy);
  const title =
    subvariant === "custom"
      ? t(`header.${subvariantOptions?.custom ?? "checkout"}`)
      : subvariant === "refuel"
        ? t("header.gas")
        : t("header.exchange");
  useHeader(title);
  const marginSx = { marginBottom: 2 };
  return _jsxs(PageContainer, {
    children: [
      _jsx(ActiveTransactions, { sx: marginSx }),
      custom
        ? _jsx(ContractComponent, { sx: marginSx, children: contractComponent })
        : null,
      _jsx(SelectChainAndToken, { mb: 2 }),
      !custom || subvariantOptions?.custom === "deposit"
        ? _jsx(AmountInput, { formType: "from", sx: marginSx })
        : null,
      !wideVariant ? _jsx(Routes, { sx: marginSx }) : null,
      _jsx(SendToWalletButton, { sx: marginSx }),
      _jsx(GasRefuelMessage, { mb: 2 }),
      _jsx(MainWarningMessages, { mb: 2 }),
      _jsxs(Box, {
        sx: {
          display: "flex",
          mb: showPoweredBy ? 1 : 3,
          gap: 1.5,
        },
        children: [_jsx(ReviewButton, {}), _jsx(SendToWalletExpandButton, {})],
      }),
      false ? _jsx(PoweredBy, {}) : null,
    ],
  });
};
//# sourceMappingURL=MainPage.js.map
