import { useParams } from "react-router";
import { styled } from "@mui/material";

import { useLibraryAssets } from "@/services/libraryService";
import useDashboardParams from "../../hooks/useDashboardParams";
import TableSection from "./_sections/_table-section/LibraryTableSection";
import FiltersSection from "./_sections/LibraryFiltersSection";
import HeaderSection from "./_sections/LibraryHeaderSection";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
}));

function LibraryPage() {
  const { projectId } = useParams();
  const { filterParams } = useDashboardParams();
  const { data, fetchState } = useLibraryAssets(projectId, filterParams);

  return (
    <ContainerStyled>
      <HeaderSection />
      <FiltersSection />
      <TableSection assets={data} fetchState={fetchState} />
    </ContainerStyled>
  );
}

export default LibraryPage;
