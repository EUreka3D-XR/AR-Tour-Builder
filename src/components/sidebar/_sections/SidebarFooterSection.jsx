import { Stack, styled } from "@mui/material";

const FooterStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
}));

function SidebarFooterSection({ children }) {
  return (
    <FooterStyled className="sidebar-footer">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {children}
      </Stack>
    </FooterStyled>
  );
}

export default SidebarFooterSection;
