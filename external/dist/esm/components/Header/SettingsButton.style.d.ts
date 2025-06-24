export declare const SettingsIconBadge: import("@emotion/styled").StyledComponent<
  import("@mui/material").BadgeOwnProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >,
      | "max"
      | "color"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "variant"
      | "slots"
      | "slotProps"
      | "componentsProps"
      | "anchorOrigin"
      | "badgeContent"
      | "components"
      | "invisible"
      | "overlap"
      | "showZero"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
interface SettingsIconButtonProps {
  variant?: "info" | "warning";
}
export declare const SettingsIconButton: import("@emotion/styled").StyledComponent<
  import("@mui/material").IconButtonOwnProps &
    Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      | "color"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "tabIndex"
      | "classes"
      | "action"
      | "size"
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
      | "disableFocusRipple"
      | "edge"
      | "loading"
      | "loadingIndicator"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> &
    SettingsIconButtonProps,
  {},
  {}
>;
export {};
