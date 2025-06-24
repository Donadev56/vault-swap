import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormHelperText, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTokenAddressBalance } from "../../hooks/useTokenAddressBalance.js";
import { FormKeyHelper } from "../../stores/form/types.js";
import { useFieldValues } from "../../stores/form/useFieldValues.js";
import { formatTokenAmount, formatTokenPrice } from "../../utils/format.js";
export const PriceFormHelperText = ({ formType }) => {
  const [chainId, tokenAddress] = useFieldValues(
    FormKeyHelper.getChainKey(formType),
    FormKeyHelper.getTokenKey(formType),
  );
  const { token, isLoading } = useTokenAddressBalance(chainId, tokenAddress);
  return _jsx(PriceFormHelperTextBase, {
    formType: formType,
    isLoading: isLoading,
    tokenAddress: tokenAddress,
    token: token,
  });
};
export const PriceFormHelperTextBase = ({
  formType,
  isLoading,
  tokenAddress,
  token,
}) => {
  const { t } = useTranslation();
  const [amount] = useFieldValues(FormKeyHelper.getAmountKey(formType));
  const tokenAmount = token
    ? formatTokenAmount(token.amount, token.decimals)
    : "0";
  const tokenPrice = formatTokenPrice(amount, token?.priceUSD);
  return _jsxs(FormHelperText, {
    component: "div",
    sx: {
      display: "flex",
      justifyContent: "space-between",
      margin: 0,
      marginLeft: 2,
      marginTop: 0.75,
    },
    children: [
      _jsx(Typography, {
        sx: {
          color: "text.secondary",
          fontWeight: 500,
          fontSize: 12,
          lineHeight: 1,
          flex: 1,
          wordBreak: "break-word",
          overflowWrap: "break-word",
        },
        children: t("format.currency", {
          value: tokenPrice,
        }),
      }),
      isLoading && tokenAddress
        ? _jsx(Skeleton, { variant: "text", width: 48, height: 12 })
        : token?.amount
          ? _jsx(Typography, {
              sx: {
                fontWeight: 500,
                fontSize: 12,
                color: "text.secondary",
                lineHeight: 1,
                pl: 0.25,
              },
              title: tokenAmount,
              children: `/ ${t("format.tokenAmount", {
                value: tokenAmount,
              })}`,
            })
          : null,
    ],
  });
};
//# sourceMappingURL=PriceFormHelperText.js.map
