import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InfoRounded from "@mui/icons-material/InfoRounded";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "../../components/Dialog.js";
import { useSettingMonitor } from "../../hooks/useSettingMonitor.js";
import { ResetButtonContainer } from "./ResetSettingsButton.style.js";
export const ResetSettingsButton = () => {
  const { t } = useTranslation();
  const { isCustomRouteSettings, reset } = useSettingMonitor();
  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);
  const handleReset = () => {
    reset();
    toggleDialog();
  };
  if (!isCustomRouteSettings) {
    return null;
  }
  return _jsx(Box, {
    sx: {
      mt: 2,
    },
    children: _jsxs(ResetButtonContainer, {
      children: [
        _jsxs(Box, {
          sx: {
            display: "flex",
            marginBottom: "12px",
          },
          children: [
            _jsx(InfoRounded, {
              sx: {
                marginRight: "8px",
              },
            }),
            _jsx(Box, {
              sx: {
                fontSize: 14,
              },
              children: t("settings.resetSettings"),
            }),
          ],
        }),
        _jsx(Button, {
          onClick: toggleDialog,
          fullWidth: true,
          children: t("button.resetSettings"),
        }),
        _jsxs(Dialog, {
          open: open,
          onClose: toggleDialog,
          children: [
            _jsx(DialogTitle, { children: t("warning.title.resetSettings") }),
            _jsx(DialogContent, {
              children: _jsx(DialogContentText, {
                children: t("warning.message.resetSettings"),
              }),
            }),
            _jsxs(DialogActions, {
              children: [
                _jsx(Button, {
                  onClick: toggleDialog,
                  children: t("button.cancel"),
                }),
                _jsx(Button, {
                  variant: "contained",
                  onClick: handleReset,
                  autoFocus: true,
                  children: t("button.reset"),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
//# sourceMappingURL=ResetSettingsButton.js.map
