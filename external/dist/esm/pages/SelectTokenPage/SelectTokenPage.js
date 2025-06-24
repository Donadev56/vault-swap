import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChainSelect } from "../../components/ChainSelect/ChainSelect.js";
import { FullPageContainer } from "../../components/FullPageContainer.js";
import { TokenList } from "../../components/TokenList/TokenList.js";
import { useHeader } from "../../hooks/useHeader.js";
import { useListHeight } from "../../hooks/useListHeight.js";
import { useNavigateBack } from "../../hooks/useNavigateBack.js";
import { useScrollableOverflowHidden } from "../../hooks/useScrollableContainer.js";
import { useSwapOnly } from "../../hooks/useSwapOnly.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { HiddenUI } from "../../types/widget.js";
import { SearchTokenInput } from "./SearchTokenInput.js";
export const SelectTokenPage = ({ formType }) => {
  useScrollableOverflowHidden();
  const { navigateBack } = useNavigateBack();
  const headerRef = useRef(null);
  const listParentRef = useRef(null);
  const { listHeight, minListHeight } = useListHeight({
    listParentRef,
    headerRef,
  });
  const swapOnly = useSwapOnly();
  const { subvariant, hiddenUI } = useWidgetConfig();
  const { t } = useTranslation();
  const title =
    formType === "from"
      ? subvariant === "custom"
        ? t("header.payWith")
        : t("header.from")
      : t("header.to");
  useHeader(title);
  const hideChainSelect =
    (swapOnly && formType === "to") || hiddenUI?.includes(HiddenUI.ChainSelect);
  return _jsxs(FullPageContainer, {
    disableGutters: true,
    children: [
      _jsxs(Box, {
        ref: headerRef,
        sx: {
          pb: 2,
          px: 3,
        },
        children: [
          !hideChainSelect ? _jsx(ChainSelect, { formType: formType }) : null,
          _jsx(Box, {
            sx: {
              mt: !hideChainSelect ? 2 : 0,
            },
            children: _jsx(SearchTokenInput, {}),
          }),
        ],
      }),
      _jsx(Box, {
        sx: {
          height: minListHeight,
        },
        children: _jsx(TokenList, {
          parentRef: listParentRef,
          height: listHeight,
          onClick: navigateBack,
          formType: formType,
        }),
      }),
    ],
  });
};
//# sourceMappingURL=SelectTokenPage.js.map
