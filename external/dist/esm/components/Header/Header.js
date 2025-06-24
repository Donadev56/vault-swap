import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDefaultElementId } from "../../hooks/useDefaultElementId.js";
import { useSetHeaderHeight } from "../../stores/header/useHeaderStore.js";
import { ElementId, createElementId } from "../../utils/elements.js";
import { stickyHeaderRoutes } from "../../utils/navigationRoutes.js";
import { Container } from "./Header.style.js";
import { NavigationHeader } from "./NavigationHeader.js";
import { WalletHeader } from "./WalletHeader.js";
export const HeaderContainer = ({ children }) => {
  const { pathname } = useLocation();
  const elementId = useDefaultElementId();
  const headerRef = useRef(null);
  const { setHeaderHeight } = useSetHeaderHeight();
  useLayoutEffect(() => {
    const handleHeaderResize = () => {
      const height = headerRef.current?.getBoundingClientRect().height;
      if (height) {
        setHeaderHeight(height);
      }
    };
    let resizeObserver;
    if (headerRef.current) {
      resizeObserver = new ResizeObserver(handleHeaderResize);
      resizeObserver.observe(headerRef.current);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [setHeaderHeight]);
  return _jsx(Container, {
    id: createElementId(ElementId.Header, elementId),
    sticky: stickyHeaderRoutes.some((route) => pathname.includes(route)),
    ref: headerRef,
    children: children,
  });
};
export const Header = () => {
  return _jsxs(HeaderContainer, {
    children: [_jsx(WalletHeader, {}), _jsx(NavigationHeader, {})],
  });
};
//# sourceMappingURL=Header.js.map
