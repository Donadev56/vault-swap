import type { Theme } from "@mui/material";
import { RouteExecutionStatus } from "../../stores/routes/types.js";
type StatusColor = RouteExecutionStatus | "warning";
export declare const CenterContainer: import("@emotion/styled").StyledComponent<
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
export declare const IconCircle: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<Theme> & {
      status: StatusColor;
    },
  {},
  {}
>;
export {};
