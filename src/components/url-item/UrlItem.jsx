import { styled } from "@mui/material";

import Link from "@/components/link/Link";
import EurekaIcon from "../icon/EurekaIcon";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "block",
  width: "max-content",
  maxWidth: "100%",
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
  "& .content-wrapper": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    "& .icon": {
      transform: "rotate(135deg)",
    },
    "& .url-text": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));

function UrlItem({ url, title, className }) {
  return (
    <LinkStyled to={url} openInNewTab noWrap className={className}>
      <span className="content-wrapper">
        <EurekaIcon name="link" fontSize="small" className="icon" />
        <span className="url-text">{title ?? url}</span>
      </span>
    </LinkStyled>
  );
}

export default UrlItem;
