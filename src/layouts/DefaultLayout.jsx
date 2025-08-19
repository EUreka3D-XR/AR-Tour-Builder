import { styled } from "@mui/material";

import { useGeneralProvider } from "@/providers/general/GeneralContext";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import RoutesLayout from "./RoutesLayout";

const PageContainerStyled = styled("div")(({ theme }) => ({
  width: "100vw",
  height: `calc(100vh - ${theme.custom.headerHeight})`,
  display: "flex",
  overflow: "hidden",
  "& .page-content": {
    flex: 1,
    overflowY: "auto",
    border: "solid red",
  },
}));

function DefaultLayout() {
  const { isInsideAProject } = useGeneralProvider();

  return (
    <>
      <Header />
      <PageContainerStyled>
        {isInsideAProject && <Navbar />}
        <div className="page-content">
          <RoutesLayout />
        </div>
      </PageContainerStyled>
    </>
  );
}

export default DefaultLayout;
