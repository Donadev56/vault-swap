import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SearchOff from "@mui/icons-material/SearchOff";
import {
  NotFoundContainer,
  NotFoundIconContainer,
  NotFoundMessage,
} from "./SearchNotFound.style.js";
export const SearchNotFound = ({ message, adjustForStickySearchInput }) =>
  _jsxs(NotFoundContainer, {
    adjustForStickySearchInput: adjustForStickySearchInput,
    children: [
      _jsx(NotFoundIconContainer, {
        children: _jsx(SearchOff, { fontSize: "inherit" }),
      }),
      _jsx(NotFoundMessage, { children: message }),
    ],
  });
//# sourceMappingURL=SearchNotFound.js.map
