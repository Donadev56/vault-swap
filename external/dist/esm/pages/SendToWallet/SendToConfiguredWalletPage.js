import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import { ListItemAvatar, ListItemText, MenuItem } from "@mui/material";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccountAvatar } from "../../components/Avatar/AccountAvatar.js";
import { ListItem } from "../../components/ListItem/ListItem.js";
import { ListItemButton } from "../../components/ListItem/ListItemButton.js";
import { Menu } from "../../components/Menu.js";
import { useExplorer } from "../../hooks/useExplorer.js";
import { useHeader } from "../../hooks/useHeader.js";
import { useNavigateBack } from "../../hooks/useNavigateBack.js";
import { useToAddressRequirements } from "../../hooks/useToAddressRequirements.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { useBookmarkActions } from "../../stores/bookmarks/useBookmarkActions.js";
import { useFieldActions } from "../../stores/form/useFieldActions.js";
import { defaultChainIdsByType } from "../../utils/chainType.js";
import { shortenAddress } from "../../utils/wallet.js";
import {
  ListContainer,
  OptionsMenuButton,
  SendToWalletPageContainer,
} from "./SendToWalletPage.style.js";
export const SendToConfiguredWalletPage = () => {
  const { t } = useTranslation();
  const { navigateBack } = useNavigateBack();
  const { toAddresses } = useWidgetConfig();
  const [selectedToAddress, setSelectedToAddress] = useState();
  const { requiredToChainType } = useToAddressRequirements();
  const { setSelectedBookmark } = useBookmarkActions();
  const { setFieldValue } = useFieldActions();
  const moreMenuId = useId();
  const [moreMenuAnchorEl, setMenuAnchorEl] = useState();
  const open = Boolean(moreMenuAnchorEl);
  const { getAddressLink } = useExplorer();
  useHeader(t("header.sendToWallet"));
  const handleCuratedSelected = (toAddress) => {
    setSelectedBookmark(toAddress);
    setFieldValue("toAddress", toAddress.address, {
      isTouched: true,
      isDirty: true,
    });
    navigateBack();
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };
  const handleMenuOpen = (el, toAddress) => {
    setMenuAnchorEl(el);
    setSelectedToAddress(toAddress);
  };
  const handleCopyAddress = () => {
    if (selectedToAddress) {
      navigator.clipboard.writeText(selectedToAddress.address);
    }
    closeMenu();
  };
  const handleViewOnExplorer = () => {
    if (selectedToAddress) {
      window.open(
        getAddressLink(
          selectedToAddress.address,
          defaultChainIdsByType[selectedToAddress.chainType],
        ),
        "_blank",
      );
    }
    closeMenu();
  };
  return _jsx(SendToWalletPageContainer, {
    disableGutters: true,
    children: _jsxs(ListContainer, {
      sx: { minHeight: 418 },
      children: [
        toAddresses?.map((toAddress) =>
          _jsxs(
            ListItem,
            {
              sx: { position: "relative" },
              children: [
                _jsxs(ListItemButton, {
                  disabled:
                    requiredToChainType &&
                    requiredToChainType !== toAddress.chainType,
                  onClick: () => handleCuratedSelected(toAddress),
                  children: [
                    _jsx(ListItemAvatar, {
                      children: _jsx(AccountAvatar, {
                        chainId: defaultChainIdsByType[toAddress.chainType],
                        toAddress: toAddress,
                      }),
                    }),
                    _jsx(ListItemText, {
                      primary:
                        toAddress.name || shortenAddress(toAddress.address),
                      secondary: toAddress.name
                        ? shortenAddress(toAddress.address)
                        : undefined,
                    }),
                  ],
                }),
                _jsx(OptionsMenuButton, {
                  "aria-label": t("button.options"),
                  "aria-controls":
                    open && toAddress.address === selectedToAddress?.address
                      ? moreMenuId
                      : undefined,
                  "aria-haspopup": "true",
                  "aria-expanded": open ? "true" : undefined,
                  onClick: (e) => handleMenuOpen(e.target, toAddress),
                  sx: {
                    opacity:
                      requiredToChainType &&
                      requiredToChainType !== toAddress.chainType
                        ? 0.5
                        : 1,
                  },
                  children: _jsx(MoreHoriz, { fontSize: "small" }),
                }),
              ],
            },
            toAddress.address,
          ),
        ),
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
//# sourceMappingURL=SendToConfiguredWalletPage.js.map
