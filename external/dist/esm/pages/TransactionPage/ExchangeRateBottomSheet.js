import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Box, Button, Typography } from "@mui/material";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet.js";
import { useSetContentHeight } from "../../hooks/useSetContentHeight.js";
import { formatTokenAmount } from "../../utils/format.js";
import { CenterContainer, IconCircle } from "./StatusBottomSheet.style.js";
export const ExchangeRateBottomSheet = forwardRef(
  ({ onContinue, onCancel }, ref) => {
    const [data, setData] = useState();
    const bottomSheetRef = useRef(null);
    const resolverRef = useRef(null);
    const handleContinue = () => {
      ref.current?.close(true);
      onContinue?.();
    };
    const handleCancel = useCallback(() => {
      ref.current?.close(false);
      onCancel?.();
    }, [onCancel, ref]);
    const handleClose = useCallback(() => {
      ref.current?.close(false, false);
      onCancel?.();
    }, [onCancel, ref]);
    useImperativeHandle(
      ref,
      () => ({
        isOpen: () => bottomSheetRef.current?.isOpen(),
        open: (resolver, data) => {
          setData(data);
          resolverRef.current = resolver;
          bottomSheetRef.current?.open();
        },
        close: (value = false, bottomSheetClose = true) => {
          resolverRef.current?.(value);
          if (bottomSheetClose) {
            bottomSheetRef.current?.close();
          }
        },
      }),
      [],
    );
    return _jsx(BottomSheet, {
      ref: bottomSheetRef,
      onClose: handleClose,
      children: _jsx(ExchangeRateBottomSheetContent, {
        data: data,
        onContinue: handleContinue,
        onCancel: handleCancel,
      }),
    });
  },
);
const ExchangeRateBottomSheetContent = ({ data, onCancel, onContinue }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  useSetContentHeight(ref);
  if (!data) {
    return;
  }
  const oldAmount = BigInt(data.oldToAmount || 1);
  const rateChange = (
    (Number((BigInt(data.newToAmount || 0) * 1000000n) / oldAmount) / 1000000) *
      100 -
    100
  ).toFixed(2);
  return _jsxs(Box, {
    ref: ref,
    sx: {
      p: 3,
    },
    children: [
      _jsxs(CenterContainer, {
        children: [
          _jsx(IconCircle, {
            status: "warning",
            mb: 1,
            children: _jsx(WarningRounded, { color: "warning" }),
          }),
          _jsx(Typography, {
            sx: {
              py: 1,
              fontSize: 18,
              fontWeight: 700,
            },
            children: t("warning.title.rateChanged"),
          }),
        ],
      }),
      _jsx(Typography, {
        sx: {
          py: 1,
        },
        children: t("warning.message.rateChanged"),
      }),
      _jsxs(Box, {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
        },
        children: [
          _jsx(Typography, { children: t("main.quotedAmount") }),
          _jsxs(Typography, {
            sx: {
              fontWeight: 600,
            },
            children: [
              t("format.tokenAmount", {
                value: formatTokenAmount(
                  BigInt(data.oldToAmount),
                  data.toToken.decimals,
                ),
              }),
              " ",
              data?.toToken.symbol,
            ],
          }),
        ],
      }),
      _jsxs(Box, {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          mt: 0.25,
        },
        children: [
          _jsx(Typography, { children: t("main.currentAmount") }),
          _jsxs(Typography, {
            sx: {
              fontWeight: 600,
            },
            children: [
              t("format.tokenAmount", {
                value: formatTokenAmount(
                  BigInt(data?.newToAmount),
                  data?.toToken.decimals,
                ),
              }),
              " ",
              data?.toToken.symbol,
            ],
          }),
        ],
      }),
      _jsxs(Box, {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          mt: 0.25,
        },
        children: [
          _jsx(Typography, { children: t("main.rateChange") }),
          _jsxs(Typography, {
            sx: {
              fontWeight: 600,
            },
            children: [rateChange, "%"],
          }),
        ],
      }),
      _jsxs(Box, {
        sx: {
          display: "flex",
          mt: 3,
        },
        children: [
          _jsx(Button, {
            variant: "text",
            onClick: onCancel,
            fullWidth: true,
            children: t("button.cancel"),
          }),
          _jsx(Box, {
            sx: {
              display: "flex",
              p: 1,
            },
          }),
          _jsx(Button, {
            variant: "contained",
            onClick: onContinue,
            fullWidth: true,
            children: t("button.continue"),
          }),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=ExchangeRateBottomSheet.js.map
