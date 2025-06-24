import type { Theme } from "@mui/material";
export declare const SettingsFieldSet: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<Theme>,
  {},
  {}
>;
interface SlippageDefaultProps {
  selected?: boolean;
}
export declare const SlippageDefaultButton: import("@emotion/styled").StyledComponent<
  import("@mui/material").ButtonBaseOwnProps &
    Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      | "children"
      | "sx"
      | "style"
      | "className"
      | "tabIndex"
      | "classes"
      | "action"
      | "disabled"
      | "centerRipple"
      | "disableRipple"
      | "disableTouchRipple"
      | "focusRipple"
      | "focusVisibleClassName"
      | "LinkComponent"
      | "onFocusVisible"
      | "TouchRippleProps"
      | "touchRippleRef"
    > &
    import("@mui/system").MUIStyledCommonProps<Theme> &
    SlippageDefaultProps,
  {},
  {}
>;
export declare const SlippageCustomInput: import("@emotion/styled").StyledComponent<
  import("@mui/material").InputBaseProps &
    import("@mui/system").MUIStyledCommonProps<Theme> &
    SlippageDefaultProps,
  {},
  {}
>;
export declare const SlippageLimitsWarningContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<Theme>,
  {},
  {}
>;
export {};
