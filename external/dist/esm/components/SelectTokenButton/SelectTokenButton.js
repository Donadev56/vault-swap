import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChain } from "../../hooks/useChain.js";
import { useSwapOnly } from "../../hooks/useSwapOnly.js";
import { useToken } from "../../hooks/useToken.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { FormKeyHelper } from "../../stores/form/types.js";
import { useFieldValues } from "../../stores/form/useFieldValues.js";
import { HiddenUI } from "../../types/widget.js";
import { navigationRoutes } from "../../utils/navigationRoutes.js";
import { AvatarBadgedDefault, AvatarBadgedSkeleton } from "../Avatar/Avatar.js";
import { TokenAvatar } from "../Avatar/TokenAvatar.js";
import { CardTitle } from "../Card/CardTitle.js";
import {
  CardContent,
  SelectTokenCard,
  SelectTokenCardHeader,
} from "./SelectTokenButton.style.js";
export const SelectTokenButton = ({ formType, compact, hiddenReverse }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { disabledUI, subvariant, hiddenUI } = useWidgetConfig();
  const swapOnly = useSwapOnly();
  const tokenKey = FormKeyHelper.getTokenKey(formType);
  const [chainId, tokenAddress] = useFieldValues(
    FormKeyHelper.getChainKey(formType),
    tokenKey,
  );
  const { chain, isLoading: isChainLoading } = useChain(chainId);
  const { token, isLoading: isTokenLoading } = useToken(chainId, tokenAddress);
  const handleClick = () => {
    navigate(
      formType === "from"
        ? navigationRoutes.fromToken
        : subvariant === "refuel"
          ? navigationRoutes.toTokenNative
          : navigationRoutes.toToken,
    );
  };
  const isSelected = !!(chain && token);
  const onClick = !disabledUI?.includes(tokenKey) ? handleClick : undefined;
  const defaultPlaceholder =
    formType === "to" && subvariant === "refuel"
      ? t("main.selectChain")
      : (formType === "to" && swapOnly) ||
          hiddenUI?.includes(HiddenUI.ChainSelect)
        ? t("main.selectToken")
        : t("main.selectChainAndToken");
  const cardTitle =
    formType === "from" && subvariant === "custom"
      ? t("header.payWith")
      : t(`main.${formType}`);
  return _jsx(SelectTokenCard, {
    component: "button",
    onClick: onClick,
    children: _jsxs(CardContent, {
      formType: formType,
      compact: compact,
      mask: !hiddenReverse,
      children: [
        _jsx(CardTitle, { children: cardTitle }),
        chainId && tokenAddress && (isChainLoading || isTokenLoading)
          ? _jsx(SelectTokenCardHeader, {
              avatar: _jsx(AvatarBadgedSkeleton, {}),
              title: _jsx(Skeleton, { variant: "text", width: 64, height: 24 }),
              subheader: _jsx(Skeleton, {
                variant: "text",
                width: 72,
                height: 16,
              }),
              compact: compact,
            })
          : _jsx(SelectTokenCardHeader, {
              avatar: isSelected
                ? _jsx(TokenAvatar, { token: token, chain: chain })
                : _jsx(AvatarBadgedDefault, {}),
              title: isSelected ? token.symbol : defaultPlaceholder,
              slotProps: {
                title: {
                  title: isSelected ? token.symbol : defaultPlaceholder,
                },
                subheader: {
                  title: isSelected ? chain.name : undefined,
                },
              },
              subheader: isSelected ? chain.name : null,
              selected: isSelected,
              compact: compact,
            }),
      ],
    }),
  });
};
//# sourceMappingURL=SelectTokenButton.js.map
