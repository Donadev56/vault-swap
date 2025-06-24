import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useWidgetEvents } from "../../hooks/useWidgetEvents.js";
import { WidgetEvent } from "../../types/events.js";
import { deepEqual } from "../../utils/deepEqual.js";
import {
  defaultConfigurableSettings,
  useSettingsStore,
} from "./useSettingsStore.js";
const emitEventOnChange = (emitter, actions, settingFunction, ...args) => {
  const oldSettings = actions.getSettings();
  settingFunction(...args);
  const newSettings = actions.getSettings();
  if (!deepEqual(oldSettings, newSettings)) {
    Object.keys(oldSettings).forEach((toolKey) => {
      if (!deepEqual(oldSettings[toolKey], newSettings[toolKey])) {
        emitter.emit(WidgetEvent.SettingUpdated, {
          setting: toolKey,
          newValue: newSettings[toolKey],
          oldValue: oldSettings[toolKey],
          newSettings: newSettings,
          oldSettings: oldSettings,
        });
      }
    });
  }
};
export const useSettingsActions = () => {
  const emitter = useWidgetEvents();
  const actions = useSettingsStore(
    (state) => ({
      setValue: state.setValue,
      getValue: state.getValue,
      getSettings: state.getSettings,
      reset: state.reset,
      setToolValue: state.setToolValue,
      toggleToolKeys: state.toggleToolKeys,
    }),
    shallow,
  );
  const setValueWithEmittedEvent = useCallback(
    (value, newValue) => {
      const setting = value;
      emitEventOnChange(emitter, actions, actions.setValue, setting, newValue);
    },
    [emitter, actions],
  );
  const setDefaultSettingsWithEmittedEvents = useCallback(
    (config) => {
      const slippage = actions.getValue("slippage");
      const routePriority = actions.getValue("routePriority");
      const gasPrice = actions.getValue("gasPrice");
      const defaultSlippage =
        (config?.slippage || config?.sdkConfig?.routeOptions?.slippage || 0) *
        100;
      const defaultRoutePriority =
        config?.routePriority || config?.sdkConfig?.routeOptions?.order;
      defaultConfigurableSettings.slippage = (
        defaultSlippage || defaultConfigurableSettings.slippage
      )?.toString();
      defaultConfigurableSettings.routePriority =
        defaultRoutePriority || defaultConfigurableSettings.routePriority;
      if (!slippage) {
        setValueWithEmittedEvent(
          "slippage",
          defaultConfigurableSettings.slippage,
        );
      }
      if (!routePriority) {
        setValueWithEmittedEvent(
          "routePriority",
          defaultConfigurableSettings.routePriority,
        );
      }
      if (!gasPrice) {
        setValueWithEmittedEvent(
          "gasPrice",
          defaultConfigurableSettings.gasPrice,
        );
      }
    },
    [actions, setValueWithEmittedEvent],
  );
  const resetWithEmittedEvents = useCallback(
    (bridges, exchanges) => {
      emitEventOnChange(emitter, actions, actions.reset, bridges, exchanges);
    },
    [emitter, actions],
  );
  const setToolValueWithEmittedEvents = useCallback(
    (toolType, tool, value) => {
      emitEventOnChange(
        emitter,
        actions,
        actions.setToolValue,
        toolType,
        tool,
        value,
      );
    },
    [emitter, actions],
  );
  const toggleToolKeysWithEmittedEvents = useCallback(
    (toolType, toolKeys) => {
      emitEventOnChange(
        emitter,
        actions,
        actions.toggleToolKeys,
        toolType,
        toolKeys,
      );
    },
    [emitter, actions],
  );
  return {
    setValue: setValueWithEmittedEvent,
    setDefaultSettings: setDefaultSettingsWithEmittedEvents,
    resetSettings: resetWithEmittedEvents,
    setToolValue: setToolValueWithEmittedEvents,
    toggleToolKeys: toggleToolKeysWithEmittedEvents,
  };
};
//# sourceMappingURL=useSettingsActions.js.map
