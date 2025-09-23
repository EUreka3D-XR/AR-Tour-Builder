import { useParams } from "react-router";
import { styled } from "@mui/material";

import { useLibraryAssets } from "@/services/libraryService";
import FiltersSection from "./_sections/LibraryFiltersSection";
import HeaderSection from "./_sections/LibraryHeaderSection";
import TableSection from "./_sections/LibraryTableSection";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
}));

function LibraryPage() {
  const { projectId } = useParams();
  const { data, fetchState } = useLibraryAssets(projectId);

  return (
    <ContainerStyled>
      <HeaderSection />
      <FiltersSection />
      <TableSection assets={data} fetchState={fetchState} />
    </ContainerStyled>
  );
}

export default LibraryPage;
