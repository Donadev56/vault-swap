import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Collapse } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRoutes } from "../../hooks/useRoutes.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { navigationRoutes } from "../../utils/navigationRoutes.js";
import { ButtonTertiary } from "../ButtonTertiary.js";
import { Card } from "../Card/Card.js";
import { CardTitle } from "../Card/CardTitle.js";
import { ProgressToNextUpdate } from "../ProgressToNextUpdate.js";
import { RouteCard } from "../RouteCard/RouteCard.js";
import { RouteCardSkeleton } from "../RouteCard/RouteCardSkeleton.js";
import { RouteNotFoundCard } from "../RouteCard/RouteNotFoundCard.js";
export const Routes = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subvariant, subvariantOptions, useRecommendedRoute } =
    useWidgetConfig();
  const {
    routes,
    isLoading,
    isFetching,
    isFetched,
    dataUpdatedAt,
    refetchTime,
    refetch,
  } = useRoutes();
  const currentRoute = routes?.[0];
  if (!currentRoute && !isLoading && !isFetching && !isFetched) {
    return null;
  }
  const handleCardClick = () => {
    navigate(navigationRoutes.routes);
  };
  const routeNotFound = !currentRoute && !isLoading && !isFetching;
  const onlyRecommendedRoute = subvariant === "refuel" || useRecommendedRoute;
  const showAll =
    !onlyRecommendedRoute && !routeNotFound && (routes?.length ?? 0) > 1;
  const title =
    subvariant === "custom"
      ? subvariantOptions?.custom === "deposit"
        ? t("header.receive")
        : t("header.youPay")
      : t("header.receive");
  return _jsxs(Card, {
    ...props,
    children: [
      _jsx(CardTitle, { children: title }),
      _jsx(ProgressToNextUpdate, {
        updatedAt: dataUpdatedAt || new Date().getTime(),
        timeToUpdate: refetchTime,
        isLoading: isFetching,
        onClick: () => refetch(),
        sx: {
          position: "absolute",
          top: 8,
          right: 8,
        },
      }),
      _jsxs(Box, {
        sx: {
          p: 2,
        },
        children: [
          isLoading && !currentRoute
            ? _jsx(RouteCardSkeleton, { variant: "cardless" })
            : !currentRoute
              ? _jsx(RouteNotFoundCard, {})
              : _jsx(RouteCard, {
                  route: currentRoute,
                  variant: "cardless",
                  active: true,
                }),
          _jsx(Collapse, {
            timeout: 225,
            in: showAll,
            unmountOnExit: true,
            mountOnEnter: true,
            children: _jsx(Box, {
              sx: {
                mt: 2,
              },
              children: _jsx(ButtonTertiary, {
                onClick: handleCardClick,
                fullWidth: true,
                children: t("button.showAll"),
              }),
            }),
          }),
        ],
      }),
    ],
  });
};
//# sourceMappingURL=Routes.js.map
