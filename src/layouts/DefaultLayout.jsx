import { styled } from "@mui/material";

import { GeneralProvider } from "@/providers/general/GeneralProvider";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import RoutesLayout from "./RoutesLayout";

const PageContainerStyled = styled("div")(({ theme }) => ({
  width: "100vw",
  height: `calc(100vh - ${theme.custom.headerHeight})`,
  display: "flex",
  overflow: "hidden",
  padding: "1rem 0 0",
  "& .page-content": {
    flex: 1,
    overflowY: "auto",
    border: "solid red",
  },
}));

function DefaultLayout() {
  return (
    <GeneralProvider>
      <Header />
      <PageContainerStyled>
        <Navbar />
        <div className="page-content">
          <RoutesLayout />
        </div>
      </PageContainerStyled>
    </GeneralProvider>
  );
}

export default DefaultLayout;
