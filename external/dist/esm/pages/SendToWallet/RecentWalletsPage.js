import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import History from "@mui/icons-material/History";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import TurnedInNot from "@mui/icons-material/TurnedInNot";
import { ListItemAvatar, ListItemText, MenuItem } from "@mui/material";
import { useId, useRef, useState } from "react";
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
import { useBookmarks } from "../../stores/bookmarks/useBookmarks.js";
import { useFieldActions } from "../../stores/form/useFieldActions.js";
import { useSendToWalletActions } from "../../stores/settings/useSendToWalletStore.js";
import { defaultChainIdsByType } from "../../utils/chainType.js";
import { navigationRoutes } from "../../utils/navigationRoutes.js";
import { shortenAddress } from "../../utils/wallet.js";
import { BookmarkAddressSheet } from "./BookmarkAddressSheet.js";
import { EmptyListIndicator } from "./EmptyListIndicator.js";
import {
  ListContainer,
  OptionsMenuButton,
  SendToWalletPageContainer,
} from "./SendToWalletPage.style.js";
export const RecentWalletsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRecent, setSelectedRecent] = useState();
  const bookmarkAddressSheetRef = useRef(null);
  const { recentWallets } = useBookmarks();
  const { requiredToChainType } = useToAddressRequirements();
  const {
    removeRecentWallet,
    addBookmark,
    setSelectedBookmark,
    addRecentWallet,
  } = useBookmarkActions();
  const { setFieldValue } = useFieldActions();
  const { setSendToWallet } = useSendToWalletActions();
  const moreMenuId = useId();
  const [moreMenuAnchorEl, setMenuAnchorEl] = useState();
  const open = Boolean(moreMenuAnchorEl);
  const { getAddressLink } = useExplorer();
  useHeader(t("header.recentWallets"));
  const handleRecentSelected = (recentWallet) => {
    addRecentWallet(recentWallet);
    setFieldValue("toAddress", recentWallet.address, {
      isTouched: true,
      isDirty: true,
    });
    setSelectedBookmark(recentWallet);
    setSendToWallet(true);
    navigate("../../", {
      relative: "path",
      replace: true,
    });
  };
  const handleAddBookmark = (bookmark) => {
    addBookmark(bookmark);
    navigate(`../${navigationRoutes.bookmarks}`, {
      relative: "path",
      replace: true,
    });
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };
  const handleMenuOpen = (el, recentWallet) => {
    setMenuAnchorEl(el);
    setSelectedRecent(recentWallet);
  };
  const handleCopyAddress = () => {
    if (selectedRecent) {
      navigator.clipboard.writeText(selectedRecent.address);
    }
    closeMenu();
  };
  const handleViewOnExplorer = () => {
    if (selectedRecent) {
      window.open(
        getAddressLink(
          selectedRecent.address,
          defaultChainIdsByType[selectedRecent.chainType],
        ),
        "_blank",
      );
    }
    closeMenu();
  };
  const handleOpenBookmarkSheet = () => {
    if (selectedRecent) {
      setSelectedRecent(selectedRecent);
      bookmarkAddressSheetRef.current?.open();
    }
    closeMenu();
  };
  const handleRemoveRecentWallet = () => {
    if (selectedRecent) {
      removeRecentWallet(selectedRecent.address);
    }
    closeMenu();
  };
  return _jsxs(SendToWalletPageContainer, {
    disableGutters: true,
    children: [
      _jsxs(ListContainer, {
        children: [
          recentWallets.map((recentWallet) =>
            _jsxs(
              ListItem,
              {
                sx: { position: "relative" },
                children: [
                  _jsxs(ListItemButton, {
                    disabled:
                      requiredToChainType &&
                      requiredToChainType !== recentWallet.chainType,
                    onClick: () => handleRecentSelected(recentWallet),
                    children: [
                      _jsx(ListItemAvatar, {
                        children: _jsx(AccountAvatar, {
                          chainId:
                            defaultChainIdsByType[recentWallet.chainType],
                        }),
                      }),
                      _jsx(ListItemText, {
                        primary:
                          recentWallet.name ||
                          shortenAddress(recentWallet.address),
                        secondary: recentWallet.name
                          ? shortenAddress(recentWallet.address)
                          : undefined,
                      }),
                    ],
                  }),
                  _jsx(OptionsMenuButton, {
                    "aria-label": t("button.options"),
                    "aria-controls":
                      open && recentWallet.address === selectedRecent?.address
                        ? moreMenuId
                        : undefined,
                    "aria-haspopup": "true",
                    "aria-expanded": open ? "true" : undefined,
                    onClick: (e) => handleMenuOpen(e.target, recentWallet),
                    sx: {
                      opacity:
                        requiredToChainType &&
                        requiredToChainType !== recentWallet.chainType
                          ? 0.5
                          : 1,
                    },
                    children: _jsx(MoreHoriz, { fontSize: "small" }),
                  }),
                ],
              },
              recentWallet.address,
            ),
          ),
          !recentWallets.length &&
            _jsx(EmptyListIndicator, {
              icon: _jsx(History, { sx: { fontSize: 48 } }),
              children: t("sendToWallet.noRecentWallets"),
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
                children: [
                  _jsx(ContentCopyRounded, {}),
                  t("button.copyAddress"),
                ],
              }),
              _jsxs(MenuItem, {
                onClick: handleViewOnExplorer,
                children: [
                  _jsx(OpenInNewRounded, {}),
                  t("button.viewOnExplorer"),
                ],
              }),
              _jsxs(MenuItem, {
                onClick: handleOpenBookmarkSheet,
                children: [_jsx(TurnedInNot, {}), t("button.bookmark")],
              }),
              _jsxs(MenuItem, {
                onClick: handleRemoveRecentWallet,
                children: [_jsx(DeleteOutline, {}), t("button.delete")],
              }),
            ],
          }),
        ],
      }),
      _jsx(BookmarkAddressSheet, {
        ref: bookmarkAddressSheetRef,
        validatedWallet: selectedRecent,
        onAddBookmark: handleAddBookmark,
      }),
    ],
  });
};
//# sourceMappingURL=RecentWalletsPage.js.map
