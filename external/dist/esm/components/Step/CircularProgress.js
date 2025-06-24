import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Done from "@mui/icons-material/Done";
import ErrorRounded from "@mui/icons-material/ErrorRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";
import WarningRounded from "@mui/icons-material/WarningRounded";
import {
  CircularIcon,
  CircularProgressPending,
} from "./CircularProgress.style.js";
export function CircularProgress({ process }) {
  return _jsxs(CircularIcon, {
    status: process.status,
    substatus: process.substatus,
    children: [
      process.status === "STARTED" || process.status === "PENDING"
        ? _jsx(CircularProgressPending, { size: 40 })
        : null,
      process.status === "ACTION_REQUIRED"
        ? _jsx(InfoRounded, {
            color: "info",
            sx: {
              position: "absolute",
              fontSize: "1.5rem",
            },
          })
        : null,
      process.status === "DONE" &&
      (process.substatus === "PARTIAL" || process.substatus === "REFUNDED")
        ? _jsx(WarningRounded, {
            sx: (theme) => ({
              position: "absolute",
              fontSize: "1.5rem",
              color: `color-mix(in srgb, ${theme.vars.palette.warning.main} 68%, black)`,
            }),
          })
        : process.status === "DONE"
          ? _jsx(Done, {
              color: "success",
              sx: {
                position: "absolute",
                fontSize: "1.5rem",
              },
            })
          : null,
      process.status === "FAILED"
        ? _jsx(ErrorRounded, {
            color: "error",
            sx: {
              position: "absolute",
              fontSize: "1.5rem",
            },
          })
        : null,
    ],
  });
}
//# sourceMappingURL=CircularProgress.js.map
