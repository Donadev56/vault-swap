"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import { AppDefault } from "./AppDefault.js";
import { AppDrawer } from "./AppDrawer.js";
import { AppProvider } from "./AppProvider.js";
export const App = forwardRef((props, ref) => {
  const config = useMemo(() => {
    const config = { ...props, ...props.config };
    if (config.variant === "drawer") {
      config.theme = {
        ...config.theme,
        container: {
          height: "100%",
          ...config.theme?.container,
        },
      };
    }
    return config;
  }, [props]);
  if (config.variant === "drawer") {
    return _jsx(AppProvider, {
      config: config,
      formRef: props.formRef,
      children: _jsx(AppDrawer, {
        ref: ref,
        elementRef: props.elementRef,
        config: config,
        open: props.open,
        onClose: props.onClose,
        children: _jsx(AppDefault, {}),
      }),
    });
  }
  return _jsx(AppProvider, {
    config: config,
    formRef: props.formRef,
    children: _jsx(AppDefault, {}),
  });
});
//# sourceMappingURL=App.js.map
