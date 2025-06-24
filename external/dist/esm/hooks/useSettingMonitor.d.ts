export declare const useSettingMonitor: () => {
  isBridgesChanged: boolean;
  isExchangesChanged: boolean;
  isSlippageChanged: boolean;
  isSlippageNotRecommended: boolean;
  isSlippageOutsideRecommendedLimits: boolean | "" | undefined;
  isSlippageUnderRecommendedLimits: boolean | "" | undefined;
  isRoutePriorityChanged: boolean;
  isGasPriceChanged: boolean;
  isCustomRouteSettings: boolean;
  isRouteSettingsWithWarnings: boolean;
  reset: () => void;
};
