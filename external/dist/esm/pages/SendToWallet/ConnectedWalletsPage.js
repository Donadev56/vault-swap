import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAccount } from "@lifi/wallet-management";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import Wallet from "@mui/icons-material/Wallet";
import { ListItemAvatar, ListItemText, MenuItem } from "@mui/material";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AccountAvatar } from "../../components/Avatar/AccountAvatar.js";
import { ListItem } from "../../components/ListItem/ListItem.js";
import { ListItemButton } from "../../components/ListItem/ListItemButton.js";
import { Menu } from "../../components/Menu.js";
import { useExplorer } from "../../hooks/useExplorer.js";
import { useHeader } from "../../hooks/useHeader.js";
import { useToAddressRequirements } from "../../hooks/useToAddressRequirements.js";
import { useBookmarkActions } from "../../stores/bookmarks/useBookmarkActions.js";
import { useFieldActions } from "../../stores/form/useFieldActions.js";
import { useSendToWalletActions } from "../../stores/settings/useSendToWalletStore.js";
import { shortenAddress } from "../../utils/wallet.js";
import { EmptyListIndicator } from "./EmptyListIndicator.js";
import {
  ListContainer,
  OptionsMenuButton,
  SendToWalletPageContainer,
} from "./SendToWalletPage.style.js";
export const ConnectedWalletsPage = () => {
  const { t } = useTranslation();
  const [selectedAccount, setSelectedAccount] = useState();
  const { accounts } = useAccount();
  const { setSelectedBookmark } = useBookmarkActions();
  const { requiredToChainType } = useToAddressRequirements();
  const navigate = useNavigate();
  const { setFieldValue } = useFieldActions();
  const { setSendToWallet } = useSendToWalletActions();
  const [moreMenuAnchorEl, setMenuAnchorEl] = useState();
  const moreMenuId = useId();
  const open = Boolean(moreMenuAnchorEl);
  const { getAddressLink } = useExplorer();
  useHeader(t("sendToWallet.connectedWallets"));
  const handleWalletSelected = (account) => {
    setFieldValue("toAddress", account.address, {
      isTouched: true,
      isDirty: true,
    });
    setSelectedBookmark({
      name: account.connector?.name,
      address: account.address,
      chainType: account.chainType,
      isConnectedAccount: true,
    });
    setSendToWallet(true);
    navigate("../../", {
      relative: "path",
      replace: true,
    });
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };
  const handleMenuOpen = (el, connectedWallet) => {
    setMenuAnchorEl(el);
    setSelectedAccount(connectedWallet);
  };
  const handleCopyAddress = () => {
    if (selectedAccount?.address) {
      navigator.clipboard.writeText(selectedAccount.address);
    }
    closeMenu();
  };
  const handleViewOnExplorer = () => {
    if (selectedAccount?.chainId) {
      if (selectedAccount.address) {
        window.open(
          getAddressLink(selectedAccount.address, selectedAccount.chainId),
          "_blank",
        );
      }
    }
    closeMenu();
  };
  return _jsx(SendToWalletPageContainer, {
    disableGutters: true,
    children: _jsxs(ListContainer, {
      children: [
        accounts.map((account) => {
          const walletAddress = shortenAddress(account.address);
          return _jsxs(
            ListItem,
            {
              sx: { position: "relative" },
              children: [
                _jsxs(ListItemButton, {
                  onClick: () => handleWalletSelected(account),
                  disabled:
                    requiredToChainType &&
                    requiredToChainType !== account.chainType,
                  children: [
                    _jsx(ListItemAvatar, {
                      children: _jsx(AccountAvatar, {
                        chainId: account.chainId,
                        account: account,
                      }),
                    }),
                    _jsx(ListItemText, {
                      primary: account.connector?.name,
                      secondary: walletAddress,
                    }),
                  ],
                }),
                _jsx(OptionsMenuButton, {
                  "aria-label": t("button.options"),
                  "aria-controls":
                    open && account.address === selectedAccount?.address
                      ? moreMenuId
                      : undefined,
                  "aria-haspopup": "true",
                  "aria-expanded": open ? "true" : undefined,
                  onClick: (e) => handleMenuOpen(e.target, account),
                  sx: {
                    opacity:
                      requiredToChainType &&
                      requiredToChainType !== account.chainType
                        ? 0.5
                        : 1,
                  },
                  children: _jsx(MoreHoriz, { fontSize: "small" }),
                }),
              ],
            },
            account.address,
          );
        }),
        !accounts.length &&
          _jsx(EmptyListIndicator, {
            icon: _jsx(Wallet, { sx: { fontSize: 48 } }),
            children: t("sendToWallet.noConnectedWallets"),
          }),
        _jsxs(Menu, {
          id: moreMenuId,
          elevation: 0,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          anchorEl: moreMenuAnchorEl,
          open: open,
          onClose: closeMenu,
          children: [
            _jsxs(MenuItem, {
              onClick: handleCopyAddress,
              children: [_jsx(ContentCopyRounded, {}), t("button.copyAddress")],
            }),
            _jsxs(MenuItem, {
              onClick: handleViewOnExplorer,
              children: [
                _jsx(OpenInNewRounded, {}),
                t("button.viewOnExplorer"),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
//# sourceMappingURL=ConnectedWalletsPage.js.map
