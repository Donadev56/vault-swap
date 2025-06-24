import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { isGaslessStep } from "@lifi/sdk";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Badge,
  Box,
  Collapse,
  Step as MuiStep,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAvailableChains } from "../../hooks/useAvailableChains.js";
import { LiFiToolLogo } from "../../icons/lifi.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { HiddenUI } from "../../types/widget.js";
import { formatTokenAmount, formatTokenPrice } from "../../utils/format.js";
import { SmallAvatar } from "../Avatar/SmallAvatar.js";
import { CardIconButton } from "../Card/CardIconButton.js";
import {
  StepAvatar,
  StepConnector,
  StepContent,
  StepLabel,
  StepLabelTypography,
} from "./StepActions.style.js";
export const StepActions = ({ step, dense, ...other }) => {
  const { t } = useTranslation();
  const { subvariant } = useWidgetConfig();
  const [cardExpanded, setCardExpanded] = useState(false);
  const handleExpand = (e) => {
    e.stopPropagation();
    setCardExpanded((expanded) => !expanded);
  };
  // FIXME: step transaction request overrides step tool details, but not included step tool details
  const toolDetails =
    subvariant === "custom"
      ? step.includedSteps.find(
          (step) => step.tool === "custom" && step.toolDetails.key !== "custom",
        )?.toolDetails || step.toolDetails
      : step.toolDetails;
  return _jsxs(Box, {
    ...other,
    children: [
      _jsxs(Box, {
        sx: {
          display: "flex",
          alignItems: "center",
        },
        children: [
          _jsx(Badge, {
            overlap: "circular",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            badgeContent: _jsx(SmallAvatar, { src: LiFiToolLogo }),
            children: _jsx(StepAvatar, {
              variant: "circular",
              src: toolDetails.logoURI ?? LiFiToolLogo,
              alt: toolDetails.name,
              children: toolDetails.name[0],
            }),
          }),
          _jsx(Box, {
            sx: {
              flex: 1,
            },
            children: _jsx(Typography, {
              sx: {
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.3334,
                ml: 2,
              },
              children: toolDetails.name?.includes("LI.FI")
                ? toolDetails.name
                : t("main.stepDetails", {
                    tool: toolDetails.name,
                  }),
            }),
          }),
          dense
            ? _jsx(CardIconButton, {
                onClick: handleExpand,
                size: "small",
                children: cardExpanded
                  ? _jsx(ExpandLess, { fontSize: "inherit" })
                  : _jsx(ExpandMore, { fontSize: "inherit" }),
              })
            : null,
        ],
      }),
      dense
        ? _jsx(Collapse, {
            timeout: 225,
            in: cardExpanded,
            mountOnEnter: true,
            unmountOnExit: true,
            children: _jsx(IncludedSteps, { step: step }),
          })
        : _jsx(IncludedSteps, { step: step }),
    ],
  });
};
export const IncludedSteps = ({ step }) => {
  const { subvariant, subvariantOptions, feeConfig, hiddenUI } =
    useWidgetConfig();
  let includedSteps = step.includedSteps;
  if (hiddenUI?.includes(HiddenUI.IntegratorStepDetails)) {
    const feeCollectionStep = includedSteps.find(
      (step) => step.tool === "feeCollection",
    );
    if (feeCollectionStep) {
      includedSteps = structuredClone(
        includedSteps.filter((step) => step.tool !== "feeCollection"),
      );
      includedSteps[0].estimate.fromAmount =
        feeCollectionStep.estimate.fromAmount;
    }
  }
  const StepIconComponent = ({ icon }) => {
    const includedStep = includedSteps?.[Number(icon) - 1];
    const feeCollectionStep =
      includedStep?.type === "protocol" &&
      includedStep?.tool === "feeCollection";
    const toolName =
      feeCollectionStep && feeConfig?.name
        ? feeConfig?.name
        : includedStep?.toolDetails.name;
    const toolLogoURI =
      feeCollectionStep && feeConfig?.logoURI
        ? feeConfig?.logoURI
        : includedStep?.toolDetails.logoURI;
    return toolLogoURI
      ? _jsx(SmallAvatar, {
          src: toolLogoURI,
          alt: toolName,
          sx: { width: 20, height: 20 },
          children: toolName?.[0],
        })
      : null;
  };
  const hasGaslessSupport = isGaslessStep(step);
  return _jsx(Box, {
    sx: {
      mt: 1,
    },
    children: _jsx(Stepper, {
      orientation: "vertical",
      connector: _jsx(StepConnector, {}),
      activeStep: -1,
      children: includedSteps.map((step, i, includedSteps) =>
        _jsxs(
          MuiStep,
          {
            expanded: true,
            children: [
              _jsx(StepLabel, {
                slots: {
                  stepIcon: StepIconComponent,
                },
                children:
                  step.type === "custom" && subvariant === "custom"
                    ? _jsx(CustomStepDetailsLabel, {
                        step: step,
                        subvariant: subvariant,
                        subvariantOptions: subvariantOptions,
                      })
                    : step.type === "cross"
                      ? _jsx(BridgeStepDetailsLabel, { step: step })
                      : step.type === "protocol"
                        ? _jsx(ProtocolStepDetailsLabel, {
                            step: step,
                            feeConfig: feeConfig,
                            relayerSupport: hasGaslessSupport,
                          })
                        : _jsx(SwapStepDetailsLabel, { step: step }),
              }),
              _jsx(StepContent, {
                last: i === includedSteps.length - 1,
                children: _jsx(StepDetailsContent, { step: step }),
              }),
            ],
          },
          step.id,
        ),
      ),
    }),
  });
};
export const StepDetailsContent = ({ step }) => {
  const { t } = useTranslation();
  const sameTokenProtocolStep =
    step.action.fromToken.chainId === step.action.toToken.chainId &&
    step.action.fromToken.address === step.action.toToken.address;
  let fromAmount;
  if (sameTokenProtocolStep) {
    const estimatedFromAmount =
      BigInt(step.estimate.fromAmount) - BigInt(step.estimate.toAmount);
    fromAmount =
      estimatedFromAmount > 0n
        ? formatTokenAmount(estimatedFromAmount, step.action.fromToken.decimals)
        : formatTokenAmount(
            BigInt(step.estimate.fromAmount),
            step.action.fromToken.decimals,
          );
  } else {
    fromAmount = formatTokenAmount(
      BigInt(step.estimate.fromAmount),
      step.action.fromToken.decimals,
    );
  }
  const showToAmount =
    step.type !== "custom" && step.tool !== "custom" && !sameTokenProtocolStep;
  return _jsxs(Typography, {
    sx: {
      fontSize: 12,
      lineHeight: 1,
      fontWeight: "500",
      color: "text.secondary",
      alignItems: "center",
      display: "flex",
    },
    children: [
      !showToAmount
        ? _jsxs(_Fragment, {
            children: [
              t("format.tokenAmount", {
                value: formatTokenAmount(
                  BigInt(step.estimate.fromAmount),
                  step.action.fromToken.decimals,
                ),
              }),
              " ",
              step.action.fromToken.symbol,
              " - ",
            ],
          })
        : null,
      t("format.tokenAmount", {
        value: fromAmount,
      }),
      " ",
      step.action.fromToken.symbol,
      showToAmount
        ? _jsxs(_Fragment, {
            children: [
              _jsx(ArrowForward, {
                sx: { fontSize: 18, paddingX: 0.5, height: 12 },
              }),
              t("format.tokenAmount", {
                value: formatTokenAmount(
                  BigInt(step.execution?.toAmount ?? step.estimate.toAmount),
                  step.execution?.toToken?.decimals ??
                    step.action.toToken.decimals,
                ),
              }),
              " ",
              step.execution?.toToken?.symbol ?? step.action.toToken.symbol,
            ],
          })
        : ` (${t("format.currency", {
            value: formatTokenPrice(
              fromAmount,
              step.action.fromToken.priceUSD,
              step.action.fromToken.decimals,
            ),
          })})`,
    ],
  });
};
export const CustomStepDetailsLabel = ({
  step,
  subvariant,
  subvariantOptions,
}) => {
  const { t } = useTranslation();
  if (!subvariant) {
    return null;
  }
  // FIXME: step transaction request overrides step tool details, but not included step tool details
  const toolDetails =
    subvariant === "custom" && step.includedSteps?.length > 0
      ? step.includedSteps.find(
          (step) => step.tool === "custom" && step.toolDetails.key !== "custom",
        )?.toolDetails || step.toolDetails
      : step.toolDetails;
  const stepDetailsKey =
    (subvariant === "custom" && subvariantOptions?.custom) || "checkout";
  return _jsx(StepLabelTypography, {
    children: t(`main.${stepDetailsKey}StepDetails`, {
      tool: toolDetails.name,
    }),
  });
};
export const BridgeStepDetailsLabel = ({ step }) => {
  const { t } = useTranslation();
  const { getChainById } = useAvailableChains();
  return _jsx(StepLabelTypography, {
    children: t("main.bridgeStepDetails", {
      from: getChainById(step.action.fromChainId)?.name,
      to: getChainById(step.action.toChainId)?.name,
      tool: step.toolDetails.name,
    }),
  });
};
export const SwapStepDetailsLabel = ({ step }) => {
  const { t } = useTranslation();
  const { getChainById } = useAvailableChains();
  return _jsx(StepLabelTypography, {
    children: t("main.swapStepDetails", {
      chain: getChainById(step.action.fromChainId)?.name,
      tool: step.toolDetails.name,
    }),
  });
};
export const ProtocolStepDetailsLabel = ({
  step,
  feeConfig,
  relayerSupport,
}) => {
  const { t } = useTranslation();
  return _jsx(StepLabelTypography, {
    children:
      step.toolDetails.key === "feeCollection"
        ? feeConfig?.name
          ? t("main.fees.integrator", { tool: feeConfig.name })
          : relayerSupport
            ? t("main.fees.relayerService")
            : t("main.fees.defaultIntegrator")
        : step.toolDetails.key === "gasZip"
          ? t("main.refuelStepDetails", {
              tool: step.toolDetails.name,
            })
          : step.toolDetails.name,
  });
};
//# sourceMappingURL=StepActions.js.map
