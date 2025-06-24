import type { WidgetSubvariant } from "../../types/widget.js";
export declare const HeaderAppBar: import("@emotion/styled").StyledComponent<
  import("@mui/material").AppBarOwnProps &
    Omit<
      import("@mui/material").PaperOwnProps,
      "color" | "position" | "classes"
    > &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLElement>,
        HTMLElement
      >,
      | "color"
      | "position"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "variant"
      | "elevation"
      | "square"
      | "enableColorOnDark"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const Container: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<
      import("@mui/material").Theme
    > & {
      sticky?: boolean;
    },
  {},
  {}
>;
export declare const WalletButton: import("@emotion/styled").StyledComponent<
  import("@mui/material").ButtonOwnProps &
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
      | "variant"
      | "href"
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
      | "loading"
      | "loadingIndicator"
      | "disableElevation"
      | "endIcon"
      | "fullWidth"
      | "loadingPosition"
      | "startIcon"
    > &
    import("@mui/system").MUIStyledCommonProps<
      import("@mui/material").Theme
    > & {
      subvariant?: WidgetSubvariant;
    },
  {},
  {}
>;
export declare const DrawerWalletContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const HeaderControlsContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const WalletAvatar: import("@emotion/styled").StyledComponent<
  import("@mui/material").AvatarOwnProps &
    import("@mui/material").AvatarSlotsAndSlotProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "variant"
      | "alt"
      | "imgProps"
      | "sizes"
      | "src"
      | "srcSet"
      | "slots"
      | "slotProps"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
