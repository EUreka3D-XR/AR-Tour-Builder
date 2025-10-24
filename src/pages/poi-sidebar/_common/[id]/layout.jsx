import { styled } from "@mui/material";

const ViewPoiSidebarLayout = styled("div")(({ theme }) => ({
  "& .poi-sidebar-content": {
    padding: theme.spacing(1, 2),
  },
  "& .poi-info-section, .poi-links-section, .poi-media-section": {
    marginTop: theme.spacing(4),
    padding: theme.spacing(0, 4),
  },
}));

export default ViewPoiSidebarLayout;
