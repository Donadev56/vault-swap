import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wallet from "@mui/icons-material/Wallet";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Button, Typography } from "@mui/material";
import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet.js";
import { AlertMessage } from "../../components/Messages/AlertMessage.js";
import { useChain } from "../../hooks/useChain.js";
import { useSetContentHeight } from "../../hooks/useSetContentHeight.js";
import { useWidgetEvents } from "../../hooks/useWidgetEvents.js";
import { WidgetEvent } from "../../types/events.js";
import {
  IconContainer,
  SendToWalletButtonRow,
  SendToWalletSheetContainer,
  SheetAddressContainer,
} from "../SendToWallet/SendToWalletPage.style.js";
export const ConfirmToAddressSheet = forwardRef((props, ref) => {
  const handleClose = () => {
    ref.current?.close();
  };
  return _jsx(BottomSheet, {
    ref: ref,
    children: _jsx(ConfirmToAddressSheetContent, {
      ...props,
      onClose: handleClose,
    }),
  });
});
const ConfirmToAddressSheetContent = ({
  onContinue,
  onClose,
  toAddress,
  toChainId,
}) => {
  const { t } = useTranslation();
  const { chain } = useChain(toChainId);
  const emitter = useWidgetEvents();
  const ref = useRef(null);
  useSetContentHeight(ref);
  const handleContinue = () => {
    emitter.emit(WidgetEvent.LowAddressActivityConfirmed, {
      address: toAddress,
      chainId: toChainId,
    });
    onClose();
    onContinue();
  };
  return _jsxs(SendToWalletSheetContainer, {
    ref: ref,
    children: [
      _jsx(IconContainer, { children: _jsx(Wallet, { sx: { fontSize: 40 } }) }),
      _jsx(Typography, {
        variant: "h6",
        sx: { textAlign: "center", mb: 2 },
        children: t("warning.title.lowAddressActivity"),
      }),
      _jsx(SheetAddressContainer, {
        children: _jsx(Typography, { children: toAddress }),
      }),
      _jsx(AlertMessage, {
        severity: "warning",
        title: _jsx(Typography, {
          variant: "body2",
          sx: { color: "text.primary" },
          children: t("warning.message.lowAddressActivity", {
            chainName: chain?.name,
          }),
        }),
        icon: _jsx(WarningRounded, {}),
        multiline: true,
      }),
      _jsxs(SendToWalletButtonRow, {
        children: [
          _jsx(Button, {
            variant: "text",
            onClick: onClose,
            fullWidth: true,
            children: t("button.cancel"),
          }),
          _jsx(Button, {
            variant: "contained",
            onClick: handleContinue,
            fullWidth: true,
            children: t("button.continue"),
          }),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=ConfirmToAddressSheet.js.map
