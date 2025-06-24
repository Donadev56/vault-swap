import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import {
  getConnectorIcon,
  useAccount,
  useWalletMenu,
} from "@lifi/wallet-management";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PowerSettingsNewRounded from "@mui/icons-material/PowerSettingsNewRounded";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAvailableChains } from "../../hooks/useAvailableChains.js";
import { useExplorer } from "../../hooks/useExplorer.js";
import { shortenAddress } from "../../utils/wallet.js";
import { AvatarMasked } from "../Avatar/Avatar.style.js";
import { SmallAvatar } from "../Avatar/SmallAvatar.js";
import { DisconnectIconButton } from "./DisconnectIconButton.js";
export const WalletMenu = ({ onClose }) => {
  const { t } = useTranslation();
  const { accounts } = useAccount();
  const { getChainById } = useAvailableChains();
  const { openWalletMenu } = useWalletMenu();
  const connect = async () => {
    openWalletMenu();
    onClose();
  };
  const { getAddressLink } = useExplorer();
  return _jsxs(_Fragment, {
    children: [
      _jsx(Box, {
        sx: {
          display: "flex",
          flexDirection: "column",
        },
        children: accounts.map((account) => {
          const chain = getChainById(account.chainId);
          const walletAddress = shortenAddress(account.address);
          const handleCopyAddress = async () => {
            await navigator.clipboard.writeText(account.address ?? "");
            onClose();
          };
          return _jsxs(
            MenuItem,
            {
              disableTouchRipple: true,
              children: [
                _jsxs(Box, {
                  sx: {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                  },
                  children: [
                    chain?.logoURI
                      ? _jsx(Badge, {
                          overlap: "circular",
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                          },
                          badgeContent: _jsx(SmallAvatar, {
                            src: chain?.logoURI,
                            alt: chain?.name,
                            children: chain?.name[0],
                          }),
                          sx: { marginRight: 1.5 },
                          children: _jsx(AvatarMasked, {
                            src: getConnectorIcon(account.connector),
                            alt: account.connector?.name,
                            children: account.connector?.name[0],
                          }),
                        })
                      : _jsx(Avatar, {
                          src: getConnectorIcon(account.connector),
                          alt: account.connector?.name,
                          sx: {
                            marginRight: 1.5,
                          },
                          children: account.connector?.name[0],
                        }),
                    walletAddress,
                  ],
                }),
                _jsxs(Box, {
                  sx: {
                    ml: 2,
                  },
                  children: [
                    _jsx(IconButton, {
                      size: "medium",
                      onClick: handleCopyAddress,
                      children: _jsx(ContentCopyRounded, {}),
                    }),
                    _jsx(IconButton, {
                      size: "medium",
                      component: "a",
                      onClick: onClose,
                      href: account.address
                        ? getAddressLink(account.address, chain)
                        : undefined,
                      target: "_blank",
                      children: _jsx(OpenInNewRounded, {}),
                    }),
                    _jsx(DisconnectIconButton, { account: account }),
                  ],
                }),
              ],
            },
            account.address,
          );
        }),
      }),
      _jsx(Button, {
        onClick: connect,
        fullWidth: true,
        startIcon: _jsx(PowerSettingsNewRounded, {}),
        sx: {
          marginTop: 1,
        },
        children: t("button.connectAnotherWallet"),
      }),
    ],
  });
};
//# sourceMappingURL=WalletMenu.js.map
