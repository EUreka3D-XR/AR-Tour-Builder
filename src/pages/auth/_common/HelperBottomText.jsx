import { styled, Typography } from "@mui/material";

import Link from "@/components/link/Link";

const RowStyled = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginTop: "1rem",
  "& a": {
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
}));

function HelperBottomText({ text, linkText, linkUrl }) {
  return (
    <RowStyled>
      <Typography variant="body2">{text}</Typography>
      <Link to={linkUrl} underline="hover">
        {linkText}
      </Link>
    </RowStyled>
  );
}

export default HelperBottomText;
