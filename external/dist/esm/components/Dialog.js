import { jsx as _jsx } from "react/jsx-runtime";
import { Dialog as MuiDialog } from "@mui/material";
import { useGetScrollableContainer } from "../hooks/useScrollableContainer.js";
export const modalProps = {
  sx: {
    position: "absolute",
    overflow: "hidden",
  },
};
export const slotProps = {
  paper: {
    sx: (theme) => ({
      position: "absolute",
      backgroundImage: "none",
      backgroundColor: theme.vars.palette.background.default,
      borderTopLeftRadius: theme.vars.shape.borderRadius,
      borderTopRightRadius: theme.vars.shape.borderRadius,
    }),
  },
  backdrop: {
    sx: {
      position: "absolute",
      backgroundColor: "rgb(0 0 0 / 32%)",
      backdropFilter: "blur(3px)",
    },
  },
};
export const Dialog = ({ children, open, onClose }) => {
  const getContainer = useGetScrollableContainer();
  return _jsx(MuiDialog, {
    container: getContainer,
    open: open,
    onClose: onClose,
    sx: modalProps.sx,
    slotProps: slotProps,
    children: children,
  });
};
//# sourceMappingURL=Dialog.js.map
