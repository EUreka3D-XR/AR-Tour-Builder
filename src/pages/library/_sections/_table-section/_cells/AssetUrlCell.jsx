import { styled } from "@mui/material";

import Link from "@/components/link/Link";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "block",
  width: "100%",
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: theme.spacing(0.5, 1),
  transition: theme.transitions.create("border", {
    duration: theme.transitions.duration.shortest,
  }),
  "&:hover": {
    border: `1px solid ${theme.palette.grey[500]}`,
  },
}));

function AssetURLCell({ url }) {
  return (
    <LinkStyled to={url} openInNewTab noWrap>
      {url}
    </LinkStyled>
  );
}

export default AssetURLCell;
