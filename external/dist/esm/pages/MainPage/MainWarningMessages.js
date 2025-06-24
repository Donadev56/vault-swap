import { jsx as _jsx } from "react/jsx-runtime";
import { WarningMessages } from "../../components/Messages/WarningMessages.js";
import { useRoutes } from "../../hooks/useRoutes.js";
export const MainWarningMessages = (props) => {
  const { routes } = useRoutes();
  const currentRoute = routes?.[0];
  return _jsx(WarningMessages, { route: currentRoute, ...props });
};
//# sourceMappingURL=MainWarningMessages.js.map
