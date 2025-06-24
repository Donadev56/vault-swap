import { Box, Typography, styled } from "@mui/material";
import { searchContainerHeight } from "./SearchInput.style.js";
export const NotFoundContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "adjustForStickySearchInput",
})(({ theme, adjustForStickySearchInput }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
  padding: theme.spacing(3),
  ...(adjustForStickySearchInput && theme.header?.position === "fixed"
    ? { paddingTop: `calc(${searchContainerHeight}px + ${theme.spacing(3)})` }
    : {}),
}));
export const NotFoundMessage = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.vars.palette.text.secondary,
  textAlign: "center",
  flex: 1,
  marginTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));
export const NotFoundIconContainer = styled(Typography)(() => ({
  fontSize: 48,
  lineHeight: 1,
}));
//# sourceMappingURL=SearchNotFound.style.js.map
