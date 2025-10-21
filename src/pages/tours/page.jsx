import { useMemo } from "react";
import { useParams } from "react-router";
import { styled } from "@mui/material";

import { useProjectTours } from "@/services/toursService";
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
  const { data, fetchState } = useProjectTours(projectId);

  const defaultTourId = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data[0].id;
    }
  }, [data]);

  return (
    <ContainerStyled className="tours-page">
      <HeroSection />
      <ToursFiltersSection defaultTourId={defaultTourId} />
      <ListSection tours={data} fetchState={fetchState} />
    </ContainerStyled>
  );
}

export default ToursPage;
