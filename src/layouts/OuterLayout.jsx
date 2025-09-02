import { Outlet } from "react-router";
import { styled } from "@mui/material";

import Header from "@/components/header/Header";

const PageContainerStyled = styled("div")(({ theme }) => ({
  width: "100vw",
  minHeight: `calc(100vh - ${theme.custom.headerHeight})`,
}));

function OuterLayout() {
  return (
    <>
      <Header />
      <PageContainerStyled className="page-content">
        <Outlet />
      </PageContainerStyled>
    </>
  );
}

export default OuterLayout;
