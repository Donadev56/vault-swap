export declare enum ElementId {
  AppExpandedContainer = "widget-app-expanded-container",
  Header = "widget-header",
  RelativeContainer = "widget-relative-container",
  ScrollableContainer = "widget-scrollable-container",
}
export declare const createElementId: (
  ElementId: ElementId,
  elementId: string,
) => string;
export declare const getAppContainer: (elementId: string) => HTMLElement | null;
export declare const getRelativeContainer: (
  elementId: string,
) => HTMLElement | null;
export declare const getScrollableContainer: (
  elementId: string,
) => HTMLElement | null;
export declare const getHeaderElement: (
  elementId: string,
) => HTMLElement | null;
