import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useMediaQuery } from "@mui/material";
import { ReverseTokensButton } from "../components/ReverseTokensButton/ReverseTokensButton.js";
import { SelectTokenButton } from "../components/SelectTokenButton/SelectTokenButton.js";
import { useWidgetConfig } from "../providers/WidgetProvider/WidgetProvider.js";
import { useFieldValues } from "../stores/form/useFieldValues.js";
import { DisabledUI, HiddenUI } from "../types/widget.js";
import { ReverseTokensButtonEmpty } from "./ReverseTokensButton/ReverseTokensButton.style.js";
export const SelectChainAndToken = (props) => {
  const prefersNarrowView = useMediaQuery((theme) =>
    theme.breakpoints.down("sm"),
  );
  const { disabledUI, hiddenUI, subvariant } = useWidgetConfig();
  const [fromChain, toChain, fromToken, toToken] = useFieldValues(
    "fromChain",
    "toChain",
    "fromToken",
    "toToken",
  );
  const hiddenReverse =
    subvariant === "refuel" ||
    disabledUI?.includes(DisabledUI.FromToken) ||
    disabledUI?.includes(DisabledUI.ToToken) ||
    hiddenUI?.includes(HiddenUI.ToToken) ||
    hiddenUI?.includes(HiddenUI.ReverseTokensButton);
  const hiddenToToken =
    subvariant === "custom" || hiddenUI?.includes(HiddenUI.ToToken);
  const isCompact =
    !!fromChain &&
    !!toChain &&
    !!fromToken &&
    !!toToken &&
    !prefersNarrowView &&
    !hiddenToToken;
  return _jsxs(Box, {
    sx: { display: "flex", flexDirection: isCompact ? "row" : "column" },
    ...props,
    children: [
      _jsx(SelectTokenButton, {
        formType: "from",
        compact: isCompact,
        hiddenReverse: hiddenReverse,
      }),
      !hiddenToToken
        ? !hiddenReverse
          ? _jsx(ReverseTokensButton, { vertical: !isCompact })
          : _jsx(ReverseTokensButtonEmpty, {})
        : null,
      !hiddenToToken
        ? _jsx(SelectTokenButton, {
            formType: "to",
            compact: isCompact,
            hiddenReverse: hiddenReverse,
          })
        : null,
    ],
  });
};
//# sourceMappingURL=SelectChainAndToken.js.map
