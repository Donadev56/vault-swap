import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { formatUnits } from "viem";
import { create } from "zustand";
import { TokenRateTypography } from "./TokenRate.style.js";
const useTokenRate = create((set) => ({
  isForward: true,
  toggleIsForward: () => set((state) => ({ isForward: !state.isForward })),
}));
export const TokenRate = ({ route }) => {
  const { t } = useTranslation();
  const { isForward, toggleIsForward } = useTokenRate();
  const toggleRate = (e) => {
    e.stopPropagation();
    toggleIsForward();
  };
  const lastStep = route.steps.at(-1);
  const fromToken = {
    ...route.fromToken,
    amount: BigInt(route.fromAmount),
  };
  const toToken = {
    ...(lastStep?.execution?.toToken ??
      lastStep?.action.toToken ??
      route.toToken),
    amount: lastStep?.execution?.toAmount
      ? BigInt(lastStep.execution.toAmount)
      : BigInt(route.toAmount),
  };
  const fromToRate =
    Number.parseFloat(formatUnits(toToken.amount, toToken.decimals)) /
    Number.parseFloat(formatUnits(fromToken.amount, fromToken.decimals));
  const toFromRate =
    Number.parseFloat(formatUnits(fromToken.amount, fromToken.decimals)) /
    Number.parseFloat(formatUnits(toToken.amount, toToken.decimals));
  const rateText = isForward
    ? `1 ${fromToken.symbol} ≈ ${t("format.tokenAmount", { value: fromToRate })} ${toToken.symbol}`
    : `1 ${toToken.symbol} ≈ ${t("format.tokenAmount", { value: toFromRate })} ${fromToken.symbol}`;
  return (
    // biome-ignore lint/a11y/useSemanticElements:
    _jsx(TokenRateTypography, {
      onClick: toggleRate,
      role: "button",
      children: rateText,
    })
  );
};
//# sourceMappingURL=TokenRate.js.map
