import { useParams } from "react-router";
import { styled } from "@mui/material";

import { useProjectTours } from "@/services/toursService";
import HeroSection from "./_sections/ToursHeroSection";

const ContainerStyled = styled("div")(({ theme }) => ({}));

function ToursPage() {
  const { projectId } = useParams();
  const { data, fetchState } = useProjectTours(projectId);
  console.log(data);
  return (
    <ContainerStyled>
      <HeroSection />
      <div>Tours Page</div>
    </ContainerStyled>
  );
}

export default ToursPage;
