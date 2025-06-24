export declare const ChainCard: import("@emotion/styled").StyledComponent<
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
    import("../../components/Card/Card.js").CardProps,
  {},
  {}
>;
export declare const ChainContainer: import("@emotion/styled").StyledComponent<
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
      itemCount: number;
    },
  {},
  {}
>;
