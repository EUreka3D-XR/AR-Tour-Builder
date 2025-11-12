import { useParams } from "react-router";
import { styled } from "@mui/material";

import { useLibraryAssets } from "@/services/libraryService";
import TableSection from "./_sections/_table-section/LibraryTableSection";
import FiltersSection from "./_sections/LibraryFiltersSection";
import HeaderSection from "./_sections/LibraryHeaderSection";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "library-page-container",
  height: "100%",
  padding: theme.spacing(4, 4, 0),
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

function LibraryPage() {
  const { projectId } = useParams();
  const { data, fetchState } = useLibraryAssets(projectId);

  return (
    <ContainerStyled>
      <HeaderSection />
      <FiltersSection />
      <TableSection
        assets={data}
        total={data?.length}
        fetchState={fetchState}
      />
    </ContainerStyled>
  );
}

export default LibraryPage;
