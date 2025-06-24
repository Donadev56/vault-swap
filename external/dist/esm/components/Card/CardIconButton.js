import { IconButton as MuiIconButton, styled } from "@mui/material";
export const CardIconButton = styled(MuiIconButton)(({ theme }) => {
  return {
    padding: theme.spacing(0.5),
    backgroundColor: `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.04)`,
    "&:hover": {
      backgroundColor: `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.08)`,
    },
    fontSize: "1rem",
  };
});
//# sourceMappingURL=CardIconButton.js.map
