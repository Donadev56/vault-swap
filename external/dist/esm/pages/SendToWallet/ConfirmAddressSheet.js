import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wallet from "@mui/icons-material/Wallet";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Button, Typography } from "@mui/material";
import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet.js";
import { AlertMessage } from "../../components/Messages/AlertMessage.js";
import { useNavigateBack } from "../../hooks/useNavigateBack.js";
import { useSetContentHeight } from "../../hooks/useSetContentHeight.js";
import { useFieldActions } from "../../stores/form/useFieldActions.js";
import { useSendToWalletActions } from "../../stores/settings/useSendToWalletStore.js";
import {
  IconContainer,
  SendToWalletButtonRow,
  SendToWalletSheetContainer,
  SheetAddressContainer,
  SheetTitle,
} from "./SendToWalletPage.style.js";
export const ConfirmAddressSheet = forwardRef((props, ref) => {
  const handleClose = () => {
    ref.current?.close();
  };
  return _jsx(BottomSheet, {
    ref: ref,
    children: _jsx(ConfirmAddressSheetContent, {
      ...props,
      onClose: handleClose,
    }),
  });
});
const ConfirmAddressSheetContent = ({
  validatedBookmark,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();
  const { navigateBack } = useNavigateBack();
  const { setFieldValue } = useFieldActions();
  const { setSendToWallet } = useSendToWalletActions();
  const containerRef = useRef(null);
  useSetContentHeight(containerRef);
  const handleConfirm = () => {
    if (validatedBookmark) {
      setFieldValue("toAddress", validatedBookmark.address, {
        isTouched: true,
        isDirty: true,
      });
      onConfirm?.(validatedBookmark);
      setSendToWallet(true);
      onClose();
      navigateBack();
    }
  };
  return _jsxs(SendToWalletSheetContainer, {
    ref: containerRef,
    children: [
      _jsx(IconContainer, { children: _jsx(Wallet, { sx: { fontSize: 40 } }) }),
      _jsx(SheetTitle, { children: t("sendToWallet.confirmWalletAddress") }),
      _jsxs(SheetAddressContainer, {
        children: [
          validatedBookmark?.name
            ? _jsx(Typography, {
                sx: {
                  fontWeight: 600,
                  mb: 0.5,
                },
                children: validatedBookmark?.name,
              })
            : null,
          _jsx(Typography, { children: validatedBookmark?.address }),
        ],
      }),
      _jsx(AlertMessage, {
        severity: "warning",
        title: _jsx(Typography, {
          variant: "body2",
          sx: { color: "text.primary" },
          children: t("warning.message.fundsLossPrevention"),
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
            onClick: handleConfirm,
            fullWidth: true,
            children: t("button.confirm"),
          }),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=ConfirmAddressSheet.js.map
