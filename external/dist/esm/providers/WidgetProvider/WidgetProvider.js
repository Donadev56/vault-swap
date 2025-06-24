import { jsx as _jsx } from "react/jsx-runtime";
import { config, createConfig } from "@lifi/sdk";
import { createContext, useContext, useId, useMemo } from "react";
import { version } from "../../config/version.js";
import { useSettingsActions } from "../../stores/settings/useSettingsActions.js";
const initialContext = {
  elementId: "",
  integrator: "",
};
const WidgetContext = createContext(initialContext);
export const useWidgetConfig = () => useContext(WidgetContext);
let sdkInitialized = false;
export const WidgetProvider = ({ children, config: widgetConfig }) => {
  const elementId = useId();
  const { setDefaultSettings } = useSettingsActions();
  if (!widgetConfig?.integrator) {
    throw new Error('Required property "integrator" is missing.');
  }
  const value = useMemo(() => {
    try {
      // Create widget configuration object
      const value = {
        ...widgetConfig,
        elementId,
      };
      // Set default settings for widget settings store
      setDefaultSettings(value);
      // Configure SDK
      const _config = {
        ...widgetConfig.sdkConfig,
        apiKey: widgetConfig.apiKey,
        integrator: widgetConfig.integrator ?? window?.location.hostname,
        routeOptions: {
          fee: widgetConfig.feeConfig?.fee || widgetConfig.fee,
          referrer: widgetConfig.referrer,
          order: widgetConfig.routePriority,
          slippage: widgetConfig.slippage,
          ...widgetConfig.sdkConfig?.routeOptions,
        },
        disableVersionCheck: true,
        widgetVersion: version,
        preloadChains: false,
        // debug: true,
      };
      if (!sdkInitialized) {
        createConfig(_config);
        sdkInitialized = true;
      } else {
        config.set(_config);
      }
      return value;
    } catch (e) {
      console.warn(e);
      return {
        ...widgetConfig,
        elementId,
        integrator: widgetConfig.integrator,
      };
    }
  }, [elementId, widgetConfig, setDefaultSettings]);
  return _jsx(WidgetContext.Provider, { value: value, children: children });
};
//# sourceMappingURL=WidgetProvider.js.map
