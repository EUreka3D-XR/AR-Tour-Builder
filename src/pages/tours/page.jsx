import { useParams } from "react-router";
import { styled } from "@mui/material";

import { useProjectTours } from "@/services/toursService";
import useDashboardParams from "@/hooks/useDashboardParams";
import ToursFiltersSection from "./_sections/ToursFiltersSection";
import HeroSection from "./_sections/ToursHeroSection";
import ListSection from "./_sections/ToursListSection";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0, 0, 2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

function ToursPage() {
  const { projectId } = useParams();
  const { filterParams } = useDashboardParams();
  const { data, fetchState } = useProjectTours(projectId);
  console.log(data);
  return (
    <ContainerStyled className="tours-page">
      <HeroSection />
      <ToursFiltersSection />
      <ListSection tours={data} viewMode={filterParams.viewMode} />
    </ContainerStyled>
  );
}

export default ToursPage;
