import type { WidgetConfig } from "../../types/widget.js";
import type { SettingsProps, SettingsToolType, ValueSetter } from "./types.js";
export declare const useSettingsActions: () => {
  setValue: ValueSetter<SettingsProps>;
  setDefaultSettings: (config?: WidgetConfig) => void;
  resetSettings: (bridges: string[], exchanges: string[]) => void;
  setToolValue: (
    toolType: SettingsToolType,
    tool: string,
    value: boolean,
  ) => void;
  toggleToolKeys: (toolType: SettingsToolType, toolKeys: string[]) => void;
};
