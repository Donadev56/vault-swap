import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grow, Skeleton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useChain } from "../../hooks/useChain.js";
import { useToken } from "../../hooks/useToken.js";
import { formatTokenAmount, formatTokenPrice } from "../../utils/format.js";
import { getPriceImpact } from "../../utils/getPriceImpact.js";
import { AvatarBadgedSkeleton } from "../Avatar/Avatar.js";
import { SmallAvatar } from "../Avatar/SmallAvatar.js";
import { TokenAvatar } from "../Avatar/TokenAvatar.js";
import { TextFitter } from "../TextFitter/TextFitter.js";
import { TextSecondary, TextSecondaryContainer } from "./Token.style.js";
export const Token = ({ token, ...other }) => {
  if (!token.priceUSD || !token.logoURI) {
    return _jsx(TokenFallback, { token: token, ...other });
  }
  return _jsx(TokenBase, { token: token, ...other });
};
export const TokenFallback = ({ token, isLoading, ...other }) => {
  const { token: chainToken, isLoading: isLoadingToken } = useToken(
    token.chainId,
    token.address,
  );
  return _jsx(TokenBase, {
    token: { ...token, ...chainToken },
    isLoading: isLoading || isLoadingToken,
    ...other,
  });
};
export const TokenBase = ({
  token,
  impactToken,
  enableImpactTokenTooltip,
  step,
  stepVisible,
  disableDescription,
  isLoading,
  ...other
}) => {
  const { t, i18n } = useTranslation();
  const { chain } = useChain(token?.chainId);
  if (isLoading) {
    return _jsx(TokenSkeleton, {
      token: token,
      step: step,
      disableDescription: disableDescription,
      ...other,
    });
  }
  const tokenAmount = formatTokenAmount(token.amount, token.decimals);
  const tokenPrice = formatTokenPrice(
    token.amount,
    token.priceUSD,
    token.decimals,
  );
  let priceImpact = undefined;
  let priceImpactPercent = undefined;
  if (impactToken) {
    priceImpact = getPriceImpact({
      fromToken: impactToken,
      fromAmount: impactToken.amount,
      toToken: token,
      toAmount: token.amount,
    });
    priceImpactPercent = priceImpact * 100;
  }
  const tokenOnChain = !disableDescription
    ? _jsx(TextSecondary, {
        children: t("main.tokenOnChain", {
          tokenSymbol: token.symbol,
          chainName: chain?.name,
        }),
      })
    : null;
  return _jsxs(Box, {
    ...other,
    sx: [
      {
        flex: 1,
        display: "flex",
        alignItems: "center",
      },
      ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
    ],
    children: [
      _jsx(TokenAvatar, {
        token: token,
        chain: chain,
        isLoading: isLoading,
        sx: { marginRight: 2 },
      }),
      _jsxs(Box, {
        sx: {
          flex: 1,
        },
        children: [
          _jsx(Box, {
            sx: {
              mb: 0.5,
              height: 24,
              display: "flex",
              alignItems: "center",
            },
            title: tokenAmount,
            children: _jsx(TextFitter, {
              height: 30,
              textStyle: {
                fontWeight: 700,
              },
              children: t("format.tokenAmount", {
                value: tokenAmount,
              }),
            }),
          }),
          _jsxs(TextSecondaryContainer, {
            as: "span",
            children: [
              _jsx(TextSecondary, {
                children: t("format.currency", {
                  value: tokenPrice,
                }),
              }),
              impactToken
                ? _jsx(TextSecondary, {
                    px: 0.5,
                    dot: true,
                    children: "\u2022",
                  })
                : null,
              impactToken
                ? enableImpactTokenTooltip
                  ? _jsx(Tooltip, {
                      title: t("tooltip.priceImpact"),
                      sx: { cursor: "help" },
                      children: _jsx(TextSecondary, {
                        children: t("format.percent", {
                          value: priceImpact,
                          usePlusSign: true,
                        }),
                      }),
                    })
                  : _jsx(TextSecondary, {
                      title: priceImpactPercent?.toLocaleString(i18n.language, {
                        maximumFractionDigits: 9,
                      }),
                      children: t("format.percent", {
                        value: priceImpact,
                        usePlusSign: true,
                      }),
                    })
                : null,
              !disableDescription
                ? _jsx(TextSecondary, {
                    px: 0.5,
                    dot: true,
                    children: "\u2022",
                  })
                : null,
              !disableDescription && step
                ? _jsx(TokenStep, {
                    step: step,
                    stepVisible: stepVisible,
                    disableDescription: disableDescription,
                    children: tokenOnChain,
                  })
                : tokenOnChain,
            ],
          }),
        ],
      }),
    ],
  });
};
const TokenStep = ({ step, stepVisible, disableDescription, children }) => {
  return _jsxs(Box, {
    sx: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      height: 16,
    },
    children: [
      _jsx(Grow, {
        in: !stepVisible && !disableDescription,
        style: {
          position: "absolute",
        },
        appear: false,
        timeout: 225,
        children: _jsx(Box, {
          sx: {
            display: "flex",
            alignItems: "center",
            height: 16,
          },
          children: children,
        }),
      }),
      _jsx(Grow, {
        in: stepVisible,
        style: {
          position: "absolute",
        },
        appear: false,
        timeout: 225,
        children: _jsxs(Box, {
          sx: {
            display: "flex",
            alignItems: "center",
            height: 16,
          },
          children: [
            _jsx(Box, {
              sx: {
                mr: 0.75,
                height: 16,
              },
              children: _jsx(SmallAvatar, {
                src: step?.toolDetails.logoURI,
                alt: step?.toolDetails.name,
                children: step?.toolDetails.name[0],
              }),
            }),
            _jsx(TextSecondary, { children: step?.toolDetails.name }),
          ],
        }),
      }),
    ],
  });
};
export const TokenSkeleton = ({ step, disableDescription, ...other }) => {
  return _jsx(Box, {
    ...other,
    sx: [
      {
        flex: 1,
      },
      ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
    ],
    children: _jsxs(Box, {
      sx: {
        display: "flex",
        flex: 1,
        alignItems: "center",
      },
      children: [
        _jsx(AvatarBadgedSkeleton, { sx: { marginRight: 2 } }),
        _jsxs(Box, {
          sx: {
            flex: 1,
          },
          children: [
            _jsx(Skeleton, { width: 112, height: 24, variant: "text" }),
            _jsxs(TextSecondaryContainer, {
              as: "span",
              children: [
                _jsx(Skeleton, {
                  width: 48,
                  height: 12,
                  variant: "rounded",
                  sx: { marginTop: 0.5 },
                }),
                !step && !disableDescription
                  ? _jsx(Skeleton, {
                      width: 96,
                      height: 12,
                      variant: "rounded",
                      sx: { marginTop: 0.5, marginLeft: 1.5 },
                    })
                  : null,
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
//# sourceMappingURL=Token.js.map
