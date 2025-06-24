import type { ProcessStatus, Substatus } from "@lifi/sdk";
import type { Theme } from "@mui/material";
export declare const CircularIcon: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<Theme> & {
      status?: ProcessStatus;
      substatus?: Substatus;
    },
  {},
  {}
>;
export declare const CircularProgressPending: import("@emotion/styled").StyledComponent<
  import("@mui/material").CircularProgressProps &
    import("@mui/system").MUIStyledCommonProps<Theme>,
  {},
  {}
>;
