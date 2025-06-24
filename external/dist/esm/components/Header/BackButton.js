import { jsx as _jsx } from "react/jsx-runtime";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { IconButton, useTheme } from "@mui/material";
export const BackButton = ({ onClick }) => {
  const theme = useTheme();
  return _jsx(IconButton, {
    size: "medium",
    edge: theme?.navigation?.edge ? "start" : false,
    onClick: onClick,
    children: _jsx(ArrowBack, {}),
  });
};
//# sourceMappingURL=BackButton.js.map
