import { Outlet } from "react-router";
import { styled } from "@mui/material";

import Navbar from "@/components/navbar/Navbar";

const ContainerStyled = styled("div")(({ theme }) => ({
  height: `calc(100vh - ${theme.custom.headerHeight})`,
  display: "flex",
  overflow: "hidden",
  "& .project-content": {
    flex: 1,
    overflowY: "auto",
  },
}));

function ProjectLayout() {
  return (
    <ContainerStyled>
      <Navbar />
      <div className="project-content">
        <Outlet />
      </div>
    </ContainerStyled>
  );
}

export default ProjectLayout;
