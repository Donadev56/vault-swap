import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Done from "@mui/icons-material/Done";
import ErrorRounded from "@mui/icons-material/ErrorRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet.js";
import { Card } from "../../components/Card/Card.js";
import { CardTitle } from "../../components/Card/CardTitle.js";
import { Token } from "../../components/Token/Token.js";
import { useAvailableChains } from "../../hooks/useAvailableChains.js";
import { useNavigateBack } from "../../hooks/useNavigateBack.js";
import { getProcessMessage } from "../../hooks/useProcessMessage.js";
import { useSetContentHeight } from "../../hooks/useSetContentHeight.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { useFieldActions } from "../../stores/form/useFieldActions.js";
import { RouteExecutionStatus } from "../../stores/routes/types.js";
import { getSourceTxHash } from "../../stores/routes/utils.js";
import { hasEnumFlag } from "../../utils/enum.js";
import { formatTokenAmount } from "../../utils/format.js";
import { navigationRoutes } from "../../utils/navigationRoutes.js";
import { CenterContainer, IconCircle } from "./StatusBottomSheet.style.js";
export const StatusBottomSheet = ({ status, route }) => {
  const ref = useRef(null);
  const onClose = useCallback(() => {
    ref.current?.close();
  }, []);
  useEffect(() => {
    const hasSuccessFlag = hasEnumFlag(status, RouteExecutionStatus.Done);
    const hasFailedFlag = hasEnumFlag(status, RouteExecutionStatus.Failed);
    if ((hasSuccessFlag || hasFailedFlag) && !ref.current?.isOpen()) {
      ref.current?.open();
    }
  }, [status]);
  return _jsx(BottomSheet, {
    ref: ref,
    children: _jsx(StatusBottomSheetContent, {
      status: status,
      route: route,
      onClose: onClose,
    }),
  });
};
export const StatusBottomSheetContent = ({ status, route, onClose }) => {
  const { t } = useTranslation();
  const { navigateBack, navigate } = useNavigateBack();
  const { setFieldValue } = useFieldActions();
  const {
    subvariant,
    subvariantOptions,
    contractSecondaryComponent,
    contractCompactComponent,
    feeConfig,
  } = useWidgetConfig();
  const { getChainById } = useAvailableChains();
  const ref = useRef(null);
  useSetContentHeight(ref);
  const toToken = {
    ...(route.steps.at(-1)?.execution?.toToken ?? route.toToken),
    amount: BigInt(
      route.steps.at(-1)?.execution?.toAmount ??
        route.steps.at(-1)?.estimate.toAmount ??
        route.toAmount,
    ),
  };
  const cleanFields = () => {
    setFieldValue("fromAmount", "");
    setFieldValue("toAmount", "");
  };
  const handleDone = () => {
    cleanFields();
    navigateBack();
  };
  const handlePartialDone = () => {
    if (
      toToken.chainId !== route.toToken.chainId &&
      toToken.address !== route.toToken.address
    ) {
      setFieldValue(
        "fromAmount",
        formatTokenAmount(toToken.amount, toToken.decimals),
        { isTouched: true },
      );
      setFieldValue("fromChain", toToken.chainId, { isTouched: true });
      setFieldValue("fromToken", toToken.address, { isTouched: true });
      setFieldValue("toChain", route.toToken.chainId, {
        isTouched: true,
      });
      setFieldValue("toToken", route.toToken.address, {
        isTouched: true,
      });
    } else {
      cleanFields();
    }
    navigateBack();
  };
  const handleClose = () => {
    cleanFields();
    onClose();
  };
  const handleSeeDetails = () => {
    handleClose();
    const transactionHash = getSourceTxHash(route);
    navigate(navigationRoutes.transactionDetails, {
      state: {
        routeId: route.id,
        transactionHash,
      },
      replace: true,
    });
  };
  const transactionType =
    route.fromChainId === route.toChainId ? "swap" : "bridge";
  let title;
  let primaryMessage;
  let failedMessage;
  let handlePrimaryButton = handleDone;
  switch (status) {
    case RouteExecutionStatus.Done: {
      title =
        subvariant === "custom"
          ? t(
              `success.title.${subvariantOptions?.custom ?? "checkout"}Successful`,
            )
          : t(`success.title.${transactionType}Successful`);
      handlePrimaryButton = handleDone;
      break;
    }
    case RouteExecutionStatus.Done | RouteExecutionStatus.Partial: {
      title = t(`success.title.${transactionType}PartiallySuccessful`);
      primaryMessage = t("success.message.exchangePartiallySuccessful", {
        tool: route.steps.at(-1)?.toolDetails.name,
        tokenSymbol: route.steps.at(-1)?.action.toToken.symbol,
      });
      handlePrimaryButton = handlePartialDone;
      break;
    }
    case RouteExecutionStatus.Done | RouteExecutionStatus.Refunded: {
      title = t("success.title.refundIssued");
      primaryMessage = t("success.message.exchangePartiallySuccessful", {
        tool: route.steps.at(-1)?.toolDetails.name,
        tokenSymbol: route.steps.at(-1)?.action.toToken.symbol,
      });
      break;
    }
    case RouteExecutionStatus.Failed: {
      const step = route.steps.find(
        (step) => step.execution?.status === "FAILED",
      );
      const process = step?.execution?.process.find(
        (process) => process.status === "FAILED",
      );
      if (!step || !process) {
        break;
      }
      const processMessage = getProcessMessage(t, getChainById, step, process);
      title = processMessage.title;
      failedMessage = processMessage.message;
      handlePrimaryButton = handleClose;
      break;
    }
    default:
      break;
  }
  const showContractComponent =
    subvariant === "custom" &&
    hasEnumFlag(status, RouteExecutionStatus.Done) &&
    (contractCompactComponent || contractSecondaryComponent);
  const VcComponent =
    status === RouteExecutionStatus.Done ? feeConfig?._vcComponent : undefined;
  return _jsxs(Box, {
    ref: ref,
    sx: {
      p: 3,
    },
    children: [
      !showContractComponent
        ? _jsx(CenterContainer, {
            children: _jsxs(IconCircle, {
              status: status,
              mb: 1,
              children: [
                status === RouteExecutionStatus.Idle
                  ? _jsx(InfoRounded, { color: "primary" })
                  : null,
                status === RouteExecutionStatus.Done
                  ? _jsx(Done, { color: "success" })
                  : null,
                hasEnumFlag(status, RouteExecutionStatus.Partial) ||
                hasEnumFlag(status, RouteExecutionStatus.Refunded)
                  ? _jsx(WarningRounded, { color: "warning" })
                  : null,
                hasEnumFlag(status, RouteExecutionStatus.Failed)
                  ? _jsx(ErrorRounded, { color: "error" })
                  : null,
              ],
            }),
          })
        : null,
      _jsx(CenterContainer, {
        children: _jsx(Typography, {
          sx: {
            py: 1,
            fontSize: 18,
            fontWeight: 700,
          },
          children: title,
        }),
      }),
      showContractComponent
        ? contractCompactComponent || contractSecondaryComponent
        : hasEnumFlag(status, RouteExecutionStatus.Failed) && failedMessage
          ? _jsx(Typography, {
              sx: {
                py: 1,
              },
              children: failedMessage,
            })
          : hasEnumFlag(status, RouteExecutionStatus.Done)
            ? _jsxs(Box, {
                sx: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginTop: 2,
                  marginBottom: VcComponent ? 2 : 3,
                },
                children: [
                  _jsxs(Card, {
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      padding: 2,
                    },
                    children: [
                      _jsx(CardTitle, {
                        sx: { padding: 0 },
                        children: hasEnumFlag(
                          status,
                          RouteExecutionStatus.Refunded,
                        )
                          ? t("header.refunded")
                          : t("header.received"),
                      }),
                      _jsx(Token, {
                        token: toToken,
                        disableDescription: false,
                      }),
                      primaryMessage &&
                        _jsx(Typography, {
                          sx: {
                            color: "text.secondary",
                            fontSize: "12px",
                            lineHeight: "16px",
                            fontWeight: 500,
                          },
                          children: primaryMessage,
                        }),
                    ],
                  }),
                  VcComponent ? _jsx(VcComponent, { route: route }) : null,
                ],
              })
            : null,
      _jsxs(Box, {
        sx: { display: "flex", marginTop: 2, gap: 1.5 },
        children: [
          hasEnumFlag(status, RouteExecutionStatus.Done)
            ? _jsx(Button, {
                variant: "text",
                onClick: handleSeeDetails,
                fullWidth: true,
                children: t("button.seeDetails"),
              })
            : null,
          _jsxs(Button, {
            variant: "contained",
            fullWidth: true,
            onClick: handlePrimaryButton,
            children: [
              status === RouteExecutionStatus.Idle ? t("button.ok") : null,
              hasEnumFlag(status, RouteExecutionStatus.Done)
                ? t("button.done")
                : null,
              status === RouteExecutionStatus.Failed
                ? t("button.seeDetails")
                : null,
            ],
          }),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=StatusBottomSheet.js.map
