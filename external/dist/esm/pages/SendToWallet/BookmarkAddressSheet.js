import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ErrorIcon from "@mui/icons-material/Error";
import TurnedIn from "@mui/icons-material/TurnedIn";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Button, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet.js";
import { Input } from "../../components/Input.js";
import { AlertMessage } from "../../components/Messages/AlertMessage.js";
import { useAddressValidation } from "../../hooks/useAddressValidation.js";
import { useBookmarkActions } from "../../stores/bookmarks/useBookmarkActions.js";
import {
  AddressInput,
  BookmarkInputFields,
  IconContainer,
  SendToWalletButtonRow,
  SendToWalletCard,
  SendToWalletSheetContainer,
  SheetAddressContainer,
  SheetTitle,
  ValidationAlert,
} from "./SendToWalletPage.style.js";
export const BookmarkAddressSheet = forwardRef(
  ({ validatedWallet, onAddBookmark }, ref) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState();
    const { validateAddress, isValidating } = useAddressValidation();
    const { getBookmark } = useBookmarkActions();
    const nameValue = name.trim() || validatedWallet?.name || "";
    const addressValue = address || validatedWallet?.address || "";
    const handleCancel = () => {
      setError(undefined);
      ref.current?.close();
    };
    const validateWithAddressFromInput = async () => {
      const validationResult = await validateAddress({ value: address });
      if (!validationResult.isValid) {
        setError({ type: "address", message: validationResult.error });
        return;
      }
      return {
        name: nameValue,
        address: validationResult.address,
        chainType: validationResult.chainType,
      };
    };
    const validateWithValidatedWallet = (validatedWallet) => {
      if (error) {
        setError(undefined);
      }
      return {
        name: nameValue,
        address: validatedWallet.address,
        chainType: validatedWallet.chainType,
      };
    };
    const handleBookmark = async () => {
      if (isValidating) {
        return;
      }
      if (!nameValue) {
        setError({
          type: "name",
          message: t("error.title.bookmarkNameRequired"),
        });
        return;
      }
      if (!addressValue) {
        setError({
          type: "address",
          message: t("error.title.walletAddressRequired"),
        });
        return;
      }
      //  If the validatedWallet is supplied as a prop then we should assume
      //  the address has already been validated
      const validatedBookmark = validatedWallet
        ? validateWithValidatedWallet(validatedWallet)
        : await validateWithAddressFromInput();
      if (validatedBookmark) {
        const existingBookmark = getBookmark(validatedBookmark.address);
        if (existingBookmark) {
          setError({
            type: "address",
            message: t("error.title.bookmarkAlreadyExists", {
              name: existingBookmark.name,
            }),
          });
          return;
        }
        ref.current?.close();
        onAddBookmark({
          name: validatedBookmark.name,
          address: validatedBookmark.address,
          chainType: validatedBookmark.chainType,
        });
      }
    };
    const handleAddressInputChange = (e) => {
      if (error) {
        setError(undefined);
      }
      setAddress(e.target.value.trim());
    };
    const handleNameInputChange = (e) => {
      if (error) {
        setError(undefined);
      }
      setName(e.target.value);
    };
    const resetValues = () => {
      setName("");
      setAddress("");
    };
    return _jsx(BottomSheet, {
      ref: ref,
      onClose: resetValues,
      children: _jsxs(SendToWalletSheetContainer, {
        children: [
          _jsx(IconContainer, {
            children: _jsx(TurnedIn, { sx: { fontSize: 40 } }),
          }),
          _jsx(SheetTitle, { children: t("sendToWallet.bookmarkWallet") }),
          validatedWallet
            ? _jsxs(SheetAddressContainer, {
                children: [
                  validatedWallet?.name
                    ? _jsx(Typography, {
                        sx: {
                          fontWeight: 600,
                          mb: 0.5,
                        },
                        children: validatedWallet?.name,
                      })
                    : null,
                  _jsx(Typography, { children: validatedWallet?.address }),
                ],
              })
            : null,
          _jsxs(BookmarkInputFields, {
            children: [
              _jsx(SendToWalletCard, {
                type: error?.type === "name" ? "error" : "default",
                children: _jsx(Input, {
                  size: "small",
                  autoComplete: "off",
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  spellCheck: "false",
                  onChange: handleNameInputChange,
                  value: name,
                  placeholder:
                    validatedWallet?.name || t("sendToWallet.enterName"),
                  "aria-label":
                    validatedWallet?.name || t("sendToWallet.enterName"),
                  inputProps: { maxLength: 128 },
                }),
              }),
              !validatedWallet &&
                _jsx(SendToWalletCard, {
                  type: error?.type === "address" ? "error" : "default",
                  children: _jsx(AddressInput, {
                    size: "small",
                    autoComplete: "off",
                    autoCorrect: "off",
                    autoCapitalize: "off",
                    spellCheck: "false",
                    onChange: handleAddressInputChange,
                    value: address,
                    placeholder: t("sendToWallet.enterAddress", {
                      context: "long",
                    }),
                    "aria-label": t("sendToWallet.enterAddress", {
                      context: "long",
                    }),
                    maxRows: 2,
                    inputProps: { maxLength: 128 },
                    multiline: true,
                  }),
                }),
              error
                ? _jsx(ValidationAlert, {
                    icon: _jsx(ErrorIcon, {}),
                    children: error.message,
                  })
                : null,
            ],
          }),
          _jsx(AlertMessage, {
            title: _jsx(Typography, {
              variant: "body2",
              sx: { color: "text.primary" },
              children: t("warning.message.fundsLossPrevention"),
            }),
            icon: _jsx(WarningRounded, {}),
          }),
          _jsxs(SendToWalletButtonRow, {
            children: [
              _jsx(Button, {
                variant: "text",
                onClick: handleCancel,
                fullWidth: true,
                children: t("button.cancel"),
              }),
              _jsx(Button, {
                variant: "contained",
                onClick: handleBookmark,
                loading: isValidating,
                loadingPosition: "center",
                fullWidth: true,
                focusRipple: true,
                children: t("button.bookmark"),
              }),
            ],
          }),
        ],
      }),
    });
  },
);
//# sourceMappingURL=BookmarkAddressSheet.js.map
