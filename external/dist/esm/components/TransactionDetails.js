import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { isGaslessStep } from "@lifi/sdk";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocalGasStationRounded from "@mui/icons-material/LocalGasStationRounded";
import { Box, Collapse, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWidgetConfig } from "../providers/WidgetProvider/WidgetProvider.js";
import { isRouteDone } from "../stores/routes/utils.js";
import { getAccumulatedFeeCostsBreakdown } from "../utils/fees.js";
import { formatTokenAmount, formatTokenPrice } from "../utils/format.js";
import { getPriceImpact } from "../utils/getPriceImpact.js";
import { Card } from "./Card/Card.js";
import { CardIconButton } from "./Card/CardIconButton.js";
import { FeeBreakdownTooltip } from "./FeeBreakdownTooltip.js";
import { IconTypography } from "./IconTypography.js";
import { TokenRate } from "./TokenRate/TokenRate.js";
export const TransactionDetails = ({ route, ...props }) => {
  const { t } = useTranslation();
  const { feeConfig, defaultUI } = useWidgetConfig();
  const [cardExpanded, setCardExpanded] = useState(
    defaultUI?.transactionDetailsExpanded ?? false,
  );
  const toggleCard = () => {
    setCardExpanded((cardExpanded) => !cardExpanded);
  };
  const { gasCosts, feeCosts, gasCostUSD, feeCostUSD, combinedFeesUSD } =
    getAccumulatedFeeCostsBreakdown(route);
  const priceImpact = getPriceImpact({
    fromAmount: BigInt(route.fromAmount),
    toAmount: BigInt(route.toAmount),
    fromToken: route.fromToken,
    toToken: route.toToken,
  });
  const feeCollectionStep = route.steps[0].includedSteps.find(
    (includedStep) => includedStep.tool === "feeCollection",
  );
  let feeAmountUSD = 0;
  let feePercentage = 0;
  if (feeCollectionStep) {
    const estimatedFromAmount =
      BigInt(feeCollectionStep.estimate.fromAmount) -
      BigInt(feeCollectionStep.estimate.toAmount);
    feeAmountUSD = formatTokenPrice(
      estimatedFromAmount,
      feeCollectionStep.action.fromToken.priceUSD,
      feeCollectionStep.action.fromToken.decimals,
    );
    feePercentage =
      feeCollectionStep.estimate.feeCosts?.reduce(
        (percentage, feeCost) =>
          percentage + Number.parseFloat(feeCost.percentage || "0"),
        0,
      ) ?? 0;
  }
  const hasGaslessSupport = route.steps.some(isGaslessStep);
  const showIntegratorFeeCollectionDetails =
    (feeAmountUSD || Number.isFinite(feeConfig?.fee)) && !hasGaslessSupport;
  return _jsxs(Card, {
    selectionColor: "secondary",
    ...props,
    children: [
      _jsxs(Box, {
        sx: {
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1.75,
        },
        children: [
          _jsx(Box, {
            sx: {
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "left",
            },
            children: _jsx(TokenRate, { route: route }),
          }),
          _jsx(Collapse, {
            timeout: 100,
            in: !cardExpanded,
            mountOnEnter: true,
            children: _jsx(FeeBreakdownTooltip, {
              gasCosts: gasCosts,
              feeCosts: feeCosts,
              relayerSupport: hasGaslessSupport,
              children: _jsxs(Box, {
                onClick: toggleCard,
                // biome-ignore lint/a11y/useSemanticElements:
                role: "button",
                sx: {
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  cursor: "pointer",
                },
                children: [
                  _jsx(IconTypography, {
                    mr: 0.5,
                    fontSize: 16,
                    children: _jsx(LocalGasStationRounded, {
                      fontSize: "inherit",
                    }),
                  }),
                  _jsx(Typography, {
                    "data-value": hasGaslessSupport ? 0 : combinedFeesUSD,
                    sx: {
                      fontSize: 14,
                      color: "text.primary",
                      fontWeight: 600,
                      lineHeight: 1.429,
                    },
                    children: hasGaslessSupport
                      ? t("main.fees.free")
                      : t("format.currency", { value: combinedFeesUSD }),
                  }),
                ],
              }),
            }),
          }),
          _jsx(CardIconButton, {
            onClick: toggleCard,
            size: "small",
            children: cardExpanded
              ? _jsx(ExpandLess, { fontSize: "inherit" })
              : _jsx(ExpandMore, { fontSize: "inherit" }),
          }),
        ],
      }),
      _jsx(Collapse, {
        timeout: 225,
        in: cardExpanded,
        mountOnEnter: true,
        children: _jsxs(Box, {
          sx: {
            px: 2,
            pb: 2,
          },
          children: [
            _jsxs(Box, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              },
              children: [
                _jsx(Typography, {
                  variant: "body2",
                  children: t("main.fees.network"),
                }),
                _jsx(FeeBreakdownTooltip, {
                  gasCosts: gasCosts,
                  relayerSupport: hasGaslessSupport,
                  children: _jsx(Typography, {
                    variant: "body2",
                    sx: { fontWeight: 600, cursor: "help" },
                    children: hasGaslessSupport
                      ? t("main.fees.free")
                      : t("format.currency", {
                          value: gasCostUSD,
                        }),
                  }),
                }),
              ],
            }),
            feeCosts.length
              ? _jsxs(Box, {
                  sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  },
                  children: [
                    _jsx(Typography, {
                      variant: "body2",
                      children: t("main.fees.provider"),
                    }),
                    _jsx(FeeBreakdownTooltip, {
                      feeCosts: feeCosts,
                      children: _jsx(Typography, {
                        variant: "body2",
                        sx: { fontWeight: 600, cursor: "help" },
                        children: t("format.currency", {
                          value: feeCostUSD,
                        }),
                      }),
                    }),
                  ],
                })
              : null,
            showIntegratorFeeCollectionDetails
              ? _jsxs(Box, {
                  sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  },
                  children: [
                    _jsxs(Typography, {
                      variant: "body2",
                      children: [
                        feeConfig?.name
                          ? t("main.fees.integrator", { tool: feeConfig.name })
                          : t("main.fees.defaultIntegrator"),
                        feeConfig?.showFeePercentage &&
                          _jsxs(_Fragment, {
                            children: [
                              " (",
                              t("format.percent", { value: feePercentage }),
                              ")",
                            ],
                          }),
                      ],
                    }),
                    feeConfig?.showFeeTooltip &&
                    (feeConfig?.name || feeConfig?.feeTooltipComponent)
                      ? _jsx(Tooltip, {
                          title:
                            feeConfig?.feeTooltipComponent ||
                            t("tooltip.feeCollection", {
                              tool: feeConfig.name,
                            }),
                          children: _jsx(Typography, {
                            variant: "body2",
                            sx: { fontWeight: 600, cursor: "help" },
                            children: t("format.currency", {
                              value: feeAmountUSD,
                            }),
                          }),
                        })
                      : _jsx(Typography, {
                          variant: "body2",
                          sx: { fontWeight: 600 },
                          children: t("format.currency", {
                            value: feeAmountUSD,
                          }),
                        }),
                  ],
                })
              : null,
            _jsxs(Box, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              },
              children: [
                _jsx(Typography, {
                  variant: "body2",
                  children: t("main.priceImpact"),
                }),
                _jsx(Tooltip, {
                  title: t("tooltip.priceImpact"),
                  children: _jsx(Typography, {
                    variant: "body2",
                    sx: { fontWeight: 600, cursor: "help" },
                    children: t("format.percent", {
                      value: priceImpact,
                      usePlusSign: true,
                    }),
                  }),
                }),
              ],
            }),
            !isRouteDone(route)
              ? _jsxs(_Fragment, {
                  children: [
                    _jsxs(Box, {
                      sx: {
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      },
                      children: [
                        _jsx(Typography, {
                          variant: "body2",
                          children: t("main.maxSlippage"),
                        }),
                        _jsx(Tooltip, {
                          title: t("tooltip.slippage"),
                          children: _jsx(Typography, {
                            variant: "body2",
                            sx: { fontWeight: 600, cursor: "help" },
                            children: route.steps[0].action.slippage
                              ? t("format.percent", {
                                  value: route.steps[0].action.slippage,
                                })
                              : t("button.auto"),
                          }),
                        }),
                      ],
                    }),
                    _jsxs(Box, {
                      sx: {
                        display: "flex",
                        justifyContent: "space-between",
                      },
                      children: [
                        _jsx(Typography, {
                          variant: "body2",
                          children: t("main.minReceived"),
                        }),
                        _jsx(Tooltip, {
                          title: t("tooltip.minReceived"),
                          children: _jsxs(Typography, {
                            variant: "body2",
                            sx: { fontWeight: 600, cursor: "help" },
                            children: [
                              t("format.tokenAmount", {
                                value: formatTokenAmount(
                                  BigInt(route.toAmountMin),
                                  route.toToken.decimals,
                                ),
                              }),
                              " ",
                              route.toToken.symbol,
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                })
              : null,
          ],
        }),
      }),
    ],
  });
};
//# sourceMappingURL=TransactionDetails.js.map
