import type { DialogProps, Theme } from "@mui/material";
import type { PropsWithChildren } from "react";
export declare const modalProps: {
  sx: {
    position: string;
    overflow: string;
  };
};
export declare const slotProps: {
  paper: {
    sx: (theme: Theme) => {
      position: string;
      backgroundImage: string;
      backgroundColor: string;
      borderTopLeftRadius: number;
      borderTopRightRadius: number;
    };
  };
  backdrop: {
    sx: {
      position: string;
      backgroundColor: string;
      backdropFilter: string;
    };
  };
};
export declare const Dialog: React.FC<PropsWithChildren<DialogProps>>;
