import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useToken } from "../../hooks/useToken.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { FormKeyHelper } from "../../stores/form/types.js";
import { useFieldController } from "../../stores/form/useFieldController.js";
import { useFieldValues } from "../../stores/form/useFieldValues.js";
import { DisabledUI } from "../../types/widget.js";
import { formatInputAmount } from "../../utils/format.js";
import { fitInputText } from "../../utils/input.js";
import { CardTitle } from "../Card/CardTitle.js";
import { InputCard } from "../Card/InputCard.js";
import {
  FormContainer,
  FormControl,
  Input,
  maxInputFontSize,
  minInputFontSize,
} from "./AmountInput.style.js";
import { AmountInputEndAdornment } from "./AmountInputEndAdornment.js";
import { AmountInputStartAdornment } from "./AmountInputStartAdornment.js";
import { PriceFormHelperText } from "./PriceFormHelperText.js";
export const AmountInput = ({ formType, ...props }) => {
  const { disabledUI } = useWidgetConfig();
  const [chainId, tokenAddress] = useFieldValues(
    FormKeyHelper.getChainKey(formType),
    FormKeyHelper.getTokenKey(formType),
  );
  const { token } = useToken(chainId, tokenAddress);
  const disabled = disabledUI?.includes(DisabledUI.FromAmount);
  return _jsx(AmountInputBase, {
    formType: formType,
    token: token,
    endAdornment: !disabled
      ? _jsx(AmountInputEndAdornment, { formType: formType })
      : undefined,
    bottomAdornment: _jsx(PriceFormHelperText, { formType: formType }),
    disabled: disabled,
    ...props,
  });
};
export const AmountInputBase = ({
  formType,
  token,
  startAdornment,
  endAdornment,
  bottomAdornment,
  disabled,
  ...props
}) => {
  const { t } = useTranslation();
  const { subvariant, subvariantOptions } = useWidgetConfig();
  const ref = useRef(null);
  const amountKey = FormKeyHelper.getAmountKey(formType);
  const { onChange, onBlur, value } = useFieldController({ name: amountKey });
  const handleChange = (event) => {
    const { value } = event.target;
    const formattedAmount = formatInputAmount(value, token?.decimals, true);
    onChange(formattedAmount);
  };
  const handleBlur = (event) => {
    const { value } = event.target;
    const formattedAmount = formatInputAmount(value, token?.decimals);
    onChange(formattedAmount);
    onBlur();
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to run effect on value change
  useLayoutEffect(() => {
    if (ref.current) {
      fitInputText(maxInputFontSize, minInputFontSize, ref.current);
    }
  }, [value]);
  const title =
    subvariant === "custom"
      ? subvariantOptions?.custom === "deposit"
        ? t("header.amount")
        : t("header.youPay")
      : t("header.send");
  return _jsxs(InputCard, {
    ...props,
    children: [
      _jsx(CardTitle, { children: title }),
      _jsxs(FormContainer, {
        children: [
          _jsx(AmountInputStartAdornment, { formType: formType }),
          _jsxs(FormControl, {
            fullWidth: true,
            children: [
              _jsx(Input, {
                inputRef: ref,
                size: "small",
                autoComplete: "off",
                placeholder: "0",
                startAdornment: startAdornment,
                endAdornment: endAdornment,
                inputProps: {
                  inputMode: "decimal",
                },
                onChange: handleChange,
                onBlur: handleBlur,
                value: value,
                name: amountKey,
                disabled: disabled,
                required: true,
              }),
              bottomAdornment,
            ],
          }),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=AmountInput.js.map
