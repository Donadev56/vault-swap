import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  useTheme,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActiveTransactionItem } from "../../components/ActiveTransactions/ActiveTransactionItem.js";
import { Dialog } from "../../components/Dialog.js";
import { PageContainer } from "../../components/PageContainer.js";
import { useHeader } from "../../hooks/useHeader.js";
import { useRouteExecutionStore } from "../../stores/routes/RouteExecutionStore.js";
import { useExecutingRoutesIds } from "../../stores/routes/useExecutingRoutesIds.js";
import { ActiveTransactionsEmpty } from "./ActiveTransactionsEmpty.js";
const DeleteIconButton = ({ onClick }) => {
  const theme = useTheme();
  return _jsx(IconButton, {
    size: "medium",
    edge: theme?.navigation?.edge ? "end" : false,
    onClick: onClick,
    children: _jsx(DeleteOutline, {}),
  });
};
export const ActiveTransactionsPage = () => {
  const { t } = useTranslation();
  const executingRoutes = useExecutingRoutesIds();
  const deleteRoutes = useRouteExecutionStore((store) => store.deleteRoutes);
  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);
  const headerAction = useMemo(
    () =>
      executingRoutes.length
        ? _jsx(DeleteIconButton, { onClick: toggleDialog })
        : undefined,
    [executingRoutes.length, toggleDialog],
  );
  useHeader(t("header.activeTransactions"), headerAction);
  if (!executingRoutes.length) {
    return _jsx(ActiveTransactionsEmpty, {});
  }
  return _jsxs(PageContainer, {
    disableGutters: true,
    children: [
      _jsx(List, {
        sx: {
          paddingTop: 0,
          paddingLeft: 1.5,
          paddingRight: 1.5,
          paddingBottom: 1.5,
        },
        children: executingRoutes.map((routeId) =>
          _jsx(ActiveTransactionItem, { routeId: routeId }, routeId),
        ),
      }),
      _jsxs(Dialog, {
        open: open,
        onClose: toggleDialog,
        children: [
          _jsx(DialogTitle, {
            children: t("warning.title.deleteActiveTransactions"),
          }),
          _jsx(DialogContent, {
            children: _jsx(DialogContentText, {
              children: t("warning.message.deleteActiveTransactions"),
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
                onClick: () => deleteRoutes("active"),
                autoFocus: true,
                children: t("button.delete"),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=ActiveTransactionsPage.js.map
