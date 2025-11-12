import { IconButton, styled } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

const HeaderStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .left-section": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    "& .header-title": {
      ...theme.typography.h4,
      marginLeft: theme.spacing(4),
    },
  },
}));

function SidebarHeader({ title, onClose }) {
  return (
    <HeaderStyled className="sidebar-header no-shrink">
      <div className="left-section">
        <span className="header-title">{title}</span>
      </div>
      <div className="right-section">
        <IconButton onClick={onClose}>
          <EurekaIcon name="close" />
        </IconButton>
      </div>
    </HeaderStyled>
  );
}

export default SidebarHeader;
