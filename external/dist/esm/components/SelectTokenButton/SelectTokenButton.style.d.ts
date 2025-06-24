import type { FormType } from "../../stores/form/types.js";
export declare const SelectTokenCardHeader: import("@emotion/styled").StyledComponent<
  import("@mui/material").CardHeaderOwnProps<"span", "span"> &
    import("@mui/material").CardHeaderSlotsAndSlotProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      | "title"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "action"
      | "slots"
      | "slotProps"
      | "disableTypography"
      | "subheader"
      | "avatar"
      | "subheaderTypographyProps"
      | "titleTypographyProps"
    > &
    import("@mui/system").MUIStyledCommonProps<
      import("@mui/material").Theme
    > & {
      selected?: boolean;
      compact?: boolean;
    },
  {},
  {}
>;
export declare const SelectTokenCard: import("@emotion/styled").StyledComponent<
  import("@mui/material").CardOwnProps &
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
      | "elevation"
      | "square"
      | "raised"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> &
    import("../Card/Card.js").CardProps,
  {},
  {}
>;
export declare const CardContent: import("@emotion/styled").StyledComponent<
  import("@mui/material").CardContentOwnProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "children" | "sx" | "style" | "className" | "classes"
    > &
    import("@mui/system").MUIStyledCommonProps<
      import("@mui/material").Theme
    > & {
      formType: FormType;
      compact: boolean;
      mask?: boolean;
    },
  {},
  {}
>;
