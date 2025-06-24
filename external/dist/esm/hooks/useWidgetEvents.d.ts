import { type Emitter } from "mitt";
import type { WidgetEvents } from "../types/events.js";
export declare const widgetEvents: Emitter<WidgetEvents>;
export declare const useWidgetEvents: () => Emitter<WidgetEvents>;
