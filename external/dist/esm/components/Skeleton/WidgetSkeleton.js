import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { createTheme } from "../../themes/createTheme.js";
import {
  AppExpandedContainer,
  FlexContainer,
  RelativeContainer,
} from "../AppContainer.js";
import {
  SkeletonAmountContainer,
  SkeletonCard,
  SkeletonCardRow,
  SkeletonHeaderAppBar,
  SkeletonHeaderContainer,
  SkeletonInputCard,
  SkeletonPoweredByContainer,
  SkeletonReviewButton,
  SkeletonReviewButtonContainer,
  SkeletonSendToWalletButton,
  SkeletonWalletMenuButtonContainer,
} from "./WidgetSkeleton.style.js";
const SkeletonIcon = () =>
  _jsx(Skeleton, { width: 24, height: 24, variant: "rounded" });
const SkeletonWalletMenuButton = () =>
  _jsxs(SkeletonWalletMenuButtonContainer, {
    children: [
      _jsx(Skeleton, { width: 98, height: 19, variant: "text" }),
      _jsx(SkeletonIcon, {}),
    ],
  });
const SkeletonSelectCard = ({ titleWidth = 36, placeholderWidth = 195 }) =>
  _jsxs(SkeletonCard, {
    elevation: 0,
    children: [
      _jsx(Skeleton, { width: titleWidth, height: 22, variant: "text" }),
      _jsxs(SkeletonCardRow, {
        children: [
          _jsx(Skeleton, { width: 40, height: 40, variant: "circular" }),
          _jsx(Skeleton, {
            width: placeholderWidth,
            height: 27,
            variant: "text",
          }),
        ],
      }),
    ],
  });
const SkeletonYouPayCard = () =>
  _jsxs(SkeletonInputCard, {
    elevation: 0,
    children: [
      _jsx(Skeleton, { width: 55, height: 22, variant: "text" }),
      _jsxs(SkeletonCardRow, {
        children: [
          _jsx(Skeleton, { width: 40, height: 40, variant: "circular" }),
          _jsxs(SkeletonAmountContainer, {
            children: [
              _jsx(Skeleton, {
                width: 48,
                height: 37,
                variant: "text",
                sx: { marginTop: -0.75 },
              }),
              _jsx(Skeleton, { width: 48, height: 12, variant: "text" }),
            ],
          }),
        ],
      }),
    ],
  });
export const WidgetSkeleton = ({ config }) => {
  const appearance = config?.appearance;
  const hiddenUI = config?.hiddenUI || [];
  const requiredUI = config?.requiredUI || [];
  const configTheme = config?.theme;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const appearanceMode =
    !appearance || appearance === "system"
      ? prefersDarkMode
        ? "dark"
        : "light"
      : appearance;
  const theme = useMemo(() => createTheme(configTheme), [configTheme]);
  return _jsx(ThemeProvider, {
    theme: theme,
    defaultMode: appearanceMode,
    modeStorageKey: "li.fi-widget-mode",
    colorSchemeStorageKey: "li.fi-widget-color-scheme",
    disableTransitionOnChange: true,
    children: _jsx(AppExpandedContainer, {
      children: _jsxs(RelativeContainer, {
        sx: { display: "flex", flexDirection: "column" },
        children: [
          _jsxs(SkeletonHeaderContainer, {
            children: [
              !hiddenUI.includes("walletMenu")
                ? _jsx(SkeletonHeaderAppBar, {
                    children: _jsx(SkeletonWalletMenuButton, {}),
                  })
                : null,
              _jsxs(SkeletonHeaderAppBar, {
                sx: { justifyContent: "space-between", height: 40 },
                children: [
                  _jsx(Skeleton, { width: 126, height: 34, variant: "text" }),
                  _jsx(SkeletonIcon, {}),
                ],
              }),
            ],
          }),
          _jsxs(FlexContainer, {
            sx: {
              gap: 2,
              paddingBottom: hiddenUI.includes("poweredBy") ? 3 : 2,
            },
            children: [
              _jsx(SkeletonSelectCard, {}),
              _jsx(SkeletonSelectCard, {}),
              _jsx(SkeletonYouPayCard, {}),
              requiredUI.includes("toAddress")
                ? _jsx(SkeletonSelectCard, {
                    titleWidth: 104,
                    placeholderWidth: 175,
                  })
                : null,
              _jsxs(SkeletonReviewButtonContainer, {
                children: [
                  _jsx(SkeletonReviewButton, {
                    variant: "contained",
                    fullWidth: true,
                    children: "\u00A0",
                  }),
                  !requiredUI.includes("toAddress")
                    ? _jsx(SkeletonSendToWalletButton, {
                        variant: "text",
                        fullWidth: true,
                        children: "\u00A0",
                      })
                    : null,
                ],
              }),
            ],
          }),
          !hiddenUI.includes("poweredBy")
            ? _jsx(SkeletonPoweredByContainer, {
                children: _jsx(Skeleton, {
                  width: 96,
                  height: 18,
                  variant: "text",
                }),
              })
            : null,
        ],
      }),
    }),
  });
};
//# sourceMappingURL=WidgetSkeleton.js.map
