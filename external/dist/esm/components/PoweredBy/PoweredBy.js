import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Tooltip, Typography } from "@mui/material";
import { version } from "../../config/version.js";
import { useWidgetConfig } from "../../providers/WidgetProvider/WidgetProvider.js";
import { Link } from "./PoweredBy.style.js";
const poweredByConfig = {
  default: {
    url: "https://li.fi",
    text: "LI.FI",
  },
  jumper: {
    url: "https://jumper.exchange",
    text: "Jumper",
  },
};
export const PoweredBy = () => {
  const { poweredBy = "default" } = useWidgetConfig();
  return _jsx(Box, {
    sx: {
      pt: 1,
      pb: 2,
      flex: 1,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    children: _jsx(Tooltip, {
      title: `v${version}`,
      enterDelay: 1000,
      children: _jsxs(Link, {
        href: poweredByConfig[poweredBy].url,
        target: "_blank",
        underline: "none",
        color: "text.primary",
        children: [
          _jsx(Typography, {
            sx: {
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 500,
              px: 0.5,
            },
            children: "Powered by",
          }),
          _jsx(Typography, {
            sx: {
              color: "text.primary",
              fontSize: 12,
              fontWeight: 600,
            },
            children: poweredByConfig[poweredBy].text,
          }),
        ],
      }),
    }),
  });
};
//# sourceMappingURL=PoweredBy.js.map
