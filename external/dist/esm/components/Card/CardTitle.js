import { Typography, styled } from "@mui/material";
export const CardTitle = styled(Typography, {
  shouldForwardProp: (prop) => !["required"].includes(prop),
})(({ theme }) => ({
  fontSize: 14,
  lineHeight: 1,
  fontWeight: 700,
  padding: theme.spacing(2, 2, 0, 2),
  textAlign: "left",
  color: theme.vars.palette.text.primary,
  "&:after": {
    content: "none",
    color: theme.vars.palette.error.main,
  },
  variants: [
    {
      props: ({ required }) => required,
      style: {
        "&:after": {
          content: '" *"',
        },
      },
    },
  ],
}));
//# sourceMappingURL=CardTitle.js.map
