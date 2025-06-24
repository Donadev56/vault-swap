import { jsx as _jsx } from "react/jsx-runtime";
import { Drawer } from "@mui/material";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { DrawerContext } from "./AppDrawerContext.js";
export const AppDrawer = forwardRef(
  ({ elementRef, open, onClose, children }, ref) => {
    const openRef = useRef(Boolean(open));
    const [drawerOpen, setDrawerOpen] = useState(Boolean(open));
    const toggleDrawer = useCallback(() => {
      setDrawerOpen((open) => {
        openRef.current = !open;
        return openRef.current;
      });
      if (!openRef.current) {
        onClose?.();
      }
    }, [onClose]);
    const openDrawer = useCallback(() => {
      setDrawerOpen(true);
      openRef.current = true;
    }, []);
    const closeDrawer = useCallback(() => {
      setDrawerOpen(false);
      openRef.current = false;
      onClose?.();
    }, [onClose]);
    useImperativeHandle(
      ref,
      () => ({
        isOpen: () => openRef.current,
        toggleDrawer,
        openDrawer,
        closeDrawer,
      }),
      [closeDrawer, openDrawer, toggleDrawer],
    );
    const drawerContext = useMemo(
      () => ({
        closeDrawer,
      }),
      [closeDrawer],
    );
    return _jsx(DrawerContext.Provider, {
      value: drawerContext,
      children: _jsx(Drawer, {
        ref: elementRef,
        anchor: "right",
        open: drawerOpen,
        onClose: closeDrawer,
        slotProps: {
          paper: {
            sx: (theme) => ({
              background: theme.vars.palette.background.default,
              width: theme?.container?.width ?? "100%",
              minWidth:
                theme?.container?.minWidth ?? theme.breakpoints.values.xs,
              maxWidth:
                theme?.container?.maxWidth ?? theme.breakpoints.values.sm,
            }),
          },
          backdrop: {
            sx: {
              backgroundColor: "rgb(0 0 0 / 48%)",
              backdropFilter: "blur(3px)",
            },
          },
        },
        keepMounted: true,
        children: children,
      }),
    });
  },
);
//# sourceMappingURL=AppDrawer.js.map
