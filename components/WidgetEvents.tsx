"use client";
import { SaveTransaction } from "@/app/server-actions/transaction-history";
import type { Route } from "@lifi/sdk";
import type {
  RouteExecutionUpdate,
  RouteHighValueLossUpdate,
} from "@lifi/widget";
import { WidgetEvent, useWidgetEvents } from "@lifi/widget";
import { useEffect } from "react";

export const WidgetEvents = () => {
  const widgetEvents = useWidgetEvents();

  useEffect(() => {
    const onRouteExecutionStarted = (_route: Route) => {
      console.log("onRouteExecutionStarted fired.", _route);
    };
    const onRouteExecutionUpdated = (_update: RouteExecutionUpdate) => {
      console.log("onRouteExecutionUpdated fired.", _update);
    };
    const onRouteExecutionCompleted = async (_route: Route) => {
      console.log("onRouteExecutionCompleted fired.", _route);
      try {
        const result = await SaveTransaction(_route);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    const onRouteExecutionFailed = (_update: RouteExecutionUpdate) => {
      console.log("onRouteExecutionFailed fired.");
    };
    const onRouteHighValueLoss = (_update: RouteHighValueLossUpdate) => {
      console.log("onRouteHighValueLoss continued.");
    };
    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted,
    );
    widgetEvents.on(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    return () => widgetEvents.all.clear();
  }, [widgetEvents]);

  return null;
};
